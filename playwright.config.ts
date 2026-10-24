import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  use: { baseURL: "http://localhost:4321" },
  webServer: {
    command: "pnpm preview --port 4321",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
  },
});
