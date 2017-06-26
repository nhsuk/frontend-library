FROM node:7.9-alpine
RUN apk add --no-cache git

ENV USERNAME nodeuser

RUN adduser -D "$USERNAME" && \
    mkdir /code && \
    chown "$USERNAME":"$USERNAME" /code

USER $USERNAME
WORKDIR /code

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY yarn.lock package.json /code/
RUN if [ "$NODE_ENV" == "production" ]; then yarn install --production --ignore-optional --pure-lockfile; else yarn install --ignore-optional --pure-lockfile; fi

EXPOSE 3000

COPY . /code

USER root
RUN find /code -user 0 -print0 | xargs -0 chown "$USERNAME":"$USERNAME"
USER $USERNAME

RUN [ "yarn", "run", "build-css" ]

CMD [ "node", "app.js" ]
