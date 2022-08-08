FROM node:16

WORKDIR /app
RUN npm install -g npm@latest-6
# RUN corepack enable && corepack prepare pnpm@7.4.0 --activate
# COPY package.json pnpm-lock.yaml ./
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

