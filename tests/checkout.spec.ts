import { test, expect } from "@playwright/test";

/**
 * Tests E2E para Checkout Deluxe — itechperu.shop
 *
 * Flujo cubierto:
 *  1. Login con credenciales demo
 *  2. Agregar producto al carrito
 *  3. Navegar al checkout
 *  4. Llenar datos del cliente y dirección
 *  5. Seleccionar pago contraentrega (sin MP real)
 *  6. Confirmar pedido
 *  7. Verificar página de éxito
 *
 * Nota: Para Mercado Pago se requiere sandbox real, pero el flujo UI está cubierto.
 */
test.describe("Checkout — Flujo completo Contraentrega", () => {
  test("login → agregar al carrito → checkout → contraentrega → success", async ({ page }) => {
    test.setTimeout(120000); // 2 min para flujo completo
    // 1. Login
    await page.goto("/auth/login");
    await page.waitForLoadState("networkidle");
    await page.fill('input[type="email"]', "demo@itechperu.shop");
    await page.fill('input[type="password"]', "admin123");
    await page.evaluate(() => document.querySelector("form")?.requestSubmit());
    await page.waitForTimeout(3000);

    // 2. Ir a un producto
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const productLink = page.locator('a[href^="/productos/"]').first();
    await productLink.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // 3. Agregar al carrito (puede haber 2 botones: desktop inline y mobile flotante)
    const addToCartBtns = page.locator('button[aria-label="Agregar al carrito"]');
    const visibleBtn = addToCartBtns.filter({ visible: true }).first();
    await visibleBtn.click();
    await page.waitForTimeout(1500);

    // 4. Ir al checkout directamente
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // Verificar que estamos en checkout
    await expect(page.locator("h1")).toContainText("Checkout Deluxe");

    // 5. Llenar datos del cliente (usar locators por label)
    const nameInput = page.getByLabel("Nombre completo", { exact: false });
    await nameInput.fill("Juan Test");

    const phoneInput = page.getByLabel("Celular", { exact: false });
    await phoneInput.fill("987654321");

    // Llenar dirección
    const addressInput = page.getByLabel("Dirección", { exact: false }).first();
    await addressInput.fill("Av. Test 123");

    const districtInput = page.getByLabel("Distrito", { exact: false });
    await districtInput.fill("Miraflores");

    // 6. Seleccionar contraentrega
    const codBtn = page.locator('button:has-text("Contraentrega")');
    await codBtn.click();
    await page.waitForTimeout(500);

    // 7. Confirmar pedido
    const submitBtn = page.locator('button:has-text("Confirmar pedido contraentrega")');
    await submitBtn.click();

    // 8. Verificar redirección a success
    await page.waitForURL(/\/checkout\/success/, { timeout: 15000 });
    await expect(page.locator("h1")).toContainText("Pedido confirmado");
  });

  test("carrito vacío muestra mensaje y CTA a catálogo", async ({ page }) => {
    // Asegurar carrito vacío limpiando localStorage
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.removeItem("itechperu-cart");
    });
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page.locator("h1")).toContainText("carrito está vacío");
  });
});

test.describe("Checkout — Sin sesión", () => {
  test("usuario no autenticado ve CTA de login", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      // Forzar carrito con 1 item para que no falle por carrito vacío
      localStorage.setItem(
        "itechperu-cart",
        JSON.stringify({
          state: {
            items: [
              {
                productId: "test-1",
                slug: "test",
                title: "Test Product",
                image: "https://example.com/test.jpg",
                grade: "A+",
                unitPrice: 349900,
                quantity: 1,
              },
            ],
          },
          version: 0,
        })
      );
    });

    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page.locator("h1")).toContainText("Inicia sesión para comprar");
  });
});

test.describe("Checkout — Validaciones", () => {
  test("campos requeridos muestran error", async ({ page }) => {
    test.setTimeout(60000);
    // Login primero
    await page.goto("/auth/login");
    await page.waitForLoadState("networkidle");
    await page.fill('input[type="email"]', "demo@itechperu.shop");
    await page.fill('input[type="password"]', "admin123");
    await page.evaluate(() => document.querySelector("form")?.requestSubmit());
    await page.waitForTimeout(3000);

    // Forzar carrito con 1 item
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem(
        "itechperu-cart",
        JSON.stringify({
          state: {
            items: [
              {
                productId: "test-1",
                slug: "test",
                title: "Test Product",
                image: "https://example.com/test.jpg",
                grade: "A+",
                unitPrice: 349900,
                quantity: 1,
              },
            ],
          },
          version: 0,
        })
      );
    });

    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // Seleccionar contraentrega (para que aparezca el botón de submit correcto)
    const codBtn = page.locator('button:has-text("Contraentrega")');
    await codBtn.click();
    await page.waitForTimeout(500);

    // Click submit sin llenar nada
    const submitBtn = page.locator('button:has-text("Confirmar pedido contraentrega")');
    await submitBtn.click();
    await page.waitForTimeout(1000);

    // Debería mostrar errores de validación (textos como "obligatorio", "inválido")
    const bodyText = await page.locator("body").textContent();
    expect(bodyText).toMatch(/obligatorio|inválido|requerido/i);
  });
});
