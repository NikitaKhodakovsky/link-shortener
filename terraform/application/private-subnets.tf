resource "aws_subnet" "private" {
  for_each = tomap({
    a = { cidr_block = "10.0.0.0/24", availability_zone = var.aws_availability_zones[0] },
    b = { cidr_block = "10.0.1.0/24", availability_zone = var.aws_availability_zones[1] }
  })

  vpc_id            = aws_vpc.link_shortener.id
  cidr_block        = each.value.cidr_block
  availability_zone = each.value.availability_zone

  tags = {
    Name = "${var.project_name}-private-subnet-${each.key}"

    # AWS Load Balancer Controller subnet autodiscovery
    "kubernetes.io/cluster/${var.project_name}" = "shared"
    "kubernetes.io/role/internal-elb"           = 1
  }
}

resource "aws_route_table" "private" {
  for_each = aws_subnet.private

  vpc_id = aws_vpc.link_shortener.id

  tags = {
    Name = "${var.project_name}-private-route-table-${each.key}"
  }
}

resource "aws_route" "nat_gateway" {
  for_each = aws_nat_gateway.link_shortener

  route_table_id         = aws_route_table.private[each.key].id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.link_shortener[each.key].id
}

resource "aws_route_table_association" "private" {
  for_each = aws_subnet.private

  route_table_id = aws_route_table.private[each.key].id
  subnet_id      = each.value.id
}

