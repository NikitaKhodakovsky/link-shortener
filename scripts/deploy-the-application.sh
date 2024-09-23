#! /bin/bash

helm install \
	aws-load-balancer-controller \
	./kubernetes/helm/charts/aws-load-balancer-controller \
	-n kube-system \
	--wait \
	--set clusterName="$(terraform -chdir=terraform/application output -raw eks_cluster_name)" \
	--set serviceAccount.create=false \
	--set serviceAccount.name="$(terraform -chdir=terraform/application output -raw aws_load_balancer_controller_service_account_name)"

kubectl apply -f ./kubernetes/application

function install_nestjs_microservice_chart() {
	helm install "$1" ./kubernetes/helm/charts/nestjs-microservice -f "./kubernetes/helm/values/$1.nestjs-microservice.yaml"
}

install_nestjs_microservice_chart "auth-service"

install_nestjs_microservice_chart "link-service"

install_nestjs_microservice_chart "click-service"

install_nestjs_microservice_chart "statistic-service"

install_nestjs_microservice_chart "demo-service"
