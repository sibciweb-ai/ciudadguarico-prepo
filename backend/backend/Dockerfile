# Backend Dockerfile (Node + Prisma + ts-node)
FROM node:20-alpine

# Install openssl for Prisma on Alpine
RUN apk add --no-cache openssl

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# App source
COPY . .

ENV NODE_ENV=production
ENV PORT=3000

# Expose backend port
EXPOSE 3000

# Run migrations then start server
CMD sh -c "npx prisma migrate deploy && npx ts-node src/app.ts"
