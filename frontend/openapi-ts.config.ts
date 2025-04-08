import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input: "./openapi.json",
	output: "./src/client",
	plugins: [
		"@hey-api/client-fetch",
		"@tanstack/react-query",
		{
			name: "@hey-api/sdk",
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
					if (tag === "private") {
						return id;
					}
					const parsedId = id.replace(tag, "");
					return parsedId.charAt(0).toLowerCase() + parsedId.slice(1);
				}

				return id;
			},
		},
	],
});
