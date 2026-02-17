resource "aws_db_subnet_group" "db" {
  name       = "${var.project_name}-mysql-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "${var.project_name}-mysql-subnet-group"
  }
}

resource "aws_db_instance" "mysql" {
  identifier        = "${var.project_name}-mysql"
  engine            = "mysql"
  engine_version    = "8.0"
  instance_class    = "db.t4g.micro" # low cost
  allocated_storage = 20
  storage_type      = "gp3" # better than gp2

  db_name  = var.db_name
  username = var.db_user
  password = var.db_password

  port = 3306

  db_subnet_group_name   = aws_db_subnet_group.db.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  publicly_accessible = false
  multi_az            = false
  deletion_protection = false
  skip_final_snapshot = true

  backup_retention_period = 1
  storage_encrypted       = true
  apply_immediately       = true

  tags = {
    Name = "${var.project_name}-mysql"
  }
}
