FROM node

COPY ./dist/apps/user-service .
COPY ./libs/models/src/prisma ./prisma/

EXPOSE ${USER_SERVICE_PORT}

RUN yarn install --production

RUN npx prisma generate

CMD npx prisma migrate dev ; node ./main.js
