resource "tls_private_key" "jump_server" {
  algorithm = "ED25519"
}

resource "aws_key_pair" "jump_server" {
  key_name_prefix = "jump-server-"
  public_key      = tls_private_key.jump_server.public_key_openssh
}
