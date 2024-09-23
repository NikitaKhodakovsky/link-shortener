# AWS Load Balancer Controller
resource "kubernetes_service_account" "aws_load_balancer_controller" {
  metadata {
    name      = var.aws_load_balancer_controller_service_account_name
    namespace = "kube-system"
    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.aws_load_balancer_controller.arn
    }
  }
}

# Namespace
resource "kubernetes_namespace" "link_shortener" {
  metadata {
    name = var.application_namespace_name
  }
}

# PostgreSQL
resource "kubernetes_config_map" "postgres" {
  metadata {
    name      = "postgres"
    namespace = var.application_namespace_name
  }

  data = {
    host = aws_db_instance.link_shortener.address
    port = aws_db_instance.link_shortener.port
  }
}

resource "kubernetes_secret" "postgres" {
  metadata {
    name      = "postgres"
    namespace = var.application_namespace_name
  }

  data = {
    username = var.db_username
    password = var.db_password
  }
}

# RabbitMQ
resource "kubernetes_secret" "rabbitmq" {
  metadata {
    name      = "rabbitmq"
    namespace = var.application_namespace_name
  }

  data = {
    username = var.rmq_username
    password = var.rmq_password
  }
}

# JWT
resource "kubernetes_secret" "jwt" {
  metadata {
    name      = "jwt"
    namespace = var.application_namespace_name
  }

  data = {
    public_key  = var.jwt_public_key
    private_key = var.jwt_private_key
  }
}

# Redis
resource "kubernetes_secret" "auth-service-redis" {
  metadata {
    name      = "auth-service-redis"
    namespace = var.application_namespace_name
  }

  data = {
    password = var.auth_service_redis_password
  }
}

resource "kubernetes_secret" "click-service-redis" {
  metadata {
    name      = "click-service-redis"
    namespace = var.application_namespace_name
  }

  data = {
    password = var.click_service_redis_password
  }
}

