#!/bin/bash

IMAGE_NAME="pickeat"
TAG="dev"
CONTAINER_NAME="pickeat-backend"
PORT=8080

echo "=== Docker 이미지 빌드 ==="
docker build -t ${IMAGE_NAME}:${TAG} -f Dockerfile .

echo "=== 기존 컨테이너 삭제 (있으면) ==="
docker rm -f ${CONTAINER_NAME} 2>/dev/null || true

echo "=== 새 컨테이너 실행 ==="
docker run -d --name ${CONTAINER_NAME} -p ${PORT}:8080 ${IMAGE_NAME}:${TAG}
