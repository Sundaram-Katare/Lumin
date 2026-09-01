FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite replaces this value while building. Keep API calls same-origin so the
# browser can reach the backend through the Nginx proxy in the final image.
ARG VITE_BACKEND_API_URL=/api/
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

