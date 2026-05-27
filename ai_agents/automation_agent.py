class AutomationAgent:

    def auto_correct(self, sync_data):

        generator_voltage = sync_data["generator_voltage"]
        generator_frequency = sync_data["generator_frequency"]
        phase_angle = sync_data["phase_angle"]

        recommendations = []

        # AUTO VOLTAGE CORRECTION
        if sync_data["voltage_difference"] > 5:
            generator_voltage += 2
            recommendations.append(
                "AI increased generator voltage."
            )

        # AUTO FREQUENCY CORRECTION
        if sync_data["frequency_difference"] > 0.5:
            generator_frequency += 0.5
            recommendations.append(
                "AI increased generator frequency."
            )

        # AUTO PHASE CORRECTION
        if phase_angle > 10:
            phase_angle -= 5
            recommendations.append(
                "AI adjusted phase angle."
            )

        return {
            "corrected_voltage": generator_voltage,
            "corrected_frequency": generator_frequency,
            "corrected_phase_angle": phase_angle,
            "automation_actions": recommendations
        }


# TESTING

if __name__ == "__main__":

    sample_data = {
        "generator_voltage": 95,
        "generator_frequency": 47,
        "phase_angle": 20,
        "voltage_difference": 15,
        "frequency_difference": 3
    }

    agent = AutomationAgent()

    result = agent.auto_correct(sample_data)

    print("\n===== AUTOMATION RESULT =====")
    print(result)