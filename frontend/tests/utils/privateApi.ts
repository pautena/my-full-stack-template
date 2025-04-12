// Note: the `PrivateService` is only available when generating the client
// for local environments
import { PrivateService } from "../../src/client";
import { client } from "../../src/client/client.gen";

client.setConfig({
  baseUrl: process.env.VITE_API_URL,
});

export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await PrivateService.createUser({
    body: {
      email,
      password,
      is_verified: true,
      full_name: "Test User",
    },
  });
};
