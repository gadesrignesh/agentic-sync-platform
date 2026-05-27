import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)
from simulator.sync_engine import check_synchronization

from ai_agents.ai_agent import SynchronizationAIAgent

from ai_agents.automation_agent import AutomationAgent


# INITIAL SYSTEM VALUES

grid_voltage = 110
generator_voltage = 92

grid_frequency = 50
generator_frequency = 46

phase_angle = 25


# CREATE AI OBJECTS

ai_agent = SynchronizationAIAgent()

automation_agent = AutomationAgent()


# AUTOMATION LOOP

for step in range(1, 6):

    print(f"\n==============================")
    print(f"AUTOMATION CYCLE {step}")
    print(f"==============================")

    # RUN SYNC ENGINE

    sync_result = check_synchronization(
        grid_voltage,
        generator_voltage,
        grid_frequency,
        generator_frequency,
        phase_angle
    )

    print("\nSYNC ENGINE RESULT:")
    print(sync_result)

    # RUN AI ANALYSIS

    ai_result = ai_agent.analyze(sync_result)

    print("\nAI ANALYSIS:")
    print(ai_result)

    # IF SYNCHRONIZATION SUCCESSFUL

    if sync_result["sync_allowed"]:

        print("\nSYSTEM SUCCESSFULLY SYNCHRONIZED!")
        break

    # RUN AUTOMATION AGENT

    auto_result = automation_agent.auto_correct(sync_result)

    print("\nAUTOMATION ACTIONS:")
    print(auto_result)

    # UPDATE SYSTEM VALUES

    generator_voltage = auto_result["corrected_voltage"]

    generator_frequency = auto_result["corrected_frequency"]

    phase_angle = auto_result["corrected_phase_angle"]

print("\n===== AUTOMATION PROCESS COMPLETE =====")