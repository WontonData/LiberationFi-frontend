#!/usr/bin/env bash
set -e
npm run build
git checkout gh-pages
git pull origin gh-pages
git add -f dist
git commit -m "new deploy"
git subtree push --prefix dist origin gh-pages