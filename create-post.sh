#!/bin/bash

# Jekyll記事作成スクリプト
# 使用方法: ./create-post.sh

set -e

# 色付きの出力用
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Jekyll記事作成ツール${NC}"
echo "================================"

# タイトルの入力
echo -e "${YELLOW}記事のタイトルを入力してください:${NC}"
read -p "> " title

if [ -z "$title" ]; then
    echo "エラー: タイトルが入力されていません"
    exit 1
fi

# URLの入力
echo -e "${YELLOW}URLスラッグを入力してください (スペースは自動的にハイフンに置き換えられます):${NC}"
read -p "> " url_input

if [ -z "$url_input" ]; then
    echo "エラー: URLが入力されていません"
    exit 1
fi

# スペースをハイフンに置き換え、小文字に変換
url=$(echo "$url_input" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

# 日付の取得
date_filename=$(date "+%Y-%m-%d")
date_frontmatter=$(date "+%Y-%m-%d %H:%M:%S %z")

# ファイル名の作成
filename="${date_filename}-${url}.md"
filepath="_posts/${filename}"

# 既に同じファイルが存在するかチェック
if [ -f "$filepath" ]; then
    echo "エラー: ファイル '$filepath' は既に存在します"
    exit 1
fi

# フロントマターとファイル内容の作成
cat > "$filepath" << EOF
---
layout: post
title: ${title}
date: ${date_frontmatter}
categories:
tags:
---

EOF

# 成功メッセージ
echo -e "${GREEN}✓ 記事ファイルが正常に作成されました!${NC}"
echo "ファイル: $filepath"
echo "タイトル: $title"
echo "URL: $url"
echo "日付: $date_frontmatter"
echo ""
echo -e "${BLUE}記事の編集を開始するには:${NC}"
echo "code $filepath"