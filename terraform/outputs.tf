########################################
# RDS Output
########################################

output "rds_endpoint" {
  description = "RDS MySQL endpoint (hostname only)"
  value       = aws_db_instance.mysql.address
}

output "rds_port" {
  description = "RDS MySQL port"
  value       = aws_db_instance.mysql.port
}

########################################
# Networking outputs
########################################

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

########################################
# EKS outputs
########################################

output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = aws_eks_cluster.eks.name
}

output "eks_cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = aws_eks_cluster.eks.endpoint
}

output "eks_cluster_arn" {
  description = "EKS cluster ARN"
  value       = aws_eks_cluster.eks.arn
}
