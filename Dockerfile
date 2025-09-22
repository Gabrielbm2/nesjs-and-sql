FROM node:20-alpine AS runner
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

COPY ./dist ./dist
COPY .env .

EXPOSE 3000 4000
CMD ["node", "dist/main.js"]
