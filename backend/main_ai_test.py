from simulator.sync_engine import check_synchronization
from ai_agents.ai_agent import SynchronizationAIAgent


# SAMPLE INPUT DATA

grid_voltage = 110
generator_voltage = 98

grid_frequency = 50
generator_frequency = 48.2

phase_angle = 22


# RUN SYNCHRONIZATION ENGINE

sync_result = check_synchronization(
    grid_voltage,
    generator_voltage,
    grid_frequency,
    generator_frequency,
    phase_angle
)

print("\n===== SYNCHRONIZATION ENGINE =====")
print(sync_result)


# RUN AI AGENT

agent = SynchronizationAIAgent()

ai_result = agent.analyze(sync_result)

print("\n===== AI ANALYSIS =====")
print(ai_result)