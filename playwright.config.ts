import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — itechperu.shop
 *
 * Tests E2E reales para:
 *  - Home (hero, scroll spy, deep linking)
 *  - Catálogo y detalle de producto (lightbox, selector de grado)
 *  - Auth (login, register, forgot-password, reset-password, verify-email OTP)
 *  - Responsividad (mobile, tablet, desktop)
 *
 * Uso:
 *   bunx playwright test              # correr todos los tests
 *   bunx playwright test --headed     # ver el browser
 *   bunx playwright test --ui         # modo UI interactivo
 *   bunx playwright test --project=mobile  # solo mobile
 *   bunx playwright show-report       # ver reporte HTML
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["list"],
  ],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    browserName: "chromium",
  },
  projects: [
    {
      name: "mobile",
      use: {
        // Usamos Chromium (no WebKit) porque es lo que tenemos instalado.
        // Emulamos un iPhone 14 con viewport + touch.
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 3,
      },
    },
    {
      name: "tablet",
      use: {
        browserName: "chromium",
        viewport: { width: 768, height: 1024 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
    {
      name: "desktop",
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: "bun run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
});
