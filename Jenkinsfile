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
            mail(
                to: 'Jenkins <phanthothien204@gmail.com>',
                subject: 'E2E Test Result',
                body: 'Pass: ',
                cc: 'thien.210213@tbd.edu.vn',
                bcc: '',
                from: '',
                replyTo: '',
                mimeType: 'text/html',
                attachments: 'reports/cucumber-report.html' // <-- Sử dụng đường dẫn này
            )
        }
        
        success {
            echo 'Pipeline executed successfully!'
        }
        
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}