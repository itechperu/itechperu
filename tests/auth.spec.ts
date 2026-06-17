import { test, expect } from "@playwright/test";

/**
 * Tests E2E para Sistema de Autenticación Deluxe
 *  - Login (email + Google)
 *  - Register (con medidor de fortaleza)
 *  - Forgot password (con estado de éxito)
 *  - Reset password
 *  - Verify email OTP
 */
test.describe("Auth — Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
    await page.waitForLoadState("networkidle");
  });

  test("carga correctamente con título y formulario", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Iniciar Sesión");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Continuar con Google")')).toBeVisible();
  });

  test("validación: email inválido muestra error", async ({ page }) => {
    await page.fill('input[type="email"]', "correo-invalido");
    await page.fill('input[type="password"]', "123");
    await page.evaluate(() => document.querySelector("form")?.requestSubmit());
    await page.waitForTimeout(500);

    await expect(page.locator("text=Correo electrónico inválido")).toBeVisible();
    await expect(page.locator("text=Mínimo 6 caracteres")).toBeVisible();
  });

  test("toggle de visibilidad de contraseña funciona", async ({ page }) => {
    await page.fill('input[type="password"]', "secreta123");
    const toggleBtn = page.locator('button[aria-label*="contraseña"]');
    await toggleBtn.click();
    await page.waitForTimeout(300);

    // El input debe cambiar a type="text"
    const inputType = await page.locator('input[type="text"], input[type="password"]').last().getAttribute("type");
    expect(inputType).toBe("text");
  });

  test("link a registro navega correctamente", async ({ page }) => {
    await page.click('a:has-text("Regístrate gratis")');
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/auth\/register/);
    await expect(page.locator("h2")).toContainText("Crear Cuenta");
  });

  test("link a forgot-password navega correctamente", async ({ page }) => {
    await page.click('a:has-text("Olvidaste tu contraseña")');
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/auth\/forgot-password/);
  });

  test("checkbox Recordarme hace toggle", async ({ page }) => {
    const checkbox = page.locator('button[aria-label="Recordarme"]');
    const initialPressed = await checkbox.getAttribute("aria-pressed");
    expect(initialPressed).toBe("true"); // Activado por defecto

    await checkbox.click();
    await page.waitForTimeout(300);
    const newPressed = await checkbox.getAttribute("aria-pressed");
    expect(newPressed).toBe("false");
  });
});

test.describe("Auth — Register", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/register");
    await page.waitForLoadState("networkidle");
  });

  test("carga con todos los campos requeridos", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Crear Cuenta");
    await expect(page.locator('input[autocomplete="name"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
    await expect(page.locator('input[type="password"]').nth(1)).toBeVisible();
  });

  test("medidor de fortaleza de contraseña responde", async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]').first();

    // Password débil
    await passwordInput.fill("weak");
    await page.waitForTimeout(500);
    const weakBar = page.locator('[class*="h-full rounded-full"]').first();
    const weakWidth = await weakBar.evaluate((el) => (el as HTMLElement).style.width);
    expect(weakWidth).toBe("0%");

    // Password fuerte
    await passwordInput.fill("StrongP@ss123");
    // Esperar a que termine la animación (framer-motion tarda ~300ms)
    await page.waitForTimeout(600);
    const strongWidth = await weakBar.evaluate((el) => (el as HTMLElement).style.width);
    // Aceptamos cualquier valor >= 99% (la animación puede no llegar exacta a 100%)
    const numValue = parseFloat(strongWidth);
    expect(numValue).toBeGreaterThanOrEqual(99);
  });

  test("validación: contraseñas no coinciden", async ({ page }) => {
    await page.fill('input[autocomplete="name"]', "Juan Pérez");
    await page.fill('input[type="email"]', "juan@test.com");
    const pwdInputs = page.locator('input[type="password"]');
    await pwdInputs.nth(0).fill("password123");
    await pwdInputs.nth(1).fill("diferente");
    await page.evaluate(() => document.querySelector("form")?.requestSubmit());
    await page.waitForTimeout(500);

    await expect(page.locator("text=Las contraseñas no coinciden")).toBeVisible();
  });

  test("términos deben aceptarse para registrarse", async ({ page }) => {
    await page.fill('input[autocomplete="name"]', "Juan Pérez");
    await page.fill('input[type="email"]', "juan@test.com");
    const pwdInputs = page.locator('input[type="password"]');
    await pwdInputs.nth(0).fill("password123");
    await pwdInputs.nth(1).fill("password123");
    await page.evaluate(() => document.querySelector("form")?.requestSubmit());
    await page.waitForTimeout(500);

    await expect(page.locator("text=Debes aceptar los términos")).toBeVisible();
  });

  test("código promocional BIENVENIDO10 visible", async ({ page }) => {
    await expect(page.locator("text=BIENVENIDO10")).toBeVisible();
  });
});

