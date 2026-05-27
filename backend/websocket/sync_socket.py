from fastapi import WebSocket
import asyncio
from simulator.sync_simulator import get_sync_status


async def websocket_endpoint(websocket: WebSocket):

    await websocket.accept()

    while True:

        data = get_sync_status()

        await websocket.send_json(data)

        await asyncio.sleep(1)