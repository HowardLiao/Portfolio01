#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "========================================="
echo " Deploying Portfolio01 to GitHub"
echo "========================================="

echo "1. Pushing main branch..."
git push -u origin main

echo "2. Pushing gh-pages branch..."
git push origin main:gh-pages

echo "========================================="
echo " Successfully Deployed!"
echo " Live URL: https://howardliao.github.io/Portfolio01/"
echo "========================================="
