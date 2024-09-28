React application in GKE
====================
This repository contains a React application that can be deploy to K8s cluster.

## Deployment to GKE

### Prerequisites
To run the application locally in kubernetes, you will need:

* [Docker](https://www.docker.com)
* [gcloud CLI](https://cloud.google.com/sdk/docs/install)
* Have [Make](https://www.gnu.org/software/make/)
installed and accessible from your terminal (usually just needed for Windows).
* [Helm](https://helm.sh/docs/intro/install/)
* [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)

### How to deploy
1. Configure the glocloud cli
```shell
gcloud auth login
gcloud init
```

2. Enable the Kubernetes API and Artifact Registry AP:
```shell
gcloud services enable container.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

3. Create a Docker image repository in Artifact Registry
```shell
gcloud artifacts repositories create my-repo --repository-format=docker --location=us-central1
```

4. Configure Docker to use the gcloud credential helper.
```shell
gcloud auth configure-docker us-central1-docker.pkg.dev
```

5. Create a GKE Cluster:
```shell
gcloud container clusters create my-gke-cluster --zone us-central1-a --num-nodes=2
```

6. Configure kubectl to Use the GKE Cluster:
```shell
gcloud container clusters get-credentials my-gke-cluster --zone us-central1-a
```
7. Build and push the Docker image using the Makefile:
```shell
make REPOSITORY_DOMAIN="us-central1-docker.pkg.dev" REPOSITORY_PATH="${PROJECT_ID}/my-repo" build-docker
make REPOSITORY_DOMAIN="us-central1-docker.pkg.dev" REPOSITORY_PATH="${PROJECT_ID}/my-repo" push-images
```

8. Create the namespace(if needed):
```shell
make create-namespace
```

9. Deploy:
```shell
make REPOSITORY_DOMAIN="us-central1-docker.pkg.dev" REPOSITORY_PATH="${PROJECT_ID}/my-repo" deploy
```

10. Once the testing is finished, destroy
```shell
make destroy-chart
```

## Local Deployment

### Prerequisites
To run the application locally in kubernetes, you will need:

* [Docker](https://www.docker.com)
* Have [Make](https://www.gnu.org/software/make/)
installed and accessible from your terminal (usually just needed for Windows).
* [Helm](https://helm.sh/docs/intro/install/)
* [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)

### How to run
1. Open and start [Docker Desktop Application](https://docs.docker.com/desktop/release-notes/)

2. Enable kubernetes in Docker Desktop

3. Set the current context to docker-desktop:
```shell
kubectl config use-context docker-desktop
```
4. Build the docker image:
```shell
make build-docker
```

5. Create the namespace:
```shell
make create-namespace
```

6. Deploy:
```shell
make deploy
```

7. Once the testing is finished, destroy
```shell
make destroy-chart
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
