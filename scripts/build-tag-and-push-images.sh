#! /bin/bash

# Arguments
# 1. Name of the service
# 2. Link to the image repository

function tag_and_push_images() {
	local repository_url="$(terraform -chdir=terraform/application output -raw "$2")"

	docker tag "$1" "$repository_url" && docker push "$repository_url"
}

docker compose build auth-service link-service click-service statistic-service demo-service

tag_and_push_images "auth-service" "auth_service_image_repository_url" &
tag_and_push_images "link-service" "link_service_image_repository_url" &
tag_and_push_images "click-service" "click_service_image_repository_url" &
tag_and_push_images "statistic-service" "statistic_service_image_repository_url" &
tag_and_push_images "demo-service" "demo_service_image_repository_url"
