BUILD_TAG ?= latest

build:
	docker build -t c2dhunilu/ww2:${BUILD_TAG} \
		--build-arg GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
		--build-arg GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
		--build-arg GIT_REVISION=$(shell git rev-parse --short HEAD) \
		--build-arg BUILD_DATE=$(shell date -u +'%Y-%m-%dT%H:%M:%SZ') \
		--build-arg GIT_REMOTE=$(shell git config --get remote.origin.url) . &&  \
	docker run -it --rm c2dhunilu/ww2:latest cat version.json