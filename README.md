# Task 2

Deploy a backend-frontend app using Kubernetes. 

- __Backend:__ application that listens to a port and sends some response if a message comes there. Must be replicated.
- __Frontend:__ application that sends incoming requests to the backend.

Frontend must have an IP that can be used outside the cluster. Use Kubernetes Services. 


## To start

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


### Set up kind

-
   ```sh
   kind create cluster --config=kind.config.yaml
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

### Build Docker images

1.
   ```sh
   docker build -t andyrift-backend:latest ./backend
   ```
2.
   ```sh
   docker build -t andyrift-ui:latest ./ui
   ```
3.
   ```sh
   docker build -t andyrift-nginx:latest ./nginx
   ```

### Load Docker images into the cluster

-
   ```sh
   kind load docker-image andyrift-backend:latest andyrift-ui:latest andyrift-nginx:latest --name kind-andyrift
   ```

-
   > check if the images are present<br>
   > ```sh
   > docker exec -it kind-andyrift-control-plane crictl images
   > ```

### apply backend manifests

-
   ```sh
   kubectl apply -f backend-deployment.yaml -f backend-service.yaml
   ```

1.
   ```sh
   kubectl apply -f backend-deployment.yaml
   ```

2.
   ```sh
   kubectl apply -f backend-service.yaml
   ```

### apply ui manifests

-
   ```sh
   kubectl apply -f ui-deployment.yaml -f ui-service.yaml
   ```

1.
   ```sh
   kubectl apply -f ui-deployment.yaml 
   ```

2.
   ```sh
   kubectl apply -f ui-service.yaml
   ```

### apply nginx manifests

-
   ```sh
   kubectl apply -f nginx-deployment.yaml -f nginx-service.yaml
   ```

1.
   ```sh
   kubectl apply -f nginx-deployment.yaml
   ```

2.
   ```sh
   kubectl apply -f nginx-service.yaml
   ```
   

## Check

-
   ```sh
   kubectl cluster-info
   ```

-
   ```sh
   kubectl get nodes
   ```

-
   ```sh
   kubectl get services
   ```

-
   ```sh
   kubectl get deployments
   ```

-
   ```sh
   kubectl get pods
   ```


## Cleanup

   ```sh
   kind delete cluster --name kind-andyrift
   ```
