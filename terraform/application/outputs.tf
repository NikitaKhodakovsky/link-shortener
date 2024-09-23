# AWS
output aws_region {
  value = var.aws_region
}

# VPC
output "vpc_id" {
  value = aws_vpc.link_shortener.id
}

output "public_subnet_id" {
  value = aws_subnet.public["a"].id
}

# EKS
output "eks_cluster_name" {
  value = aws_eks_cluster.link_shortener.name
}

# Kubernetes
output "aws_load_balancer_controller_service_account_name" {
  value = var.aws_load_balancer_controller_service_account_name
}

output "application_namespace_name" {
  value = var.application_namespace_name
}

# CloudFront
output "cloud_front_distribution_domain_name" {
  value = aws_cloudfront_distribution.link_shortener.domain_name
}

output "cloud_front_distribution_url" {
  value = "https://${aws_cloudfront_distribution.link_shortener.domain_name}"
}

# S3
output "ui_bucket_name" {
  value = aws_s3_bucket.link_shortener_ui.id
}

# RDS
output "db_host" {
  value = aws_db_instance.link_shortener.address
}

output "db_port" {
  value = aws_db_instance.link_shortener.port
}

output "db_username" {
  value     = aws_db_instance.link_shortener.username
  sensitive = true
}

output "db_password" {
  value     = aws_db_instance.link_shortener.password
  sensitive = true
}

output "db_default_database" {
  value = aws_db_instance.link_shortener.db_name
}

# ECR
output "ecr_registry_domain" {
  value = "${aws_ecr_repository.link_shortener["auth-service"].registry_id}.dkr.ecr.${var.aws_region}.amazonaws.com"
}

output "auth_service_image_repository_url" {
  value = aws_ecr_repository.link_shortener["auth-service"].repository_url
}

output "link_service_image_repository_url" {
  value = aws_ecr_repository.link_shortener["link-service"].repository_url
}

output "click_service_image_repository_url" {
  value = aws_ecr_repository.link_shortener["click-service"].repository_url
}

output "statistic_service_image_repository_url" {
  value = aws_ecr_repository.link_shortener["statistic-service"].repository_url
}

output "demo_service_image_repository_url" {
  value = aws_ecr_repository.link_shortener["demo-service"].repository_url
}

