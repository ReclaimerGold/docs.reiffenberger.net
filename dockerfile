# Stage 1: Build the VitePress site
FROM node:20-alpine AS builder

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy package files and install dependencies first (for better layer caching)
COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code and build
COPY . .
RUN npm run docs:build

# Stage 2: Serve the static files with Nginx
FROM nginx:stable-alpine

# Install dumb-init and wget for proper signal handling in Kubernetes and health checks
RUN apk add --no-cache dumb-init wget

# Create necessary directories and set permissions for non-root nginx
RUN mkdir -p /var/cache/nginx/client_temp && \
    mkdir -p /var/log/nginx && \
    mkdir -p /tmp/nginx/client_temp && \
    mkdir -p /tmp/nginx/proxy_temp && \
    mkdir -p /tmp/nginx/fastcgi_temp && \
    mkdir -p /tmp/nginx/uwsgi_temp && \
    mkdir -p /tmp/nginx/scgi_temp && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /tmp/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod 755 /tmp

# Copy custom nginx configuration (this should be configured for non-root)
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

# Remove default nginx files and copy the built files from the builder stage
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder --chown=nginx:nginx /app/.vitepress/dist/ /usr/share/nginx/html/

# Switch to non-root user
USER nginx

# Expose port 8080 (non-privileged port for Kubernetes)
EXPOSE 8080

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Use dumb-init as entrypoint for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]