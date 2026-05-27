import sys
import os

from dotenv import load_dotenv

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

# ====================================
# LOAD ENV VARIABLES
# ====================================

load_dotenv()

import google.generativeai as genai

# ====================================
# GEMINI API KEY
# ====================================

GEMINI_API_KEY = "AIzaSyBmctjlu0whTjz2AlkrmHsbk7Qis4Eb_eo"

# ====================================
# GEMINI CONFIGURATION
# ====================================

genai.configure(
    api_key=GEMINI_API_KEY
)

# ====================================
# GEMINI MODEL
# ====================================

gemini_model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

# ====================================
# FASTAPI IMPORTS
# ====================================

from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from fastapi.middleware.cors import CORSMiddleware

# ====================================
# PYTHON IMPORTS
# ====================================

import asyncio
import random

# ====================================
# PROJECT IMPORTS
# ====================================

from backend.simulator.sync_engine import check_synchronization

from ai_agents.ai_agent import SynchronizationAIAgent

from ai_agents.automation_agent import AutomationAgent


# ====================================
# FASTAPI APP
# ====================================

app = FastAPI()


# ====================================
# ENABLE CORS
# ====================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


# ====================================
# INITIAL GRID VALUES
# ====================================

grid_voltage = 110

grid_frequency = 50


# ====================================
# INITIAL GENERATOR VALUES
# ====================================

generator_voltage = 90

generator_frequency = 45

phase_angle = 40


# ====================================
# AI OBJECTS
# ====================================

ai_agent = SynchronizationAIAgent()

automation_agent = AutomationAgent()


# ====================================
# ROOT ROUTE
# ====================================

@app.get("/")

def home():

    return {

        "message":

        "Agentic AI Synchronization Backend Running"

    }


# ====================================
# WEBSOCKET ROUTE
# ====================================

@app.websocket("/ws/sync")

async def websocket_endpoint(websocket: WebSocket):

    global generator_voltage
    global generator_frequency
    global phase_angle

    # ====================================
    # ACCEPT CONNECTION
    # ====================================

    await websocket.accept()

    print("WebSocket Client Connected")

    try:

        while True:

            # ====================================
            # DYNAMIC SYSTEM SIMULATION
            # ====================================

            # VOLTAGE MOVEMENT

            if generator_voltage < grid_voltage:

                generator_voltage += random.uniform(0.2, 1.0)

            elif generator_voltage > grid_voltage:

                generator_voltage -= random.uniform(0.2, 1.0)


            # ====================================
            # FREQUENCY MOVEMENT
            # ====================================

            if generator_frequency < grid_frequency:

                generator_frequency += random.uniform(0.1, 0.5)

            elif generator_frequency > grid_frequency:

                generator_frequency -= random.uniform(0.1, 0.5)


            # ====================================
            # PHASE ANGLE MOVEMENT
            # ====================================

            if phase_angle > 0:

                phase_angle -= random.uniform(0.5, 2.0)


            # ====================================
            # REALISTIC FLUCTUATIONS
            # ====================================

            generator_voltage += random.uniform(-0.3, 0.3)

            generator_frequency += random.uniform(-0.05, 0.05)


            # ====================================
            # PREVENT NEGATIVE VALUES
            # ====================================

            if phase_angle < 0:

                phase_angle = 0


            # ====================================
            # SYNCHRONIZATION ENGINE
            # ====================================

            result = check_synchronization(

                grid_voltage=round(grid_voltage, 2),

                generator_voltage=round(generator_voltage, 2),

                grid_frequency=round(grid_frequency, 2),

                generator_frequency=round(generator_frequency, 2),

                phase_angle=round(phase_angle, 2)

            )


            # ====================================
            # AI ANALYSIS
            # ====================================

            ai_result = ai_agent.analyze(result)


            # ====================================
            # AUTOMATION AGENT
            # ====================================

            auto_result = automation_agent.auto_correct(result)


            # ====================================
            # APPLY AUTO CORRECTIONS
            # ====================================

            generator_voltage = auto_result[
                "corrected_voltage"
            ]

            generator_frequency = auto_result[
                "corrected_frequency"
            ]

            phase_angle = auto_result[
                "corrected_phase_angle"
            ]


            # ====================================
            # SEND DATA TO FRONTEND
            # ====================================

            await websocket.send_json({

                "sync_engine": result,

                "ai_analysis": ai_result,

                "automation": auto_result

            })


            # ====================================
            # LOOP DELAY
            # ====================================

            await asyncio.sleep(1)


    # ====================================
    # HANDLE DISCONNECT
    # ====================================

    except WebSocketDisconnect:

        print("Client Disconnected")


    # ====================================
    # HANDLE OTHER ERRORS
    # ====================================

    except Exception as e:

        print("WebSocket Error:", e)

