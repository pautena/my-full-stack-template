import { test as setup } from "@playwright/test";
import { firstSuperuser, firstSuperuserPassword } from "./config.ts";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("textbox", { name: "Email" }).fill(firstSuperuser);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(firstSuperuserPassword);
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForURL("/");
  await page.context().storageState({ path: authFile });
});
