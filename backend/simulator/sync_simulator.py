from simulator.generator_model import Generator
from simulator.grid_model import Grid
import random

generator = Generator()
grid = Grid()


def update_generator():

    # Random frequency fluctuation
    generator.frequency += random.uniform(-0.2, 0.2)

    # Keep frequency within realistic range
    generator.frequency = max(48, min(generator.frequency, 52))

    # Voltage fluctuation
    generator.voltage += random.uniform(-1, 1)

    # Keep voltage within realistic range
    generator.voltage = max(95, min(generator.voltage, 115))

    # Phase angle fluctuation
    generator.phase_angle += random.uniform(-2, 2)

    # Keep phase angle within limits
    generator.phase_angle = max(0, min(generator.phase_angle, 30))


def get_sync_status():

    update_generator()

    voltage_diff = abs(grid.voltage - generator.voltage)

    frequency_diff = abs(grid.frequency - generator.frequency)

    phase_diff = abs(generator.phase_angle)

    sync_allowed = (
        voltage_diff <= 5 and
        frequency_diff <= 0.2 and
        phase_diff <= 10
    )

    return {
        "grid_voltage": round(grid.voltage, 2),

        "generator_voltage": round(generator.voltage, 2),

        "grid_frequency": round(grid.frequency, 2),

        "generator_frequency": round(generator.frequency, 2),

        "phase_angle": round(generator.phase_angle, 2),

        "voltage_difference": round(voltage_diff, 2),

        "frequency_difference": round(frequency_diff, 2),

        "sync_allowed": sync_allowed
    }