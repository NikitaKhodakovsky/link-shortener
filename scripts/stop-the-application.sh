kubectl delete -f kubernetes/application

helm uninstall -n kube-system aws-load-balancer-controller

helm uninstall auth-service

helm uninstall link-service

helm uninstall click-service

helm uninstall statistic-service

helm uninstall demo-service
