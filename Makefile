REPOSITORY_DOMAIN ?= us-east4-docker.pkg.dev
REPOSITORY_PATH ?= rising-hallway-159415/cvs-test
INTERNAL_IMAGES = cvs-react
BUILD_SUFFIX ?= 1-0-0
NAMESPACE ?= default

define buildDockerCommand
docker build -t ${REPOSITORY_DOMAIN}/${REPOSITORY_PATH}/${1}:${BUILD_SUFFIX} -f ./Dockerfile --platform linux/amd64 . $(newline)
endef

define createNamespace
	kubectl get ns | grep -q "^$1 " || kubectl create ns $1
endef

create-namespace:
	$(call createNamespace,${NAMESPACE})

build-docker:
	$(foreach image, $(INTERNAL_IMAGES),$(call buildDockerCommand,${image},${TEST_IMAGE_PATH}/${image}))

push-images:
	docker push ${REPOSITORY_DOMAIN}/${REPOSITORY_PATH}/${INTERNAL_IMAGES}:${BUILD_SUFFIX}

ecr-login:
	$(eval DOCKER_LOGIN_PASSWORD := $(shell aws ecr get-login-password --region ${AWS_REGION}))
	docker login --username AWS --password ${DOCKER_LOGIN_PASSWORD} ${REPOSITORY_DOMAIN}

gcp-login:
	gcloud auth configure-docker ${REPOSITORY_DOMAIN}

deploy:
	helm -n ${NAMESPACE} install --set image=${REPOSITORY_DOMAIN}/${REPOSITORY_PATH}/${INTERNAL_IMAGES}:${BUILD_SUFFIX} react-app ./helm

destroy-chart:
	helm -n $(NAMESPACE) uninstall react-app

redeploy:
	@if helm -n $(NAMESPACE) status react-app > /dev/null 2>&1; then \
		$(MAKE) destroy-chart; \
	fi
	$(MAKE) deploy