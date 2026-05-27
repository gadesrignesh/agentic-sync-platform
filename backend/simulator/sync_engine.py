def check_synchronization(
    grid_voltage,
    generator_voltage,
    grid_frequency,
    generator_frequency,
    phase_angle
):

    # -----------------------------
    # DIFFERENCE CALCULATIONS
    # -----------------------------

    voltage_difference = abs(
        grid_voltage - generator_voltage
    )

    frequency_difference = abs(
        grid_frequency - generator_frequency
    )

    # -----------------------------
    # THRESHOLDS
    # -----------------------------

    MAX_VOLTAGE_DIFF = 10
    MAX_FREQUENCY_DIFF = 0.5
    MAX_PHASE_ANGLE = 10

    # -----------------------------
    # SYNCHRONIZATION LOGIC
    # -----------------------------

    sync_allowed = (
        voltage_difference <= MAX_VOLTAGE_DIFF
        and
        frequency_difference <= MAX_FREQUENCY_DIFF
        and
        phase_angle <= MAX_PHASE_ANGLE
    )

    # -----------------------------
    # AI RECOMMENDATION ENGINE
    # -----------------------------

    recommendations = []

    # Voltage recommendation

    if generator_voltage < grid_voltage:

        recommendations.append(
            "Increase generator excitation voltage."
        )

    elif generator_voltage > grid_voltage:

        recommendations.append(
            "Reduce generator excitation voltage."
        )

    # Frequency recommendation

    if generator_frequency < grid_frequency:

        recommendations.append(
            "Increase governor speed to raise frequency."
        )

    elif generator_frequency > grid_frequency:

        recommendations.append(
            "Reduce governor speed to lower frequency."
        )

    # Phase angle recommendation

    if phase_angle > MAX_PHASE_ANGLE:

        recommendations.append(
            "Adjust phase alignment before synchronization."
        )

    # If all conditions satisfied

    if sync_allowed:

        recommendations.append(
            "System ready for synchronization."
        )

    # -----------------------------
    # RETURN OUTPUT
    # -----------------------------

    return {

        "grid_voltage": grid_voltage,
        "generator_voltage": generator_voltage,

        "grid_frequency": grid_frequency,
        "generator_frequency": generator_frequency,

        "phase_angle": phase_angle,

        "voltage_difference": voltage_difference,
        "frequency_difference": frequency_difference,

        "sync_allowed": sync_allowed,

        "recommendations": recommendations

    }