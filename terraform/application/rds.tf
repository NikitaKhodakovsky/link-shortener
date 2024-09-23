resource "aws_db_subnet_group" "link_shortener" {
  name       = "${var.project_name}-subnet-group"
  subnet_ids = values(aws_subnet.private)[*].id
}

resource "aws_db_parameter_group" "link_shortener" {
  name   = "${var.project_name}-parameter-group"
  family = "postgres16"

  parameter {
    name  = "log_connections"
    value = "1"
  }

  parameter {
    name  = "rds.force_ssl"
    value = "0"
  }
}

resource "aws_db_instance" "link_shortener" {
  identifier             = var.project_name
  instance_class         = var.db_instance_type
  allocated_storage      = var.db_allocated_storage
  engine                 = "postgres"
  engine_version         = var.db_postgres_version
  username               = var.db_username
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.link_shortener.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  parameter_group_name   = aws_db_parameter_group.link_shortener.name
  db_name                = var.db_default_database

  # Should not be in production.
  skip_final_snapshot = true
}
