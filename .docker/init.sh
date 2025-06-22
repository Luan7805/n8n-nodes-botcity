#!/bin/sh
mkdir -p ~/.n8n/nodes/
cd ~/.n8n/nodes/ || exit 1
npm link n8n-nodes-botcity
/docker-entrypoint.sh
