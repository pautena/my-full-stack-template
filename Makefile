export ENVIRONMENT=local


watch:
	op run --env-file=".env" -- docker compose watch

up:
	op run --env-file=".env" -- docker compose up

up-detached:
	op run --env-file=".env" -- docker compose up -d

build:
	op run --env-file=".env" -- docker compose build

playwright:
	op run --env-file=".env" -- docker compose build; \
	op run --env-file=".env" -- docker compose up -d --wait backend mailcatcher; \
	cd frontend; \
	op run --env-file="../.env" -- npx playwright test --fail-on-flaky-tests --trace=retain-on-failure;

generate-client:
	op run --env-file=".env" -- ./scripts/generate-client.sh

backend-bash:
	docker compose exec backend bash

.PHONY: watch up build playwright generate-client up-detached backend-bash
