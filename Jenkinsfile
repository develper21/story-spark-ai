pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh '''
                    node --version
                    corepack pnpm --version
                    corepack pnpm install --frozen-lockfile
                '''
            }
        }

        stage('Lint') {
            steps {
                sh 'corepack pnpm lint'
            }
        }

        stage('Test') {
            steps {
                sh 'corepack pnpm test'
            }
        }

        stage('Build') {
            steps {
                sh 'corepack pnpm build'
            }
        }
    }
}