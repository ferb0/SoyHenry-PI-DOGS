function checkData(height, weight, lifeSpan) {

    if (height[0] > height[1])
        return "The minHeight > maxHeight.";

    if (weight[0] > weight[1])
        return "The minWeight > maxWeight.";

    if (lifeSpan[0] > lifeSpan[1])
        return "The minLifeSpan > maxLifeSpan.";

    return false;
};

module.exports = { checkData };