#!/usr/bin/env bash
# 启动后端服务：自动准备虚拟环境 -> 安装依赖 -> 运行 FastAPI
set -e

# 切换到脚本所在目录（backend/），保证在哪执行都能跑
cd "$(dirname "$0")"

VENV_DIR=".venv"
PYTHON_BIN="python3"

# 1. 虚拟环境不存在则创建
if [ ! -d "$VENV_DIR" ]; then
  echo "==> 未找到虚拟环境，正在创建 $VENV_DIR ..."
  "$PYTHON_BIN" -m venv "$VENV_DIR"
fi

# 2. 安装/更新依赖（requirements.txt 有变动时才重新安装）
STAMP="$VENV_DIR/.requirements.stamp"
if [ ! -f "$STAMP" ] || [ "requirements.txt" -nt "$STAMP" ]; then
  echo "==> 正在安装依赖 ..."
  "$VENV_DIR/bin/pip" install -q -r requirements.txt
  touch "$STAMP"
fi

# 3. 启动服务（可通过参数覆盖：./start.sh 9000）
PORT="${1:-8000}"
echo "==> 启动服务: http://127.0.0.1:$PORT  (文档: http://127.0.0.1:$PORT/docs)"
exec "$VENV_DIR/bin/uvicorn" main:app --reload --port "$PORT"
