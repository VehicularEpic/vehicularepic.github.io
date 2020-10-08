#!/bin/sh
COMMIT_ID=$(git rev-parse HEAD)
REMOTE_URL=$(git config --get remote.origin.url)

cd dist

git init && git add -A
git commit -m "Build ${COMMIT_ID}"
git push -f ${REMOTE_URL} gh-pages

cd -
