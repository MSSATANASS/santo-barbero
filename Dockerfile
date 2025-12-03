# syntax=docker/dockerfile:1

FROM node:20-slim AS build
WORKDIR /app

ARG GEMINI_API_KEY
ARG VITE_GA_ID
ARG VITE_PLAUSIBLE_DOMAIN
ENV GEMINI_API_KEY=${GEMINI_API_KEY}
ENV VITE_GA_ID=${VITE_GA_ID}
ENV VITE_PLAUSIBLE_DOMAIN=${VITE_PLAUSIBLE_DOMAIN}

COPY package*.json ./
COPY tsconfig.json vite.config.ts ./
COPY tailwind.config.cjs postcss.config.cjs ./
COPY public ./public
COPY components ./components
COPY src ./src
COPY App.tsx index.tsx index.html ./
COPY analytics.ts ./
COPY styles ./styles

RUN npm ci
RUN npm run build

FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
