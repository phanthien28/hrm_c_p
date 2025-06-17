// pipeline {
//     agent any
    
//     environment {
//         HRM_URL = "${env.URL}"
//         HRM_USERNAME = "${env.USERNAME}" 
//         HRM_PASSWORD = credentials('hrm-password')
//         //HEADLESS = 'true'
//     }

//     tools {
//         nodejs 'NodeJS'
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm ci'
//                 sh 'npx playwright install'
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 sh 'npx cucumber-js'
//             }
//         }
//     }
    
//     post {
//         always {
//             mail(
//                 to: 'Jenkins <phanthothien204@gmail.com>',
//                 subject: 'E2E Test Result',
//                 body: 'Pass:',
//                 cc: 'thien.210213@tbd.edu.vn',
//                 bcc: '',
//                 from: '',
//                 replyTo: '',
//             )
//             cleanWs()
//         }
        
//         success {
//             echo 'Pipeline executed successfully!'
//         }
        
//         failure {
//             echo 'Pipeline execution failed!'
//         }
//     }
// }


pipeline {
    agent any
    
    environment {
        HRM_URL = "${env.URL}"
        HRM_USERNAME = "${env.USERNAME}" 
        HRM_PASSWORD = credentials('hrm-password')
        ALLURE_REPORT_URL = "${env.BUILD_URL}allure" // Tạo URL cho báo cáo Allure
    }

    tools {
        nodejs 'NodeJS'
        allure 'allure' // Sử dụng Allure tool đã cấu hình
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
                // Tạo thư mục allure-results
                sh 'mkdir -p allure-results'
                
                // Chạy tests với Allure reporter
                sh 'npx cucumber-js'
            }
        }
        
        stage('Generate Allure Report') {
            steps {
                // Tạo báo cáo Allure
                allure([
                    includeProperties: false, 
                    jdk: '', 
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
                
                // Lưu URL báo cáo để sử dụng trong email
                script {
                    env.ALLURE_REPORT_URL = "${env.BUILD_URL}allure"
                }
            }
        }
    }
    
    post {
        always {
            // Gửi email với URL báo cáo Allure
            mail(
                to: 'Jenkins <phanthothien204@gmail.com>',
                subject: "E2E Test Result: ${currentBuild.currentResult}",
                body: """
                    Test run results: ${currentBuild.currentResult}
                    
                    Allure Report: ${env.ALLURE_REPORT_URL}
                    
                    Details:
                    - Build URL: ${env.BUILD_URL}
                    - Console Output: ${env.BUILD_URL}console
                """,
                cc: 'thien.210213@tbd.edu.vn',
                bcc: '',
                from: '',
                replyTo: '',
            )
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