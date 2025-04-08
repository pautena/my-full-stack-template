// Note: the `PrivateService` is only available when generating the client
// for local environments
import { createUser as createUserApi } from "../../src/client";
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
	return await createUserApi({
		body: {
			email,
			password,
			is_active: true,
			full_name: "Test User",
		},
	});
};
