# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:22 AS build-stage

RUN corepack enable
RUN corepack prepare pnpm --activate

WORKDIR /app

COPY package*.json /app/

RUN pnpm install

COPY ./ /app/

ARG VITE_API_URL=${VITE_API_URL}
ARG VITE_PROJECT_NAME=${VITE_PROJECT_NAME}

RUN pnpm build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf
