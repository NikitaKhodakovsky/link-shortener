provider "aws" {
  region = var.aws_region
}

provider "kubernetes" {
  host                   = aws_eks_cluster.link_shortener.endpoint
  cluster_ca_certificate = base64decode(aws_eks_cluster.link_shortener.certificate_authority[0].data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args = [
      "eks",
      "get-token",
      "--cluster-name",
      aws_eks_cluster.link_shortener.name,
      "--region",
      var.aws_region,
    ]
  }
}
