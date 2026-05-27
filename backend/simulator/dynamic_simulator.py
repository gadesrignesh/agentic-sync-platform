import random
import time

from sync_engine import check_synchronization


# ------------------------------------
# INITIAL SYSTEM VALUES
# ------------------------------------

grid_voltage = 110
grid_frequency = 50


generator_voltage = 90
generator_frequency = 45

phase_angle = 40


# ------------------------------------
# LIVE DYNAMIC SIMULATION
# ------------------------------------

while True:

    # --------------------------------
    # SIMULATE GENERATOR ADJUSTMENTS
    # --------------------------------

    # Slowly move generator voltage
    # toward grid voltage

    if generator_voltage < grid_voltage:

        generator_voltage += random.uniform(0.2, 1.0)

    elif generator_voltage > grid_voltage:

        generator_voltage -= random.uniform(0.2, 1.0)


    # Slowly move generator frequency
    # toward grid frequency

    if generator_frequency < grid_frequency:

        generator_frequency += random.uniform(0.1, 0.5)

    elif generator_frequency > grid_frequency:

        generator_frequency -= random.uniform(0.1, 0.5)


    # Slowly reduce phase angle

    if phase_angle > 0:

        phase_angle -= random.uniform(0.5, 2.0)


    # --------------------------------
    # ADD SMALL REALISTIC FLUCTUATIONS
    # --------------------------------

    generator_voltage += random.uniform(-0.3, 0.3)

    generator_frequency += random.uniform(-0.05, 0.05)


    # Prevent negative phase angle

    if phase_angle < 0:

        phase_angle = 0


    # --------------------------------
    # CHECK SYNCHRONIZATION
    # --------------------------------

    result = check_synchronization(

        grid_voltage=round(grid_voltage, 2),

        generator_voltage=round(generator_voltage, 2),

        grid_frequency=round(grid_frequency, 2),

        generator_frequency=round(generator_frequency, 2),

        phase_angle=round(phase_angle, 2)

    )


    # --------------------------------
    # PRINT LIVE STATUS
    # --------------------------------

    print("\n===================================")
    print("LIVE SYNCHRONIZATION STATUS")
    print("===================================")

    print(result)


    # --------------------------------
    # STOP IF SYNCHRONIZED
    # --------------------------------

    if result["sync_allowed"]:

        print("\n✅ SYNCHRONIZATION SUCCESSFUL")
        break


    # --------------------------------
    # WAIT BEFORE NEXT UPDATE
    # --------------------------------

    time.sleep(1)