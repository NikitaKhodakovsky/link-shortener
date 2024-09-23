# Public Subnets
resource "aws_subnet" "public" {
  for_each = tomap({
    a = { cidr_block = "10.0.20.0/24", availability_zone = var.aws_availability_zones[0] },
    b = { cidr_block = "10.0.21.0/24", availability_zone = var.aws_availability_zones[1] }
  })

  vpc_id            = aws_vpc.link_shortener.id
  cidr_block        = each.value.cidr_block
  availability_zone = each.value.availability_zone

  # Required for EKS
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-public-subnet-${each.key}"

    # AWS Load Balancer Controller subnet autodiscovery
    "kubernetes.io/cluster/${var.project_name}" = "shared"
    "kubernetes.io/role/elb"                    = 1
  }
}

# Public Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.link_shortener.id

  tags = {
    Name = "${var.project_name}-public-route-table"
  }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.link_shortener.id
  }
}

# Public Route Table Associations
resource "aws_route_table_association" "public" {
  for_each = aws_subnet.public

  route_table_id = aws_route_table.public.id
  subnet_id      = each.value.id
}

