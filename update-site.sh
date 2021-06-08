#!/usr/bin/env bash

git checkout gh-pages
git merge master
yarn run build
yarn run deploy
git checkout master