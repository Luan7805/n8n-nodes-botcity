docker run -ti --rm \
  -v $(pwd):/build \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v $(pwd)/.container_home:/home/node \
  --user $(id -u):$(id -g) \
  -e HOME=/home/node \
  -w /build \
  --hostname dev-container \
  node:20 bash
