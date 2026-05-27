class SynchronizationAIAgent:

    def analyze(self, sync_data):

        recommendations = []

        voltage_diff = sync_data["voltage_difference"]
        frequency_diff = sync_data["frequency_difference"]
        phase_angle = sync_data["phase_angle"]

        sync_allowed = sync_data["sync_allowed"]

        # Voltage Analysis
        if voltage_diff > 5:
            recommendations.append(
                "Voltage mismatch detected. Increase generator excitation voltage."
            )

        # Frequency Analysis
        if frequency_diff > 0.5:
            recommendations.append(
                "Frequency mismatch detected. Increase generator speed."
            )

        # Phase Angle Analysis
        if phase_angle > 10:
            recommendations.append(
                "Phase angle too high. Adjust phase alignment."
            )

        # Final Synchronization Decision
        if sync_allowed:
            recommendations.append(
                "System ready for synchronization."
            )
        else:
            recommendations.append(
                "Synchronization conditions not satisfied."
            )

        # AI Confidence Score
        confidence_score = self.calculate_confidence(
            voltage_diff,
            frequency_diff,
            phase_angle
        )

        return {
            "ai_recommendations": recommendations,
            "confidence_score": confidence_score
        }

    def calculate_confidence(
        self,
        voltage_diff,
        frequency_diff,
        phase_angle
    ):

        score = 100

        score -= voltage_diff * 2
        score -= frequency_diff * 10
        score -= phase_angle * 1.5

        if score < 0:
            score = 0

        return round(score, 2)


# TESTING

if __name__ == "__main__":

    sample_data = {
        "voltage_difference": 8,
        "frequency_difference": 1.2,
        "phase_angle": 15,
        "sync_allowed": False
    }

    agent = SynchronizationAIAgent()

    result = agent.analyze(sample_data)

    print("\n===== AI ANALYSIS =====")
    print(result)