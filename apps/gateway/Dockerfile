FROM node

COPY ./dist/apps/gateway .

EXPOSE ${API_GATEWAY_PORT}

RUN yarn install --production

RUN npx prisma generate

CMD node ./main.js
