terraform {
  backend "s3" {
    bucket         = "ecom-vicky-terraform-state-492000"
    key            = "ecom/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-ecom-lock"
    encrypt        = true
  }
}
