class AutoController:

    def __init__(self):

        self.voltage_step = 1.5

        self.frequency_step = 0.2

        self.phase_step = 2

    # -----------------------------------
    # MAIN AUTO CONTROL FUNCTION
    # -----------------------------------

    def auto_adjust(

        self,

        grid_voltage,
        generator_voltage,

        grid_frequency,
        generator_frequency,

        phase_angle

    ):

        actions_taken = []

        # -----------------------------------
        # VOLTAGE AUTO CONTROL
        # -----------------------------------

        if generator_voltage < grid_voltage:

            generator_voltage += self.voltage_step

            actions_taken.append(

                "AI increased generator voltage."
            )

        elif generator_voltage > grid_voltage:

            generator_voltage -= self.voltage_step

            actions_taken.append(

                "AI reduced generator voltage."
            )

        # -----------------------------------
        # FREQUENCY AUTO CONTROL
        # -----------------------------------

        if generator_frequency < grid_frequency:

            generator_frequency += self.frequency_step

            actions_taken.append(

                "AI increased generator frequency."
            )

        elif generator_frequency > grid_frequency:

            generator_frequency -= self.frequency_step

            actions_taken.append(

                "AI reduced generator frequency."
            )

        # -----------------------------------
        # PHASE ANGLE AUTO CONTROL
        # -----------------------------------

        if phase_angle > 0:

            phase_angle -= self.phase_step

            actions_taken.append(

                "AI corrected phase angle."
            )

        # -----------------------------------
        # PREVENT NEGATIVE VALUES
        # -----------------------------------

        if phase_angle < 0:

            phase_angle = 0

        # -----------------------------------
        # RETURN UPDATED VALUES
        # -----------------------------------

        return {

            "generator_voltage":
            round(generator_voltage, 2),

            "generator_frequency":
            round(generator_frequency, 2),

            "phase_angle":
            round(phase_angle, 2),

            "actions_taken":
            actions_taken

        }