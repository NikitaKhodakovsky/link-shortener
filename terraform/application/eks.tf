resource "aws_eks_cluster" "link_shortener" {
  name     = var.project_name
  version  = var.eks_cluster_kubernetes_version
  role_arn = aws_iam_role.eks_cluster.arn

  depends_on = [
    aws_iam_role_policy_attachment.amazon_eks_cluster_policy
  ]

  vpc_config {
    subnet_ids = concat(
      values(aws_subnet.public)[*].id,
      values(aws_subnet.private)[*].id
    )
  }

  provisioner "local-exec" {
    command = "aws eks update-kubeconfig --name ${var.project_name} --region ${var.aws_region} --alias ${var.project_name} --user-alias ${var.project_name}"
  }
}

resource "aws_eks_node_group" "link_shortener" {
  cluster_name    = aws_eks_cluster.link_shortener.name
  node_group_name = "${var.project_name}-node-group"
  node_role_arn   = aws_iam_role.node_group.arn

  ami_type       = "AL2_x86_64"
  instance_types = var.eks_node_group_instance_types
  capacity_type  = "ON_DEMAND"

  disk_size = 40

  subnet_ids = values(aws_subnet.private)[*].id

  scaling_config {
    desired_size = var.eks_node_group_desired_size
    min_size     = var.eks_node_group_min_size
    max_size     = var.eks_node_group_max_size
  }

  depends_on = [
    aws_iam_role_policy_attachment.amazon_ec2_container_registry_read_only,
    aws_iam_role_policy_attachment.amazon_eks_worker_node_policy,
    aws_iam_role_policy_attachment.amazon_eks_cni_policy
  ]
}
