import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)
import time

from simulator.sync_engine import check_synchronization

from ai_agents.decision_engine import DecisionEngine

from ai_agents.auto_controller import AutoController


class AISynchronizationSystem:

    def __init__(self):

        # -----------------------------------
        # INITIAL SYSTEM VALUES
        # -----------------------------------

        self.grid_voltage = 110
        self.grid_frequency = 50

        self.generator_voltage = 92
        self.generator_frequency = 46

        self.phase_angle = 25

        # -----------------------------------
        # AI OBJECTS
        # -----------------------------------

        self.decision_engine = DecisionEngine()

        self.auto_controller = AutoController()

    # -----------------------------------
    # MAIN AI LOOP
    # -----------------------------------

    def run_system(self):

        cycle = 1

        while True:

            print("\n===================================")
            print(f"AI SYNCHRONIZATION CYCLE {cycle}")
            print("===================================")

            # -----------------------------------
            # RUN SYNCHRONIZATION ENGINE
            # -----------------------------------

            sync_result = check_synchronization(

                self.grid_voltage,

                self.generator_voltage,

                self.grid_frequency,

                self.generator_frequency,

                self.phase_angle

            )

            print("\nSYNC ENGINE RESULT:")
            print(sync_result)

            # -----------------------------------
            # RUN AI DECISION ENGINE
            # -----------------------------------

            ai_result = self.decision_engine.analyze_system(

                self.grid_voltage,

                self.generator_voltage,

                self.grid_frequency,

                self.generator_frequency,

                self.phase_angle

            )

            print("\nAI DECISION ENGINE:")
            print(ai_result)

            # -----------------------------------
            # CHECK SYNCHRONIZATION
            # -----------------------------------

            if ai_result["sync_allowed"]:

                print("\nSYSTEM SUCCESSFULLY SYNCHRONIZED!")

                break

            # -----------------------------------
            # RUN AUTO CONTROLLER
            # -----------------------------------

            control_result = self.auto_controller.auto_adjust(

                self.grid_voltage,

                self.generator_voltage,

                self.grid_frequency,

                self.generator_frequency,

                self.phase_angle

            )

            print("\nAUTO CONTROL ACTIONS:")
            print(control_result)

            # -----------------------------------
            # UPDATE VALUES
            # -----------------------------------

            self.generator_voltage = control_result[
                "generator_voltage"
            ]

            self.generator_frequency = control_result[
                "generator_frequency"
            ]

            self.phase_angle = control_result[
                "phase_angle"
            ]

            cycle += 1

            # -----------------------------------
            # LOOP DELAY
            # -----------------------------------

            time.sleep(1)


# -----------------------------------
# MAIN EXECUTION
# -----------------------------------

if __name__ == "__main__":

    ai_system = AISynchronizationSystem()

    ai_system.run_system()