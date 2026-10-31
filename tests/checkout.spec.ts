import {test, expect} from '@playwright/test'

test('shows success message when order created', async ({ page }) => {

    await page.goto('https://shop.tl-academy.ee/checkout');

    await page.getByTestId('email-input').fill('noExistingUser@mail.com');
    await page.getByTestId('name-input').fill('Anton Vlassov');

    await expect(page.getByTestId('place-order-button')).toBeEnabled();

    await page.getByTestId('place-order-button').click();

    await expect(page.getByTestId('order-message')).toBeVisible();

});

test.only('default state validation', async ({ page }) => {

    await page.goto('https://shop.tl-academy.ee/checkout');

    await expect(page.getByTestId('place-order-button')).toBeDisabled();

    await expect(page.getByTestId('delivery-parcel-locker-option')).toBeChecked();
    await expect(page.getByTestId('delivery-home-option')).not.toBeChecked();

    await expect(page.getByTestId('payment-card-option')).toBeChecked();
    await expect(page.getByTestId('payment-paypal-option')).not.toBeChecked();

});