# syntax=docker/dockerfile:1.7

# ---- base: shared node image with deps ----
FROM node:20-alpine AS base
WORKDIR /app
ENV CI=1
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ---- dev: vite dev server with HMR ----
FROM base AS dev
ENV NODE_ENV=development
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ---- build: produce the static dist/ ----
FROM base AS build
ENV NODE_ENV=production
COPY . .
RUN npm run build

# ---- prod: nginx serving the static bundle ----
FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
