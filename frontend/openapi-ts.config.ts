import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input: "./openapi.json",
	output: "./src/client",
	plugins: [
		{
			name: "@hey-api/client-fetch",
			throwOnError: true,
		},
		{
			name: "@hey-api/sdk",
			asClass: true,
			methodNameBuilder: (operation) => {
				const id = operation.id;

				if (!id) {
					return "missingOperationId";
				}

				if (
					"tags" in operation &&
					operation.tags &&
					operation.tags.length > 0
				) {
					const tag = operation.tags[0];
					const parsedId = id.replace(tag, "");
					return parsedId.charAt(0).toLowerCase() + parsedId.slice(1);
				}

				return id;
			},
		},
	],
});
