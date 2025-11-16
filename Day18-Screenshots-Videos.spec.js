// tests/day18-Screenshots-Videos.spec.js
import { test, expect } from "@playwright/test";

test("Day 18 - Capture Dashboard Screenshot", async ({ page }, testInfo) => {
    console.log("Step 1: Go to Mini Bank Login Page");
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://mini-bank.testamplify.com/login");
    await expect(page).toHaveURL("https://mini-bank.testamplify.com/login");

    console.log ("Step 2: Login to account");
    const emailInput = page.locator(
    "//input[@type='email' or contains(@placeholder, 'email') or contains(@name, 'email')]"
    );
    await emailInput.fill("testuser2@yopmail.com");
    const passwordInput = page.locator(
    "//input[@type='password' or contains(@placeholder, 'password') or contains(@name, 'password')]"
    );
    await passwordInput.fill("Pass2005#");
    const loginBtn = page.locator(
        "//button[normalize-space()='Login' or @type='submit']"
    );
    await loginBtn.click();
    console.log("Step 3: Wait for Dashboard to load");
    await page.waitForURL(/\/dashboard$/, { timeout: 16000 });

    const overviewHeader = page.getByRole('heading', { name: /overview/i });
    await expect(overviewHeader).toBeVisible({ timeout: 16000 });

    console.log('Step 4: Take manual screenshot of dashboard');
    const screenshotPath = testInfo.outputPath('day18-dashboard.png');
    await page.screenshot({
        path: screenshotPath,
        fullPage: true
    });
    await testInfo.attach('dashboard-screenshot', {
        path: screenshotPath,
        contentType: 'image/png'
    });

    console.log(`Test complete - screenshot saved to ${screenshotPath}`);
});
