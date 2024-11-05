FROM node:23-alpine as builder

ARG GIT_TAG
ARG GIT_BRANCH
ARG GIT_COMMIT_SHA
ARG MAPBOX_API_KEY
ARG MAPTILER_API
ARG MAPBOX_BLUEPRINT
ARG NPM_AUTH_TOKEN
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY public ./public
COPY src ./src
COPY i18n.js .
COPY index.html .
COPY postcss.config.js .
COPY site.config.js .
COPY tailwind.config.js .
COPY vite.config.js .

# add a file to the image and write two lines
RUN echo "@fortawesome:registry=https://npm.fontawesome.com/" > .npmrc
RUN echo "//npm.fontawesome.com/:_authToken=${NPM_AUTH_TOKEN}" >> .npmrc

ENV NODE_ENV production

ENV VITE_API_KEY_MAPBOX=${MAPBOX_API_KEY}
ENV VITE_API_MAPTILER=${MAPTILER_API}
ENV VITE_API_STYLE_MAPBOX_BLUEPRINT=mapbox://styles/bunkerdev/clx4r50vt01q201qx1hr4273c
ENV VITE_API_STYLE_MAPBOX_MSF=mapbox://styles/bunkerdev/clx8yhie401vi01qs2v9w6ki2
ENV VITE_API_STYLE_MAPBOX_GEO=geoportail
ENV VITE_ROOT=https://ww2.lu

ENV VITE_GIT_TAG=${GIT_TAG}
ENV VITE_GIT_BRANCH=${GIT_BRANCH}
ENV VITE_GIT_COMMIT_SHA=${GIT_COMMIT_SHA}

RUN npm run build

FROM busybox
WORKDIR /app
COPY --from=builder /app/build ./