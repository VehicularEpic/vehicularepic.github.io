#!/bin/sh
COMMIT_ID=$(git rev-parse HEAD)
REMOTE_URL=$(git config --get remote.origin.url | sed "s/github.com/VitorMac10:${DEPLOY_TOKEN}@github.com/g")

AUTHOR=$(git show HEAD | grep 'Author')
AUTHOR_NAME=$(echo $AUTHOR | cut -f2 -d ' ')
AUTHOR_EMAIL=$(echo $AUTHOR | cut -f3 -d ' ' | sed 's/<//g; s/>//g')

cd dist

git init && git checkout -b gh-pages
git add -A &&
git -c user.name="${AUTHOR_NAME}" -c user.email="${AUTHOR_EMAIL}" commit -m "Build ${COMMIT_ID}"
git push -f ${REMOTE_URL} gh-pages

cd -
