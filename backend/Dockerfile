# Backend Dockerfile (Node + Prisma + TypeScript build)
FROM node:20-alpine

# Install openssl for Prisma on Alpine and build tools for native modules if needed
RUN apk add --no-cache openssl git python3 make g++

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
