FROM node:18-alpine As development

# RUN apk update && apk add bash

# SHELL ["/bin/bash", "-o", "pipefail", "-c"]

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

CMD [ "/bin/sh" ]

RUN npm run build

EXPOSE 3001

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]
