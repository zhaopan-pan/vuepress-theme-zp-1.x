#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 登录npm
npm login

# 发布
npm publish

cd -
