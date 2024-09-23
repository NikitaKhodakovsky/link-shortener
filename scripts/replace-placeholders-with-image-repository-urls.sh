#! /bin/bash

# Arguments
# 1. Name of the service.
# 2. Name of the output.

function replace_placeholder_with_image_repository_url() {
	local repository_url="$(terraform -chdir=terraform/application output -raw $2)"

	sed -i -e "s|<IMAGE_REPOSITORY_URL>|$repository_url|" "kubernetes/helm/values/$1.nestjs-microservice.yaml"
}

replace_placeholder_with_image_repository_url "auth-service" "auth_service_image_repository_url"

replace_placeholder_with_image_repository_url "link-service" "link_service_image_repository_url"

replace_placeholder_with_image_repository_url "click-service" "click_service_image_repository_url"

replace_placeholder_with_image_repository_url "statistic-service" "statistic_service_image_repository_url"

replace_placeholder_with_image_repository_url "demo-service" "demo_service_image_repository_url"
