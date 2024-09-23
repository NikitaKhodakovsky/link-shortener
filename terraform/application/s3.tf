resource "aws_s3_bucket" "link_shortener_ui" {
  bucket_prefix = "${var.project_name}-ui-"

  # Should not be in production.
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "link_shortener_ui" {
  bucket = aws_s3_bucket.link_shortener_ui.id

  restrict_public_buckets = false
  block_public_policy     = false
  block_public_acls       = true
  ignore_public_acls      = true
}

resource "aws_s3_bucket_policy" "link_shortener_ui_cloud_formation" {
  bucket = aws_s3_bucket.link_shortener_ui.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "AllowPublicAccesstoObjects",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.link_shortener_ui.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.link_shortener_ui]
}

# Redirect from root to /dashboard/
resource "aws_s3_object" "redirect" {
  bucket       = aws_s3_bucket.link_shortener_ui.id
  key          = "index.html"
  source       = "./files/redirect.html"
  content_type = "text/html"
}

resource "aws_s3_bucket_website_configuration" "link_shortener_ui" {
  bucket     = aws_s3_bucket.link_shortener_ui.id
  depends_on = [aws_s3_bucket_public_access_block.link_shortener_ui]

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "dashboard/index.html"
  }
}
