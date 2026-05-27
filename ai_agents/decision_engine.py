class DecisionEngine:

    def __init__(self):

        self.voltage_threshold = 5
        self.frequency_threshold = 0.5
        self.phase_threshold = 10

    # -----------------------------------
    # MAIN AI DECISION FUNCTION
    # -----------------------------------

    def analyze_system(

        self,

        grid_voltage,
        generator_voltage,

        grid_frequency,
        generator_frequency,

        phase_angle

    ):

        recommendations = []

        actions = []

        confidence_score = 100

        sync_allowed = True

        # -----------------------------------
        # VOLTAGE ANALYSIS
        # -----------------------------------

        voltage_difference = abs(

            grid_voltage - generator_voltage

        )

        if voltage_difference > self.voltage_threshold:

            sync_allowed = False

            confidence_score -= 20

            recommendations.append(

                "Voltage mismatch detected."

            )

            if generator_voltage < grid_voltage:

                actions.append(

                    "Increase generator excitation voltage."
                )

            else:

                actions.append(

                    "Reduce generator excitation voltage."
                )

        # -----------------------------------
        # FREQUENCY ANALYSIS
        # -----------------------------------

        frequency_difference = abs(

            grid_frequency - generator_frequency

        )

        if frequency_difference > self.frequency_threshold:

            sync_allowed = False

            confidence_score -= 20

            recommendations.append(

                "Frequency mismatch detected."

            )

            if generator_frequency < grid_frequency:

                actions.append(

                    "Increase generator speed."
                )

            else:

                actions.append(

                    "Reduce generator speed."
                )

        # -----------------------------------
        # PHASE ANGLE ANALYSIS
        # -----------------------------------

        if phase_angle > self.phase_threshold:

            sync_allowed = False

            confidence_score -= 20

            recommendations.append(

                "Phase angle too high."

            )

            actions.append(

                "Adjust phase alignment."
            )

        # -----------------------------------
        # FINAL AI DECISION
        # -----------------------------------

        if sync_allowed:

            recommendations.append(

                "System ready for synchronization."
            )

            actions.append(

                "Close synchronization breaker."
            )

        else:

            recommendations.append(

                "Synchronization conditions not satisfied."
            )

        # -----------------------------------
        # PREDICTIVE AI SCORE
        # -----------------------------------

        synchronization_probability = max(

            0,

            min(

                100,

                confidence_score

            )

        )

        # -----------------------------------
        # RETURN AI OUTPUT
        # -----------------------------------

        return {

            "sync_allowed": sync_allowed,

            "confidence_score": confidence_score,

            "synchronization_probability":
            synchronization_probability,

            "voltage_difference":
            round(voltage_difference, 2),

            "frequency_difference":
            round(frequency_difference, 2),

            "phase_angle":
            round(phase_angle, 2),

            "recommendations":
            recommendations,

            "actions":
            actions

        }