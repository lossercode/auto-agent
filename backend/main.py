"""
FastAPI 主应用入口
"""
from fastapi import FastAPI

app = FastAPI(
    title="Stock Agent Service",
    version="0.1.0"
)


@app.get("/test")
async def test():
    return {"message": "Hello World"}


@app.get("/")
async def root():
    return {"name": "Stock Agent Service", "version": "0.1.0"}
