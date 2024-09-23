resource "aws_eip" "nat_gateway" {
  for_each   = aws_subnet.public
  depends_on = [aws_internet_gateway.link_shortener]

  tags = {
    Name = "${var.project_name}-nat-gateway-${each.key}"
  }
}

resource "aws_nat_gateway" "link_shortener" {
  for_each = aws_subnet.public

  allocation_id = aws_eip.nat_gateway[each.key].id
  subnet_id     = each.value.id

  tags = {
    Name = "${var.project_name}-nat-gateway-${each.key}"
  }
}

