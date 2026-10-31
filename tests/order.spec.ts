import { test, expect } from '@playwright/test';

test('fill all fields and submit order', async ({ page }) => {

  await page.goto('https://basic-ui.tl-academy.ee/en/');

  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  await page.getByTestId('first-name-input').fill('Anton');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  await page.getByTestId('last-name-input').fill('Vlassov');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  await page.getByTestId('email-input').fill('notExistingUser@mail.com');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  await page.getByTestId('address-input').fill('some address');
  await page.getByTestId('create-order-button').click();

  await expect(page.getByTestId('order-success')).toBeVisible();

});

test('shows an error on invalid email and order button is disabled', async ({ page }) => {

  await page.goto('https://basic-ui.tl-academy.ee/en/');

  await page.getByTestId('first-name-input').fill('Anton');
  await page.getByTestId('last-name-input').fill('Vlassov');
  await page.getByTestId('email-input').fill('notExistingUsermail.com');
  await page.getByTestId('address-input').fill('some address');

  // Expect a title "to contain" a substring.
  await expect(page.getByTestId('email-error')).toBeVisible();
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

});

test('shows an error on each empty field', async ({ page }) => {

  await page.goto('https://basic-ui.tl-academy.ee/en/');

  await page.getByTestId('first-name-input').click();
  await page.getByTestId('last-name-input').click();

  await expect(page.getByTestId('first-name-error')).toBeVisible();

  await page.getByTestId('email-input').click();
  await expect(page.getByTestId('last-name-error')).toBeVisible();

  await page.getByTestId('address-input').click();
  await expect(page.getByTestId('email-error')).toBeVisible();

  await page.getByTestId('last-name-input').click();
  await expect(page.getByTestId('address-error')).toBeVisible();

});