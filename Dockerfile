FROM node:18-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=2567
COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps
COPY . .
EXPOSE 2567
CMD ["node", "server/index.js"]
