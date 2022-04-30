FROM node

COPY ./dist/apps/api .
COPY ./libs/models/src/prisma ./prisma/

ENV PORT=3333
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=changeme
ENV DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/dev?connect_timeout=300
ENV DATABASE_URL_WITH_SCHEMA=${DATABASE_URL}?schema=public
ENV POSTGRES_PREFIX=postgres

EXPOSE ${PORT}

RUN yarn install --production

RUN npx prisma generate

CMD npx prisma migrate dev ; node ./main.js
