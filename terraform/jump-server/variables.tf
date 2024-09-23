variable "aws_region" {
  type    = string
  default = "eu-central-1"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "instance_ami" {
  type    = string
  default = "ami-00f07845aed8c0ee7"
}

variable "vpc_id" {
  type     = string
  nullable = false
}

variable "public_subnet_id" {
  type     = string
  nullable = false
}

