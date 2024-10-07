pipeline {
    agent {label 'evuro-server'}
  
    stages {
        stage('App Build') {
            steps {
                script {
                    // Use for select on Branch name
                    def branchName = sh(returnStdout: true, script: 'echo $GIT_BRANCH | cut -d "/" -f 2').trim()
                    def TAG = "" // Declare TAG variable with an empty string
                    //User IF condition 
                    println(branchName)
                    if (branchName == "implement-google-login") {
                        TAG = 'dev-'
                    }
                  		def buildNumber = env.BUILD_NUMBER
                  		def imageTag = "${TAG}frontend"
                        sh "docker build -t evuro:${imageTag}-${buildNumber} -t evuro:${imageTag}-latest ."
                    }
                }
            }
    }
    post {
        success {
            script {
                    // Trigger the "main" branch job if the build was triggered from the "beta" branch
                    build job: 'Evuro-frontend-job'
                }
            }
        }
    }

