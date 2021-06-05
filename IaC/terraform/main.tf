variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "region" {}
variable "app_name" {}

provider "aws" {
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region = var.region
}

resource "aws_s3_bucket" "tfstate-storage" {
  bucket = "tfstate-${var.app_name}"
  acl    = "private"

  versioning {
    enabled = true
  }
}

resource "aws_dynamodb_table" "terraform-state-lock" {
  name           = "tfstate-lock-${var.app_name}"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

terraform {
  backend "s3" {
    bucket = "tfstate-ec-site"
    key = "terraform.tfstate"
    dynamodb_table = "tfstate-lock-ec-site"
    region="ap-northeast-1"
  }
}