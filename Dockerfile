FROM node:16-alpine as base

EXPOSE 3000
ENV NODE_ENV=production \
  PORT=3000 \
  PATH=/node/node_modules/.bin:$PATH
RUN apk add --no-cache tini
RUN corepack enable && corepack prepare pnpm@7.10.0 --activate
WORKDIR /node
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
ENTRYPOINT ["/sbin/tini", "--"]

FROM base as dev
WORKDIR /node/app
ENV NODE_ENV=development
RUN pnpm install --frozen-lockfile
CMD ["pnpm", "dev"]

FROM dev as test
COPY . .
RUN pnpm audit || true
RUN pnpm fmt \
  && pnpm lint \
  && pnpm tsc
RUN pnpm test

FROM test as source
ENV NODE_ENV=production
RUN pnpm prebuild \
  && pnpm build

FROM base as prod
LABEL org.opencontainers.image.authors=yifan.9916@gmail.com
LABEL org.opencontainers.image.title="Node.js Dockerfile"
LABEL org.opencontainers.image.licenses=MIT
LABEL yifan.nodeversion=$NODE_VERSION

WORKDIR /node/app
COPY healthcheck.js ./
COPY --from=source /node/app/dist .
HEALTHCHECK --interval=1m --timeout=3s \
  # CMD wget -q http://localhost:3000/healthz || exit 1
  CMD node healthcheck.js || exit 1
USER node
CMD ["node", "index.js"]