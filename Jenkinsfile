pipeline {
    agent any
    
    environment {
        HRM_URL = "${env.URL}"
        HRM_USERNAME = "${env.USERNAME}" 
        HRM_PASSWORD = credentials('hrm-password')
        //HEADLESS = 'true'
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