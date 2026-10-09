FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts

FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NUXT_TELEMETRY_DISABLED=1
RUN yarn build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0
RUN addgroup -S nodejs && adduser -S nuxt -G nodejs
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output
USER nuxt
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
