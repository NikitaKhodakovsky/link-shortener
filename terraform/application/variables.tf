variable "project_name" {
  type    = string
  default = "link-shortener"
}

# AWS
variable "aws_region" {
  type    = string
  default = "eu-central-1"
}

variable "aws_availability_zones" {
  type    = tuple([string, string])
  default = ["eu-central-1a", "eu-central-1b"]
}

variable "aws_vpc_cidr_block" {
  type    = string
  default = "10.0.0.0/16"
}

# EKS
variable "eks_cluster_kubernetes_version" {
  type    = string
  default = "1.30"
}

variable "eks_node_group_instance_types" {
  type    = list(string)
  default = ["t3.medium"]
}

variable "eks_node_group_desired_size" {
  type    = number
  default = 2
}

variable "eks_node_group_min_size" {
  type    = number
  default = 2
}

variable "eks_node_group_max_size" {
  type    = number
  default = 3
}

# Kubernetes
variable "application_namespace_name" {
  type    = string
  default = "link-shortener"
}

variable "application_ingress_name" {
  type    = string
  default = "link-shortener"
}

variable "aws_load_balancer_controller_service_account_name" {
  type    = string
  default = "aws-load-balancer-controller"
}

# RDS
variable "db_username" {
  type      = string
  sensitive = true
  nullable  = false
}

variable "db_password" {
  type      = string
  sensitive = true
  nullable  = false
}

variable "db_default_database" {
  type    = string
  default = "postgres"
}

variable "db_postgres_version" {
  type    = string
  default = "16.4"
}

variable "db_instance_type" {
  type    = string
  default = "db.t3.medium"
}

variable "db_allocated_storage" {
  type    = string
  default = 40
}

# RabbitMQ
variable "rmq_username" {
  type      = string
  sensitive = true
  nullable  = false
}

variable "rmq_password" {
  type      = string
  sensitive = true
  nullable  = false
}

# JWT (ES256)
variable "jwt_public_key" {
  type      = string
  sensitive = true
  nullable  = false
}

variable "jwt_private_key" {
  type      = string
  sensitive = true
  nullable  = false
}

# Redis
variable "auth_service_redis_password" {
  type      = string
  sensitive = true
  nullable  = false
}

variable "click_service_redis_password" {
  type      = string
  sensitive = true
  nullable  = false
}

