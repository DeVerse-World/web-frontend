pipeline {
    environment {
    registry = "lth08091998/deverse"
    registryCredential = 'dockerhub'
    dockerImage = 'deversefe'
    }

    agent any
    stages {
            stage('Cloning our Git') {
                steps {
                git 'git@github.com:DeVerse-World/web-frontend.git'
                }
            }

            stage('Building Docker Image') {
                steps {
                    script {
                        dockerImage = docker.build registry + ":$BUILD_NUMBER"
                    }
                }
            }

            stage('Deploying Docker Image to Dockerhub') {
                steps {
                    script {
                        docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                        }
                    }
                }
            }

            stage('Cleaning Up') {
                steps{
                  sh "docker rmi --force $registry:$BUILD_NUMBER"
                }
            }
    }
}