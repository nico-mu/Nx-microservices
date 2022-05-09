FROM node

COPY ./dist/apps/post-service .
COPY ./libs/models/src/prisma ./prisma/

EXPOSE ${POST_SERVICE_PORT}

RUN yarn install --production

RUN npx prisma generate

CMD npx prisma migrate dev ; node ./main.js
