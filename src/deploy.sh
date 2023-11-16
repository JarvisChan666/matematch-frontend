#deploy.sh
docker pull jarvischan630/matematch-frontend:1.0
# container, image-name
docker run --name matematch-frontend -d -p 8081:80 jarvischan630/matematch-frontend:1.0
docker stop matematch-frontend
docker rm matematch-frontend
docker run --name matematch-frontend -d -p 8081:80 jarvischan630/matematch-frontend:1.0
docker image prune -f
docker container prune -f
