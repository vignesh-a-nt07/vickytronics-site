resource "aws_db_subnet_group" "db" {
  name       = "mysql-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "mysql-subnet-group"
  }
}

resource "aws_db_instance" "mysql" {
  identifier        = "mysql-rds-instance"
  engine            = "mysql"
  engine_version    = "8.0"
  instance_class    = "db.t4g.micro"   # low cost option
  allocated_storage = 20
  storage_type      = "gp2"

  db_name  = var.db_name
  username = var.db_user
  password = var.db_password

  port = 3306

  db_subnet_group_name   = aws_db_subnet_group.db.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  publicly_accessible = false
  skip_final_snapshot = true
  deletion_protection = false
  multi_az            = false

  tags = {
    Name = "mysql-rds"
  }
}
