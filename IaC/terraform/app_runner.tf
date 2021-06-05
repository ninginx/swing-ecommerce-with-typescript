resource "aws_apprunner_service" "ec-backend" {
  service_name = "ec-backend"

  source_configuration {
    image_repository {
      image_configuration {
        port = "8000"
      }
      image_identifier      = "public.ecr.aws/jg/hello:latest"
      image_repository_type = "ECR_PUBLIC"
    }
  }

  tags = {
    Name = "example-apprunner-service"
  }
}