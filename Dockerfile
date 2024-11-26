FROM node:23-alpine AS builder

ARG BUILD_DATE
ARG GIT_TAG
ARG GIT_BRANCH
ARG GIT_COMMIT_SHA
ARG GIT_LAST_COMMIT_DATE

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


ENV NODE_ENV=production


ENV VITE_GIT_TAG=${GIT_TAG}
ENV VITE_GIT_BRANCH=${GIT_BRANCH}
ENV VITE_GIT_COMMIT_SHA=${GIT_COMMIT_SHA}
ENV VITE_GIT_LAST_COMMIT_DATE=${GIT_LAST_COMMIT_DATE}
ENV VITE_BUILD_DATE=${BUILD_DATE}

RUN npm run build

# print out these env values to a info.json file
RUN echo "{\"BUILD_DATE\": \"${BUILD_DATE}\", \"GIT_TAG\": \"${GIT_TAG}\", \"GIT_BRANCH\": \"${GIT_BRANCH}\", \"GIT_COMMIT_SHA\": \"${GIT_COMMIT_SHA}\", \"GIT_LAST_COMMIT_DATE\": \"${GIT_LAST_COMMIT_DATE}\"}" > dist/info.json

FROM busybox
WORKDIR /app
COPY --from=builder /app/dist ./