
function formatPrice(price) {
    // Remove the $ sign from the price
    const regex = /^\$(\d+\.\d+)/;
    const match = price.match(regex);

    // If there is a match, remove the $ sign and return the result
    if (match) {
        const firstNumber = match[1];
        result = firstNumber.replace(regex, '');
    };

    return result;
}

module.exports = { formatPrice }