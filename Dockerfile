FROM node:14 AS build-env
ADD . /app
WORKDIR /app

RUN yarn && yarn build

FROM gcr.io/distroless/nodejs:14
COPY --from=build-env /app/.env /app
COPY --from=build-env /app/build /app
WORKDIR /app
CMD ["bot.js"]