output "jump_server_ip" {
  value = aws_instance.jump_server.public_ip
}

output "public_key" {
  value = tls_private_key.jump_server.public_key_openssh
}

output "private_key" {
  value     = tls_private_key.jump_server.private_key_openssh
  sensitive = true
}