# ====================================
# MANUAL SYNCHRONIZATION ANALYSIS
# ====================================

# ====================================
# MANUAL SYNCHRONIZATION ANALYSIS
# ====================================

@app.post("/analyze-sync")

async def analyze_sync(data: dict):

    # ====================================
    # GET VALUES
    # ====================================

    grid_voltage = float(data["grid_voltage"])

    generator_voltage = float(
        data["generator_voltage"]
    )

    grid_frequency = float(
        data["grid_frequency"]
    )

    generator_frequency = float(
        data["generator_frequency"]
    )

    phase_angle = float(
        data["phase_angle"]
    )

    # ====================================
    # DIFFERENCE CALCULATIONS
    # ====================================

    voltage_diff = abs(

        grid_voltage - generator_voltage

    )

    frequency_diff = abs(

        grid_frequency - generator_frequency

    )

    # ====================================
    # SYNCHRONIZATION LOGIC
    # ====================================

    synchronized = (

        voltage_diff <= 5

        and

        frequency_diff <= 0.5

        and

        phase_angle <= 10

    )

    status = (

        "SYNCHRONIZED"

        if synchronized

        else

        "NOT SYNCHRONIZED"

    )

    # ====================================
    # BUILD REASONS
    # ====================================

    reasons = []

    if voltage_diff > 5:

        reasons.append(
            "Voltage mismatch exceeds threshold"
        )

    if frequency_diff > 0.5:

        reasons.append(
            "Frequency mismatch too high"
        )

    if phase_angle > 10:

        reasons.append(
            "Phase angle exceeds synchronization limit"
        )

    # ====================================
    # RECOMMENDATIONS
    # ====================================

    recommendations = []

    if voltage_diff > 5:

        recommendations.append(
            f"Adjust generator voltage closer to {grid_voltage}V"
        )

    if frequency_diff > 0.5:

        recommendations.append(
            f"Adjust generator frequency closer to {grid_frequency}Hz"
        )

    if phase_angle > 10:

        recommendations.append(
            "Reduce phase angle below 10°"
        )

    # ====================================
    # PERFECT CONDITION
    # ====================================

    if synchronized:

        reasons.append(
            "All synchronization conditions satisfied"
        )

        recommendations.append(
            "Safe to close synchronizing breaker"
        )

    # ====================================
    # CONFIDENCE SCORE
    # ====================================

    confidence = 98

    if voltage_diff > 5:

        confidence -= 30

    if frequency_diff > 0.5:

        confidence -= 30

    if phase_angle > 10:

        confidence -= 30

    # ====================================
    # FINAL RESPONSE
    # ====================================

    return {

        "status": status,

        "synchronized": synchronized,

        "reasons": reasons,

        "recommendations": recommendations,

        "confidence": max(confidence, 0)

    }
# ====================================
# AI CHAT ENDPOINT
# ====================================

# ====================================
# AI CHAT ENDPOINT
# ====================================

@app.post("/chat")

async def chat_with_ai(data: dict):

    user_message = data["message"]

    try:

        # ====================================
        # PROMPT
        # ====================================

        prompt = f"""
        You are SyncAI Assistant.

        You are an intelligent AI operator assistant for:
        - Power systems
        - Generator synchronization
        - Electrical engineering
        - Protection systems
        - Voltage
        - Frequency
        - Phase angle
        - Synchronizing relays
        - AI industrial automation

        You can ALSO answer general questions professionally.

        Keep responses:
        - professional
        - clear
        - concise
        - operator friendly

        User Question:
        {user_message}
        """

        # ====================================
        # GEMINI RESPONSE
        # ====================================

        response = gemini_model.generate_content(
            prompt
        )

        # ====================================
        # RETURN RESPONSE
        # ====================================

        return {

            "reply": response.text

        }

    except Exception as e:

        return {

            "reply": f"Gemini AI Error: {str(e)}"

        }

    except Exception as e:

        return {

            "reply": f"Gemini AI Error: {str(e)}"

        }