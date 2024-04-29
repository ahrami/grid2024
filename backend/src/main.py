from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

import time

from .config import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Counter():
    count: int = 0
    
counter = Counter()

@app.get("/")
async def root():
    time.sleep(0.2)
    return {"count": counter.count}

class CounterBody(BaseModel):
    value: int = Field(0, ge=0)

@app.post("/add")
async def add(body: CounterBody):
    time.sleep(0.2)
    counter.count += body.value
    return {"count": counter.count}

@app.post("/subtract")
async def subtract(body: CounterBody):
    time.sleep(0.2)
    counter.count -= body.value
    return {"count": counter.count}