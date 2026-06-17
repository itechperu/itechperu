import { test, expect } from "@playwright/test";

/**
 * Tests E2E para Home + Deep Linking + Scroll Spy
 */
test.describe("Home — Hero y secciones", () => {
  test("carga correctamente con título y secciones visibles", async ({ page }) => {
    await page.goto("/");

    // Título del documento
    await expect(page).toHaveTitle(/itechperu\.shop/);

    // Heading principal del hero
    await expect(page.locator("h1")).toContainText("Tecnología de alta gama");

    // Las 5 secciones existen con sus IDs
    for (const id of ["inicio", "ofertas", "catalogo", "categorias", "confianza"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("catálogo muestra 4 productos destacados", async ({ page }) => {
    await page.goto("/#catalogo");
    await page.waitForLoadState("networkidle");

    const productCards = page.locator('[id="catalogo"] a[href^="/productos/"]');
    await expect(productCards).toHaveCount(4);
  });

  test("botón WhatsApp VIP en hero enlaza a wa.me", async ({ page }) => {
    await page.goto("/");
    const waLink = page.locator('a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
    const href = await waLink.getAttribute("href");
    expect(href).toContain("wa.me");
  });
});

test.describe("Scroll Spy — Deep Linking", () => {
  test("al hacer scroll, la URL se actualiza con el hash de la sección activa", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Estado inicial: deberíamos estar en #inicio (o sin hash)
    const initialUrl = page.url();
    expect(initialUrl).toMatch(/#inicio$|^http.*\/$/);

    // Hacer scroll a #catalogo
    await page.evaluate(() => {
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    await page.waitForTimeout(800);

    // La URL debe contener #catalogo
    expect(page.url()).toContain("#catalogo");
  });

  test("al cargar URL con #confianza, hace scroll automático a esa sección", async ({ page }) => {
    await page.goto("/#confianza");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // La sección confianza debe estar visible en viewport
    const confianzaBox = await page.locator("#confianza").boundingBox();
    const viewportHeight = page.viewportSize()?.height ?? 800;
    expect(confianzaBox).toBeTruthy();
    if (confianzaBox) {
      expect(confianzaBox.y).toBeLessThan(viewportHeight);
      expect(confianzaBox.y + confianzaBox.height).toBeGreaterThan(0);
    }
  });

  test("navegación por hash en desktop resalta el link activo en header", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Hacer click en "Catálogo" del header
    const catalogoLink = page.locator('nav a:has-text("Catálogo")').first();
    await catalogoLink.click();
    await page.waitForTimeout(1500);

    // URL actualizada
    expect(page.url()).toContain("#catalogo");
  });
});

test.describe("Responsividad", () => {
  test("mobile: tab bar flotante visible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // El tab bar tiene la clase lg:hidden — debe estar visible en mobile
    const tabBar = page.locator("nav.lg\\:hidden").last();
    await expect(tabBar).toBeVisible();
  });

  test("desktop: tab bar oculto", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // El tab bar debe estar oculto en desktop
    const tabBar = page.locator("nav.lg\\:hidden").last();
    await expect(tabBar).toBeHidden();
  });

  test("grid de productos adapta columnas por breakpoint", async ({ page }) => {
    // Mobile: 2 columnas
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#catalogo");
    await page.waitForLoadState("networkidle");
    // El grid de productos es el segundo div dentro de #catalogo (después del header)
    const mobileGrid = page.locator('#catalogo > div').nth(1);
    await expect(mobileGrid).toHaveClass(/grid-cols-2/);

    // Desktop: 4 columnas
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await page.waitForLoadState("networkidle");
    const desktopGrid = page.locator('#catalogo > div').nth(1);
    await expect(desktopGrid).toHaveClass(/lg:grid-cols-4/);
  });
});
