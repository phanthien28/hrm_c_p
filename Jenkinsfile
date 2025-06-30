pipeline {
    agent any
    
    environment {
        HRM_URL = "${env.URL}"
        HRM_USERNAME = "${env.USERNAME}" 
        HRM_PASSWORD = credentials('hrm-password')
        ALLURE_REPORT_URL = "${env.BUILD_URL}allure" // Create URL for Allure report
    }
    // 1. install environment
    tools {
        nodejs 'NodeJS'
        allure 'allure'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        // 2. Install dependencies
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install'
            }
        }
        // 3. Run tests
        stage('Run Tests') {
            steps {
                // Create folder allure-results
                sh 'mkdir -p allure-results'
                
                // Run tests and generate Allure results
                sh 'npm run test'
            }
        }
    }
    
    post {
        always {
            // Create Allure report from results
            allure([
                includeProperties: false, 
                jdk: '', 
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
            
            script {    
                // Save URL report using to email
                env.ALLURE_REPORT_URL = "${env.BUILD_URL}allure"

                // Send email with Allure report
                // mail(
                //     to: 'Jenkins <phanthothien204@gmail.com>',
                //     subject: "E2E Test Result: ${currentBuild.currentResult}",
                //     body: """
                //         Test run results: ${currentBuild.currentResult}
                        
                //         Allure Report: ${env.ALLURE_REPORT_URL}
                        
                //         Details:
                //         - Build URL: ${env.BUILD_URL}
                //         - Console Output: ${env.BUILD_URL}console
                //     """,
                //     cc: 'thien.210213@tbd.edu.vn',
                //     bcc: '',
                //     from: '',
                //     replyTo: '',
                // )
                
                // Send message to webhook
                def payload = [
                    status: currentBuild.currentResult,
                    allureReport: env.ALLURE_REPORT_URL,
                    buildUrl: env.BUILD_URL,
                    consoleUrl: "${env.BUILD_URL}console"
                ]
                def response = httpRequest(
                    httpMode: 'POST',
                    url: 'https://a05a-118-70-103-147.ngrok-free.app/webhook', // Thay bằng URL webhook/ngrok của bạn
                    contentType: 'APPLICATION_JSON',
                    requestBody: groovy.json.JsonOutput.toJson(payload)
                )
                if (response.status == 200) {
                    echo "Webhook triggered successfully!"
                } else {
                    echo "Webhook failed! Status: ${response.status}, Body: ${response.content}"
                }
            }

            cleanWs(patterns: [[pattern: 'node_modules/', type: 'EXCLUDE']])
        }
        
        success {
            echo 'Pipeline executed successfully!'
        }
        
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}