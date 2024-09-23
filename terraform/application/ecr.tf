resource "aws_ecr_repository" "link_shortener" {
  for_each = toset(["auth-service", "link-service", "click-service", "statistic-service", "demo-service"])
  name     = "${var.project_name}/${each.key}"

  # Should not be in production.
  force_delete = true
}

