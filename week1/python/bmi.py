def bmi(height, weight):
    h = height / 100
    return weight / (h* h)

print(bmi(170, 65))
