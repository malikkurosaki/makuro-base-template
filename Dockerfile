# Stage 1: Build
FROM debian:bookworm-slim AS build

# Install dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy Bun from official image (handles multi-arch automatically)
COPY --from=oven/bun:1.2.4 /usr/local/bin/bun /usr/local/bin/bun

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma client
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db"
RUN bun x prisma generate

# Build the application frontend
ARG VITE_PUBLIC_URL
ENV VITE_PUBLIC_URL=$VITE_PUBLIC_URL

# Generate API types
RUN bun run gen:api

# Build the application frontend
RUN bun run build

# Stage 2: Runtime
FROM debian:bookworm-slim AS runtime

# Set environment variables
ENV NODE_ENV=production

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy Bun from official image
COPY --from=oven/bun:1.2.4 /usr/local/bin/bun /usr/local/bin/bun

# Set the working directory
WORKDIR /app

# Copy necessary files from build stage
COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated
COPY --from=build /app/src ./src
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

# Expose the port
EXPOSE 3000

# Start the application
CMD ["bun", "start"]

