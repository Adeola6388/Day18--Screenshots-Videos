// tests/day18-Screenshots-Videos-Trans.spec.js
import { test, expect } from "@playwright/test";

test("Day 18 - Capture Transactions Screenshot", async ({ page }, testInfo) => {
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
    console.log("Step 3: Submit login and wait for dashboard to load");
    await Promise.all([
        page.waitForURL("**/dashboard", { timeout: 20000 }),
        loginBtn.click()
    ]);
    await expect(page).toHaveURL(/\/dashboard/);

    console.log("Step 4: Navigate to Transactions");
    await page.getByRole('link', { name: /^transactions$/i }).click();
    await page.waitForURL("**/dashboard/transactions", { timeout: 20000 });
    await expect(page).toHaveURL(/\/dashboard\/transactions/);

    const transactionsHeader = page.getByRole('heading', { name: /transactions/i });
    await expect(transactionsHeader).toBeVisible({ timeout: 16000 });

    console.log('Step 5: Take manual screenshot of the transactions page');
    const screenshotPath = testInfo.outputPath('day18-transactions.png');
    await page.screenshot({
        path: screenshotPath,
        fullPage: true
    });
    await testInfo.attach('transactions-screenshot', {
        path: screenshotPath,
        contentType: 'image/png'
    });

    console.log(`Test complete - screenshot saved to ${screenshotPath}`);
});
