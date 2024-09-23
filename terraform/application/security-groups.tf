# RDS Security Group
resource "aws_security_group" "rds" {
  vpc_id      = aws_vpc.link_shortener.id
  name        = "link-shortener-rds"
  description = "Allow inbound and outbound TCP traffic on port 5432."
}

resource "aws_vpc_security_group_ingress_rule" "rds_inbound" {
  security_group_id = aws_security_group.rds.id
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 5432
  to_port           = 5432
}

resource "aws_vpc_security_group_egress_rule" "rds_outbound" {
  security_group_id = aws_security_group.rds.id
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 5432
  to_port           = 5432
}

