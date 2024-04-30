# Task 2

> Deploy a backend-frontend app using Kubernetes. 
> 
> - __Backend:__ application that listens to a port and sends some response if a message comes there. Must be replicated.
> - __Frontend:__ application that sends incoming requests to the backend.
> 
> Frontend must have an IP that can be used outside the cluster. Use Kubernetes Services. 

# Set up the repository

1. Clone the repo
   ```sh
   git clone https://github.com/ahrami/grid2024.git
   ```
2. Go to the repo directory
   ```sh
   cd grid2024
   ```
3. Switch to the task branch
   ```sh
   git checkout task_2-kubernetes
   ```

# Docker compose

- Start
   ```sh
   docker compose up --build --detach
   ```
   
- Access the website at: `http://localhost/`

- Stop and cleanup
   ```sh
   docker compose down --rmi local
   ```

# Kubernetes

### Create cluster using kind

-
   ```sh
   kind create cluster --config=kind-config.yaml
   ```

### Set up kubectl

- Check available contexts
   ```sh
   kubectl config get-contexts
   ```

- Use this project's context
   ```sh
   kubectl config use-context kind-kind-andyrift
   ```

### Build docker images

- __Backend__
   ```sh
   docker build -t andyrift-backend:latest ./backend
   ```

- __UI__
   ```sh
   docker build -t andyrift-ui:latest ./ui
   ```

- __Nginx__
   ```sh
   docker build -t andyrift-nginx:latest ./nginx
   ```

-  
   > Check docker images<br>
   >   ```sh
   >   docker image ls
   >   ```

### Load docker images into the cluster

-
   ```sh
   kind load docker-image andyrift-backend:latest andyrift-ui:latest andyrift-nginx:latest --name kind-andyrift
   ```

   > Sheck if the images are present<br>
   > ```sh
   > docker exec -it kind-andyrift-control-plane crictl images
   > ```

### Apply manifests

- __Backend__
   ```sh
   kubectl apply -f backend-deployment.yaml -f backend-service.yaml
   ```

- __UI__
   ```sh
   kubectl apply -f ui-deployment.yaml -f ui-service.yaml
   ```

- __Nginx__
   ```sh
   kubectl apply -f nginx-deployment.yaml -f nginx-service.yaml
   ``` 

## Check for vital signs

- List nodes and their ips (from this you can discover control plane ip)
   ```sh
   kubectl get nodes -o wide
   ```

- Cluster info
   ```sh
   kubectl cluster-info
   ```

- List services
   ```sh
   kubectl get services
   ```

- List deployments
   ```sh
   kubectl get deployments
   ```

- List pods
   ```sh
   kubectl get pods
   ```

## Access the website

Access the website at:

 - `http://localhost/`
 - `http://{control-plane-ip}:30000/` _(check the previous chapter: "Check for vital signs")_

## Cleanup

- Remove docker images
   ```sh
   docker rmi andyrift-backend:latest andyrift-ui:latest andyrift-nginx:latest
   ```

- Delete kind k8s cluster
   ```sh
   kind delete cluster --name kind-andyrift
   ```