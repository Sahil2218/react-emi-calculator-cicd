pipeline {
    agent any

    environment {
        APP_NAME = 'react-emi-calculator-cicd'
        REGISTRY = 'ghcr.io'
        IMAGE_REPOSITORY = 'ghcr.io/sahil2218/react-emi-calculator-cicd'
        IMAGE_TAG = "${BUILD_NUMBER}"
        K8S_NAMESPACE = 'emi-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint and Build') {
            steps {
                sh 'npm run lint'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_REPOSITORY}:${IMAGE_TAG} -t ${IMAGE_REPOSITORY}:latest .'
            }
        }

        stage('Push Docker Image to GHCR') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ghcr-credentials', usernameVariable: 'GHCR_USER', passwordVariable: 'GHCR_TOKEN')]) {
                    sh '''
                        echo "$GHCR_TOKEN" | docker login $REGISTRY -u "$GHCR_USER" --password-stdin
                        docker push ${IMAGE_REPOSITORY}:${IMAGE_TAG}
                        docker push ${IMAGE_REPOSITORY}:latest
                        docker logout $REGISTRY
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-emi-demo', variable: 'KUBECONFIG')]) {
                    sh '''
                        kubectl apply -f k8s/namespace.yaml
                        kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml
                        kubectl -n ${K8S_NAMESPACE} set image deployment/emi-calculator emi-calculator=${IMAGE_REPOSITORY}:${IMAGE_TAG}
                        kubectl -n ${K8S_NAMESPACE} rollout status deployment/emi-calculator --timeout=120s
                        kubectl -n ${K8S_NAMESPACE} get pods,svc
                    '''
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
            cleanWs()
        }
        success {
            echo "Deployment complete: ${IMAGE_REPOSITORY}:${IMAGE_TAG}"
        }
        failure {
            echo 'Pipeline failed. Review the stage logs before retrying.'
        }
    }
}
