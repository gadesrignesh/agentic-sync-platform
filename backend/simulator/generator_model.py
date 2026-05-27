class Generator:
    def __init__(self):
        self.voltage = 100.0
        self.frequency = 48.5
        self.phase_angle = 25.0
        self.speed = 48.5

    def increase_speed(self):
        self.frequency += 0.1
        self.speed += 0.1

    def decrease_speed(self):
        self.frequency -= 0.1
        self.speed -= 0.1

    def increase_voltage(self):
        self.voltage += 1

    def decrease_voltage(self):
        self.voltage -= 1

    def reduce_phase_angle(self):
        if self.phase_angle > 0:
            self.phase_angle -= 1