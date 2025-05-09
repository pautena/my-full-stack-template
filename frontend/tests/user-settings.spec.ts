import { expect, test } from "@playwright/test";
import { firstSuperuser, firstSuperuserPassword } from "./config.ts";
import { createUser } from "./utils/privateApi.ts";
import { randomEmail, randomPassword } from "./utils/random";
import { logInUser, logOutUser } from "./utils/user";

const tabs = ["My profile", "Password", "Appearance"];

// User Information

test("My profile tab is active by default", async ({ page }) => {
  await page.goto("/settings");
  await expect(page.getByRole("tab", { name: "My profile" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("All tabs are visible", async ({ page }) => {
  await page.goto("/settings");
  for (const tab of tabs) {
    await expect(page.getByRole("tab", { name: tab })).toBeVisible();
  }
});

test.describe("Edit user full name and email successfully", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("Edit user name with a valid name", async ({ page }) => {
    const email = randomEmail();
    const updatedName = "Test User 2";
    const password = randomPassword();

    await createUser({ email, password });

    // Log in the user
    await logInUser(page, email, password);

    await page.goto("/settings");
    await page.getByRole("tab", { name: "My profile" }).click();
    await page.getByRole("textbox", { name: "Full name" }).fill(updatedName);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("User updated successfully")).toBeVisible();
    // Check if the new name is displayed on the page
    await expect(page.getByRole("textbox", { name: "Full name" })).toHaveValue(
      updatedName,
    );
  });

  test("Edit user email with a valid email", async ({ page }) => {
    const email = randomEmail();
    const updatedEmail = randomEmail();
    const password = randomPassword();

    await createUser({ email, password });

    // Log in the user
    await logInUser(page, email, password);

    await page.goto("/settings");
    await page.getByRole("tab", { name: "My profile" }).click();
    await page.getByRole("textbox", { name: "Email" }).fill(updatedEmail);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("User updated successfully")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(
      updatedEmail,
    );
  });
});

test.describe("Edit user with invalid data", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("Edit user email with an invalid email", async ({ page }) => {
    const email = randomEmail();
    const password = randomPassword();
    const invalidEmail = "";

    await createUser({ email, password });

    // Log in the user
    await logInUser(page, email, password);

    await page.goto("/settings");
    await page.getByRole("tab", { name: "My profile" }).click();
    await page.getByRole("textbox", { name: "Email" }).fill(invalidEmail);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Email is required")).toBeVisible();
  });
});

// Change Password

test.describe("Change password successfully", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("Update password successfully", async ({ page }) => {
    const email = randomEmail();
    const password = randomPassword();
    const NewPassword = randomPassword();

    await createUser({ email, password });

    // Log in the user
    await logInUser(page, email, password);

    await page.goto("/settings");
    await page.getByRole("tab", { name: "Password" }).click();
    await page
      .getByRole("textbox", { name: "Current Password" })
      .fill(password);
    await page.getByRole("textbox", { name: "Set Password" }).fill(NewPassword);
    await page
      .getByRole("textbox", { name: "Confirm Password" })
      .fill(NewPassword);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Password updated successfully")).toBeVisible();

    await logOutUser(page);

    // Check if the user can log in with the new password
    await logInUser(page, email, NewPassword);
  });
});

test.describe("Change password with invalid data", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("Update password with weak passwords", async ({ page }) => {
    const email = randomEmail();
    const password = randomPassword();
    const weakPassword = "weak";

    await createUser({ email, password });

    // Log in the user
    await logInUser(page, email, password);

    await page.goto("/settings");
    await page.getByRole("tab", { name: "Password" }).click();
    await page
      .getByRole("textbox", { name: "Current Password" })
      .fill(password);
    await page
      .getByRole("textbox", { name: "Set Password" })
      .fill(weakPassword);
    await page
      .getByRole("textbox", { name: "Confirm Password" })
      .fill(weakPassword);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(
      page.getByText("Password must be at least 8 characters"),
    ).toBeVisible();
  });

  test("New password and confirmation password do not match", async ({
    page,
  }) => {
    const email = randomEmail();
    const password = randomPassword();
    const newPassword = randomPassword();
    const confirmPassword = randomPassword();

    await createUser({ email, password });

    // Log in the user
    await logInUser(page, email, password);

    await page.goto("/settings");
    await page.getByRole("tab", { name: "Password" }).click();
    await page.getByLabel("Current Password").fill(password);
    await page.getByLabel("Set Password").fill(newPassword);
    await page.getByLabel("Confirm Password").fill(confirmPassword);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });

  test("Current password and new password are the same", async ({ page }) => {
    const email = randomEmail();
    const password = randomPassword();

    await createUser({ email, password });

    // Log in the user
    await logInUser(page, email, password);

    await page.goto("/settings");
    await page.getByRole("tab", { name: "Password" }).click();
    await page.getByLabel("Current Password").fill(password);
    await page.getByLabel("Set Password").fill(password);
    await page.getByLabel("Confirm Password").fill(password);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(
      page.getByText("New password cannot be the same as the current one"),
    ).toBeVisible();
  });
});

// Appearance

test("Appearance tab is visible", async ({ page }) => {
  await page.goto("/settings");
  await page.getByRole("tab", { name: "Appearance" }).click();
  await expect(page.getByRole("heading", { name: "Appearance" })).toBeVisible();
});

test("User can switch mode", async ({ page }) => {
  await page.goto("/settings");
  await page.getByRole("tab", { name: "Appearance" }).click();
  await page.getByRole("combobox", { name: "Theme" }).click();
  await page.getByRole("option", { name: "Dark" }).click();
});
