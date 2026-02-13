
output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint (hostname only)"
  value       = aws_db_instance.postgres.address
}

########################################
# ECS / CI-CD critical outputs
########################################

########################################
# Networking outputs
########################################

output "private_subnet_ids" {
  description = "Private subnet IDs for ECS tasks"
  value       = aws_subnet.private[*].id
}

########################################
# Optional / debugging
########################################

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}


output "eks_cluster_name" {
  value = aws_eks_cluster.eks.name
}

output "eks_cluster_endpoint" {
  value = aws_eks_cluster.eks.endpoint
}

