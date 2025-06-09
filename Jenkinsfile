pipeline {
    agent any
    
    environment {
        URL = "${env.URL}"
        USERNAME = "${env.USERNAME}" 
        PASSWORD = credentials('hrm-password')
    }

    tools {
        nodejs 'NodeJS'
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
                sh 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx cucumber-js'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        
        success {
            echo 'Pipeline executed successfully!'
        }
        
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}