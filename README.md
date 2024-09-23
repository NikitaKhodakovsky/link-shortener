# Link Shortener

Link shortener application with comprehensive click analytics. The application gathers statistics about the browser, operating system and device from which the click was made.

[Demo](https://shortener.khodakovsky.com) allows you to create a demo account with demo data without the registration process, so feel free to check it out.

## Table of contents

-   [Screenshots](#screenshots)
-   [Built with](#built-with)
    -   [Common](#common)
    -   [Front End](#front-end)
    -   [Back End](#back-end)
-   [Architecture Overview](#architecture-overview)
    -   [Diagrams](#diagrams)
    -   [Documentation](#documentation)
    -   [Auth Service](#auth-service)
    -   [Link Service](#link-service)
    -   [Click Service](#click-service)
    -   [Demo Service](#demo-service)
    -   [Email Service](#email-service)
-   [How to deploy the application (Kubernetes | AWS | Terraform)](#how-to-deploy-the-application-kubernetes--aws--terraform)
-   [How to deploy the application (Docker Compose)](#how-to-deploy-the-application-docker-compose)

<br>

## Screenshots

![list-desktop-dark](./images/list-desktop-dark.png)
![list-desktop-light](./images/list-desktop-light.png)

![list-mobile-dark](./images/list-mobile-dark.png)
![list-mobile-light](./images/list-mobile-light.png)

![details-desktop-dark](./images/details-desktop-dark.png)
![details-desktop-light](./images/details-desktop-light.png)

![details-mobile-dark](./images/details-mobile-dark.png)
![details-mobile-light](./images/details-mobile-light.png)

<br>

## Built with

### Common

-   TypeScript
-   NGINX
-   Swagger

### DevOps

-   Docker
-   Kubernetes
-   Helm
-   AWS
-   Terraform
-   Turborepo

### Front end

-   React
-   React Query
-   Formik
-   Chart.js
-   SASS / CSS modules
-   Mobile-first workflow
-   Vite

### Back end

-   NodeJS
-   NestJS
-   RabbitMQ
-   PostgreSQL
-   Redis
-   TypeORM
-   Express

<br>

## Architecture Overview

### Diagrams

Architecture diagram ([draw.io](./images/Architecture.drawio)):

![](./images/Architecture.jpg)

RabbitMQ diagram ([draw.io](./images/RabbitMQ.drawio)):

![](./images/RabbitMQ.jpg)

### Documentation

Documentation:

-   [Swagger (Auth Service)](https://shortener.khodakovsky.com/api/auth/swagger)
-   [Swagger (Link Service)](https://shortener.khodakovsky.com/api/links/swagger)
-   [Swagger (Click Service)](https://shortener.khodakovsky.com/swagger)
-   [Swagger (Demo Service)](https://shortener.khodakovsky.com/api/demo/swagger)

### Auth Service

**Auth Service** is responsible for authentication and stores information about users.

Authentication is implemented using JWT with asymmetric encryption.

### Link Service

**Link Service** stores information about links.

### Click Service

**Click Service** redirects users from a short link to a destination link.

For each click **Click Service** generates an event with related information for further processing in the **Statistic Service**. Separation of redirection and click collection logic increases fault tolerance, allows asynchronous data processing, reduces redirect time and allows independent scaling.

Responses from **Link Service** are cached using **Redis** to reduce redirect time and reduce load on **Link Service**.

### Statistic Service

**Statistic Service** is responsible for collecting and storing information about clicks.

To reduce the load on the database, clicks are inserted using bulk insertion.

### Demo Service

**Demo Service** generates mock clicks for demo accounts.

### Email Service

**Email Service** is not yet implemented.

<br>

## How to deploy the application (Kubernetes | AWS | Terraform)

### Prerequisites

To run the application, you must have **Terraform**, **AWS CLI**, **kubectl**, **Helm**, **NodeJS**, **Docker** and **Git** installed and configured on your computer.

All commands must be run from the root of the repository.

The following **AWS** managed policies must be attached to your **AWS** user:

-   **IAMFullAccess**
-   **AmazonEC2FullAccess**
-   **AmazonRDSFullAccess**
-   **AmazonEC2ContainerRegistryFullAccess**
-   **CloudFrontFullAccess**
-   **AmazonS3FullAccess**

To manage the **EKS** cluster, you must create the following custom policy and attach it to your user:

```JSON
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": "eks:*",
			"Resource": "*"
		}
	]
}
```

### Clone the repository

Clone the repository:

```console
git clone https://github.com/NikitaKhodakovsky/link-shortener.git
```

Navigate to the directory with the repository:

```console
cd link-shortener
```

### Customize variables

Create `terraform.tfvars` file in the [terraform/application](./terraform/application) directory and fill it with your own values.

Sample configuration containing values only for required variables:

```hcl
# PostgreSQL
db_username = "postgres"
db_password = "password"

# RabbitMQ
rmq_username = "rabbitmq"
rmq_password = "password"

# JWT
jwt_public_key = <<EOF
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE9Qc1AS7LbTIIH7a+DkwoiuwGwn1t
zENC7S4rHyuKA4hU9etyZj8/BCh25bBKCLmYr3E0Suv/83iBKR7uBym9bw==
-----END PUBLIC KEY-----
EOF

jwt_private_key = <<EOF
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIIlXCGBhnD867XQE0HnI6rh2vhLEQmKtpZ5C/MC9BarhoAoGCCqGSM49
AwEHoUQDQgAE9Qc1AS7LbTIIH7a+DkwoiuwGwn1tzENC7S4rHyuKA4hU9etyZj8/
BCh25bBKCLmYr3E0Suv/83iBKR7uBym9bw==
-----END EC PRIVATE KEY-----
EOF

# Redis
auth_service_redis_password  = "password"
click_service_redis_password = "password"
```

> You can see all variables and their default values in the [terraform/application/variables.tf](./terraform/application/variables.tf) file.

### Deploy the infrastructure

Initialize the **Terraform** configuration:

```console
terraform -chdir=terraform/application init
```

Apply **Terraform** configuration to deploy the **AWS** infrastructure:

```console
terraform -chdir=terraform/application apply
```

List of the provided infrastructure:

-   1 **VPC**
-   1 **Internet Gateway**
-   2 **NAT Gateways** (one per availability zone)
-   2 **Public Subnets** (one per availability zone)
-   2 **Private Subnets** (one per availability zone)
-   1 **EKS Cluster**
-   2-3 **EC2 Instances** (depends on **EKS** cluster autoscaling)
-   1 **Application Load Balancer** for ingress.
-   1 **RDS Instance**
-   1 **CloudFront Distibution**
-   1 **S3 Bucket** for storing **UI** assets.

### Build and push images

Authenticate to the **ECR** registry:

```console
aws ecr get-login-password --region "$(terraform -chdir=terraform/application output -raw aws_region)" |
docker login --username AWS --password-stdin "$(terraform -chdir=terraform/application output -raw ecr_registry_domain)"
```

You should see the following output:

```
Login Succeeded
```

Build, tag and push images:

```console
scripts/build-tag-and-push-images.sh
```

### Build and deploy UI

Install dependencies:

```console
npm i
```

Build the **UI**:

```console
npx turbo build --filter=ui
```

Upload **UI** artifacts to the **S3** bucket:

```console
aws s3 cp apps/ui/dist s3://$(terraform -chdir=terraform/application output -raw ui_bucket_name)/dashboard/ --recursive
```

### Create databases

If you are running this application for the first time, you should manually create databases for the **Auth Service**, **Link Service** and **Statistic Service** in the **RDS** instance. It runs in the private subnet, so it is not accessible outside of **VPC**. To access it, you need to create a jump server in the public subnet and connect to the **RDS** instance through it.

Initialize the **Terraform** configuration:

```console
terraform -chdir=terraform/jump-server init
```

Create a jump server:

```console
terraform -chdir=terraform/jump-server apply \
    -var="vpc_id=$(terraform -chdir=terraform/application output -raw vpc_id)" \
    -var="public_subnet_id=$(terraform -chdir=terraform/application output -raw public_subnet_id)"
```

> Wait until the **EC2** instance completes its initialization. This may take a few minutes.

Save the private key to a file and set appropriate access permissions:

```console
terraform -chdir=terraform/jump-server output -raw private_key > private-key.pem && chmod 600 private-key.pem
```

Install the **PostgreSQL** client on the jump server:

```console
ssh -i private-key.pem ec2-user@$(terraform -chdir=terraform/jump-server output -raw jump_server_ip) "sudo yum install -y postgresql15"
```

Check the installation:

```console
ssh -i private-key.pem ec2-user@$(terraform -chdir=terraform/jump-server output -raw jump_server_ip) "psql --version"
```

You should see the version of the **PostgreSQL** client:

```
psql (PostgreSQL) 15.8
```

Create databases:

```console
ssh -i private-key.pem ec2-user@$(terraform -chdir=terraform/jump-server output -raw jump_server_ip) " \
    PGPASSWORD='$(terraform -chdir=terraform/application output -raw db_password)' \
    psql \
        --host='$(terraform -chdir=terraform/application output -raw db_host)' \
        --port='$(terraform -chdir=terraform/application output -raw db_port)' \
        --username='$(terraform -chdir=terraform/application output -raw db_username)' \
        --dbname='$(terraform -chdir=terraform/application output -raw db_default_database)' \
        --command='CREATE DATABASE \"auth-service\";' \
        --command='CREATE DATABASE \"link-service\";' \
        --command='CREATE DATABASE \"statistic-service\";' \
        --command='\l auth-service|link-service|statistic-service' \
    "
```

The output should contain a list of three databases:

```
       Name        |  Owner   | Encoding |   Collate   |    Ctype    | ICU Locale | Locale Provider | Access privileges
-------------------+----------+----------+-------------+-------------+------------+-----------------+-------------------
 auth-service      | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 |            | libc            |
 link-service      | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 |            | libc            |
 statistic-service | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 |            | libc            |
(3 rows)
```

Destroy the jump server:

```console
terraform -chdir=terraform/jump-server destroy \
    -var="vpc_id=$(terraform -chdir=terraform/application output -raw vpc_id)" \
    -var="public_subnet_id=$(terraform -chdir=terraform/application output -raw public_subnet_id)"
```

Delete the private key:

```console
rm private-key.pem
```

### Deploy the application

Authenticate to the **Kubernetes** cluster:

```console
aws eks update-kubeconfig \
    --region "$(terraform -chdir=terraform/application output -raw aws_region)" \
    --name "$(terraform -chdir=terraform/application output -raw eks_cluster_name)" \
    --alias "$(terraform -chdir=terraform/application output -raw eks_cluster_name)" \
    --user-alias "$(terraform -chdir=terraform/application output -raw eks_cluster_name)"
```

You should see the following output:

```
Updated context link-shortener in <path-to-kube-config>
```

Replace placeholders with image repository urls:

```console
scripts/replace-placeholders-with-image-repository-urls.sh
```

Deploy the application to the **Kubernetes** cluster:

```console
scripts/deploy-the-application.sh
```

### Synchronize the schema

If you are running this application for the first time, you should manually synchronize the database schema:

Synchronize the schema of the **Auth Service**:

```console
kubectl exec \
    -n "$(terraform -chdir=terraform/application output -raw application_namespace_name)" \
    deployment/auth-service \
    -- sh -c "cd apps/auth-service && npm run typeorm:prod schema:sync"
```

Synchronize the schema of the **Link Service**:

```console
kubectl exec \
    -n "$(terraform -chdir=terraform/application output -raw application_namespace_name)" \
    deployment/link-service \
    -- sh -c "cd apps/link-service && npm run typeorm:prod schema:sync"
```

Synchronize the schema of the **Statistic Service**:

```console
kubectl exec \
    -n "$(terraform -chdir=terraform/application output -raw application_namespace_name)" \
    deployment/statistic-service \
    -- sh -c "cd apps/statistic-service && npm run typeorm:prod schema:sync"
```

The output of each command should contain the following string at the end:

```
Schema synchronization finished successfully.
```

### How to access the application

You can access the application using **CloudFront** distribution url:

```console
terraform -chdir=terraform/application output cloud_front_distribution_url
```

### How to stop the application

Remove all resources from the **Kubernetes** cluster:

```console
scripts/stop-the-application.sh
```

> The explicit removal of resources from the **Kubernetes** cluster is important, because the **AWS Load Balancer Controller** should be able to remove the objects it has created in the **ELB**.

Destroy the **AWS** infrastructure:

```
terraform -chdir=terraform/application destroy
```

Make sure that all resources [listed here](#deploy-the-infrastructure) have been removed.

<br>

## How to deploy the application (Docker Compose)

To run the application you need to install [Docker](https://docs.docker.com/engine/install)

Run this command to verify that the installation is correct:

```console
docker -v
```

You should see something like this:

```console
Docker version 24.0.7, build afdd53b
```

Clone the repository:

```console
git clone https://github.com/NikitaKhodakovsky/link-shortener.git
```

Navigate to the directory with the repository:

```console
cd link-shortener
```

Execute the following command to start the application:

```console
docker compose --env-file ./.env.example up -d
```

The app is now available at http://localhost

### Database Schema Synchronization

If you are running this application for the first time, you should manually synchronize the database schema.

Synchronize the schema of the **Auth Service**:

```
docker container exec -t link-shortener_auth-service sh -c "cd apps/auth-service && npm run typeorm:prod schema:sync"
```

Synchronize the schema of the **Link Service**:

```
docker container exec -t link-shortener_link-service sh -c "cd apps/link-service && npm run typeorm:prod schema:sync"
```

Synchronize the schema of the **Statistic Service**:

```
docker container exec -t link-shortener_statistic-service sh -c "cd apps/statistic-service && npm run typeorm:prod schema:sync"
```

The output of each command should contain the following string at the end:

```
Schema synchronization finished successfully.
```

### How to stop the application

To stop the application run:

```console
docker compose down
```

<br>
