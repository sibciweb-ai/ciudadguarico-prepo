# Backend Dockerfile (Node + Prisma + TypeScript build)
FROM node:20-bullseye-slim

# Install dependencies for Prisma and native modules
RUN apt-get update && apt-get install -y \
    openssl \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install dependencies (including dev for build)
COPY package*.json ./
RUN npm install

# Copy prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy app source
COPY . .

# Build TypeScript to JS
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

# Expose backend port
EXPOSE 3000

# Start the compiled app
CMD ["node", "dist/app.js"]
