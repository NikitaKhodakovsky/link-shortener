resource "aws_vpc" "link_shortener" {
  cidr_block       = var.aws_vpc_cidr_block
  instance_tenancy = "default"

  # Required for EKS
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_internet_gateway" "link_shortener" {
  vpc_id = aws_vpc.link_shortener.id
  tags = {
    Name = "${var.project_name}-internet-gateway"
  }
}

