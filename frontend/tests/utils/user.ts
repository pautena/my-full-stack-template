import { type Page, expect } from "@playwright/test";

export async function signUpNewUser(
  page: Page,
  name: string,
  email: string,
  password: string,
) {
  await page.goto("/signup");

  await page.getByRole("textbox", { name: "Full Name" }).fill(name);
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill(password);
  await page.getByRole("textbox", { name: "Repeat Password" }).fill(password);
  await page.getByRole("button", { name: "Sign Up" }).click();
  await expect(
    page.getByText("Your account has been created successfully"),
  ).toBeVisible();
  await page.goto("/login");
}

export async function logInUser(page: Page, email: string, password: string) {
  await page.goto("/login");

  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill(password);
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForURL("/");
  await expect(
    page.getByText("Welcome back, nice to see you again!"),
  ).toBeVisible();
}

export async function logOutUser(page: Page) {
  await page.getByLabel("account of current user").click();
  await page.getByRole("menuitem", { name: "Log out" }).click();
  await page.goto("/login");
}
