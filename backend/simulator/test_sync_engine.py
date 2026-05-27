from sync_engine import check_synchronization


# ---------------------------------
# TEST CASE 1
# PERFECT SYNCHRONIZATION
# ---------------------------------

result1 = check_synchronization(

    grid_voltage=110,
    generator_voltage=108,

    grid_frequency=50,
    generator_frequency=49.8,

    phase_angle=5

)

print("\n==============================")
print("TEST CASE 1")
print("==============================")

print(result1)


# ---------------------------------
# TEST CASE 2
# FREQUENCY TOO LOW
# ---------------------------------

result2 = check_synchronization(

    grid_voltage=110,
    generator_voltage=109,

    grid_frequency=50,
    generator_frequency=47,

    phase_angle=6

)

print("\n==============================")
print("TEST CASE 2")
print("==============================")

print(result2)


# ---------------------------------
# TEST CASE 3
# PHASE ANGLE TOO HIGH
# ---------------------------------

result3 = check_synchronization(

    grid_voltage=110,
    generator_voltage=110,

    grid_frequency=50,
    generator_frequency=50,

    phase_angle=25

)

print("\n==============================")
print("TEST CASE 3")
print("==============================")

print(result3)


# ---------------------------------
# TEST CASE 4
# EVERYTHING WRONG
# ---------------------------------

result4 = check_synchronization(

    grid_voltage=110,
    generator_voltage=90,

    grid_frequency=50,
    generator_frequency=45,

    phase_angle=40

)

print("\n==============================")
print("TEST CASE 4")
print("==============================")

print(result4)