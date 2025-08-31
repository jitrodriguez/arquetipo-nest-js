
############## COMENTAR AL EJECUTAR EN UN DOCKER LOCAL ##############
ARG IMAGE
FROM $IMAGE
########################################################################

############## DESCOMENTAR AL EJECUTAR EN UN DOCKER LOCAL ##############
# FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine
# LABEL maintainer="nombre [nombre@email.com]"
# LABEL "com.azure.dev.pipelines.agent.handler.node.path"="/usr/local/bin/node"

# RUN apk update \
#     && apk add --no-cache yarn=1.22.19-r0 nodejs-current=18.6.0-r0 npm \
#     git \
#     bash \
#     tzdata \
#     curl \
#     busybox=1.35.0-r15 \
#     libcrypto1.1=1.1.1q-r0 \
#     libretls=3.5.2-r0 \
#     libssl1.1=1.1.1q-r0 \
#     ssl_client=1.35.0-r15 \
#     zlib=1.2.12-r1 \
#     && cp /usr/share/zoneinfo/America/Guayaquil /etc/localtime \
#     && echo "America/Guayaquil" >  /etc/timezone \
#     && rm -rf /var/cache/apk/*

# RUN npm install -g npm \
#     && npm ls -g ansi-regex

# RUN apk add --no-cache --virtual .pipeline-deps readline linux-pam \
#     && apk add bash sudo shadow \
#     && apk del .pipeline-deps

########################################################################
COPY . /app
WORKDIR /app
RUN yarn install
RUN yarn build:production
EXPOSE 5000
ENV PORT 5000

CMD [ "yarn", "start:prod" ]