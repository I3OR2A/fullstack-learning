function bmi(height, weight) {
    const h = height / 100;
    return weight / (h * h);
}

console.log(bmi(170, 65));