test.describe("Auth — Forgot Password", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/forgot-password");
    await page.waitForLoadState("networkidle");
  });

  test("carga con formulario de recuperación", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Olvidé mi contraseña");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button:has-text("Enviar enlace")')).toBeVisible();
  });

  test("al enviar email válido, muestra mensaje de éxito", async ({ page }) => {
    await page.fill('input[type="email"]', "cliente@itechperu.shop");
    await page.evaluate(() => document.querySelector("form")?.requestSubmit());
    await page.waitForTimeout(2500);

    await expect(page.locator("h2")).toContainText("Revisa tu correo");
    await expect(page.locator("text=Hemos enviado un enlace")).toBeVisible();
  });

  test("botón Reenviar enlace aparece tras éxito", async ({ page }) => {
    await page.fill('input[type="email"]', "test@test.com");
    await page.evaluate(() => document.querySelector("form")?.requestSubmit());
    await page.waitForTimeout(2500);

    await expect(page.locator('button:has-text("Reenviar enlace")')).toBeVisible();
  });

  test("link Volver regresa a login", async ({ page }) => {
    await page.click('a:has-text("Volver")');
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});

test.describe("Auth — Reset Password", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/reset-password");
    await page.waitForLoadState("networkidle");
  });

  test("carga con campos de nueva contraseña", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Crear nueva contraseña");
    const passwordInputs = page.locator('input[type="password"]');
    await expect(passwordInputs).toHaveCount(2);
  });

  test("validación: contraseñas deben coincidir", async ({ page }) => {
    const pwdInputs = page.locator('input[type="password"]');
    await pwdInputs.nth(0).fill("password123");
    await pwdInputs.nth(1).fill("diferente");
    await page.evaluate(() => document.querySelector("form")?.requestSubmit());
    await page.waitForTimeout(500);

    await expect(page.locator("text=Las contraseñas no coinciden")).toBeVisible();
  });
});

test.describe("Auth — Verify Email OTP", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/verify-email");
    await page.waitForLoadState("networkidle");
  });

  test("carga con 6 inputs OTP y botón deshabilitado", async ({ page }) => {
    const otpInputs = page.locator('input[inputmode="numeric"]');
    await expect(otpInputs).toHaveCount(6);

    const verifyBtn = page.locator('button:has-text("Verificar código")');
    await expect(verifyBtn).toBeDisabled();
  });

  test("al llenar los 6 dígitos, auto-verifica y muestra éxito", async ({ page }) => {
    const inputs = page.locator('input[inputmode="numeric"]');

    await inputs.nth(0).fill("1");
    await inputs.nth(1).fill("2");
    await inputs.nth(2).fill("3");
    await inputs.nth(3).fill("4");
    await inputs.nth(4).fill("5");
    await inputs.nth(5).fill("6");

    await page.waitForTimeout(2500);

    await expect(page.locator("h2")).toContainText("¡Correo verificado!");
  });

  test("navegación con tecla Backspace funciona", async ({ page }) => {
    const inputs = page.locator('input[inputmode="numeric"]');

    // Llenar los primeros 3
    await inputs.nth(0).fill("1");
    await inputs.nth(1).fill("2");
    await inputs.nth(2).fill("3");

    // Focus en el 4to y presionar Backspace (debe ir al 3ro)
    await inputs.nth(3).focus();
    await page.keyboard.press("Backspace");

    // El focus debe estar en el input 2 (index 2)
    const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
    expect(focused).toContain("Dígito 3");
  });

  test("botón Reenviar código está visible", async ({ page }) => {
    await expect(page.locator('button:has-text("Reenviar código")')).toBeVisible();
  });
});

test.describe("Auth — Layout responsivo", () => {
  test("desktop: panel lateral con beneficios visible", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/auth/login");
    await page.waitForLoadState("networkidle");

    // El panel lateral tiene el texto "Bienvenido de vuelta"
    await expect(page.locator("h1")).toContainText("Bienvenido de vuelta");
  });

  test("mobile: panel lateral oculto, solo formulario visible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/auth/login");
    await page.waitForLoadState("networkidle");

    // El h1 con "Bienvenido de vuelta" está oculto en mobile
    await expect(page.locator('h1:has-text("Bienvenido de vuelta")')).toBeHidden();

    // Pero el h2 "Iniciar Sesión" está visible
    await expect(page.locator('h2:has-text("Iniciar Sesión")')).toBeVisible();
  });

  test("logo de Google presente en botón", async ({ page }) => {
    await page.goto("/auth/login");
    await page.waitForLoadState("networkidle");

    const googleBtn = page.locator('button:has-text("Continuar con Google")');
    const svg = googleBtn.locator("svg");
    await expect(svg).toBeVisible();
  });
});
