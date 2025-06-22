FROM node:20-alpine AS build
RUN npm i npm@10 -g
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM docker.n8n.io/n8nio/n8n:latest
WORKDIR /custom-nodes
COPY --from=build /build .
COPY --from=build /build/.docker/init.sh /init.sh
USER root
RUN npm link
RUN chmod +x /init.sh

USER node
ENTRYPOINT [ "tini", "--", "/init.sh" ]
