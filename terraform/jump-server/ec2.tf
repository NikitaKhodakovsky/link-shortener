resource "aws_instance" "jump_server" {
  ami                         = var.instance_ami
  instance_type               = var.instance_type
  key_name                    = aws_key_pair.jump_server.key_name
  associate_public_ip_address = true
  subnet_id                   = var.public_subnet_id

  tags = {
    Name = "jump-server"
  }
}

resource "aws_network_interface_sg_attachment" "jump_server" {
  network_interface_id = aws_instance.jump_server.primary_network_interface_id
  security_group_id    = aws_security_group.jump_server.id
}
