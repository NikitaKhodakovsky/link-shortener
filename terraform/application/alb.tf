resource "aws_lb" "link_shortener_ingress" {
  name                 = "link-shortener-ingress"
  load_balancer_type   = "application"
  internal             = false
  subnets              = values(aws_subnet.public)[*].id
  preserve_host_header = true

  tags = {
    "elbv2.k8s.aws/cluster"    = aws_eks_cluster.link_shortener.name
    "ingress.k8s.aws/resource" = "LoadBalancer"
    "ingress.k8s.aws/stack"    = "${var.application_namespace_name}/${var.application_ingress_name}"
  }
}
