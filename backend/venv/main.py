from fastapi import FastAPI, WebSocket
from simulator.sync_simulator import get_sync_status
from websocket.sync_socket import websocket_endpoint

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Agentic AI Synchronization Backend Running"}


@app.get("/sync-status")
def sync_status():
    return get_sync_status()


@app.websocket("/ws/sync")
async def websocket_sync(websocket: WebSocket):
    await websocket_endpoint(websocket)