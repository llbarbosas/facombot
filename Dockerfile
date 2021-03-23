FROM node:14 AS build-env
ADD . /app
WORKDIR /app

RUN yarn && yarn build

FROM gcr.io/distroless/nodejs:14
COPY --from=build-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
COPY --from=build-env /app/.env /app/package.json /app/

WORKDIR /app
CMD ["build/bot.js"]