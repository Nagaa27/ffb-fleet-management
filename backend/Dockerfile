# Gunakan Node 20 (lebih baru dari 18)
FROM node:20-alpine

# Set working directory di container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install tool build untuk better-sqlite3 (python3, make, g++)
RUN apk add --no-cache python3 make g++ \
    && npm install --omit=dev   # --omit=dev = production

# Salin semua source backend ke container
COPY . .

# Port backend (ubah sesuai server.js / index.js)
EXPOSE 4000

# Jalankan server
CMD ["node", "server.js"]
