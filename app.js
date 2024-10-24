// Flag to track the current unit system (false for Imperial, true for Metric)
let useMetricUnits = false;

/**
 * Toggles between Imperial and Metric units.
 */
function toggleUnitSystem() {
    useMetricUnits = !useMetricUnits;
    document.getElementById('unitToggle').textContent = useMetricUnits ? 'Switch to Imperial' : 'Switch to Metric';
    document.getElementById('unitLabel').textContent = useMetricUnits ? 'mm' : 'inch';
    document.getElementById('rulerNote').style.display = useMetricUnits ? 'none' : 'block';
    calculateMeasurements(); // Recalculate measurements with the new unit system
}

/**
 * Converts a decimal inch measurement to a precise fraction in 16ths.
 * @param {number} decimalInches - The decimal value in inches.
 * @returns {string} - The measurement as a string with inches and 16ths.
 */
function convertDecimalInchesToSixteenths(decimalInches) {
    const wholeInches = Math.floor(decimalInches);
    const fractionalInches = decimalInches - wholeInches;
    const sixteenths = fractionalInches * 16;
    
    if (sixteenths === 0) return `${wholeInches}"`;
    
    const roundedSixteenths = Math.round(sixteenths * 10) / 10;
    if (roundedSixteenths === 16) {
        return `${wholeInches + 1}"`;
    }
    
    return `${wholeInches} and ${roundedSixteenths}/16"`;
}

/**
 * Formats the measurement based on the current unit system.
 * @param {number} measurement - The measurement value.
 * @returns {string} - The formatted measurement string.
 */
function formatMeasurement(measurement) {
    if (useMetricUnits) {
        return `${measurement.toFixed(3)} mm`;
    }
    return `${measurement.toFixed(3)}" (${convertDecimalInchesToSixteenths(measurement)})`;
}

/**
 * Calculates the scores, folds, and panels based on the sheet length.
 */
function calculateMeasurements() {
    const sheetLengthInput = document.getElementById('sheetLength');
    let sheetLength = parseFloat(sheetLengthInput.value);
    
    if (isNaN(sheetLength) || sheetLength <= 0) {
        alert('Please enter a valid sheet length.');
        return;
    }

    // If Metric units, convert sheet length from mm to inches for calculations
    if (useMetricUnits) {
        sheetLength /= 25.4; // Convert mm to inches
    }

    // Constants for calculations based on folding machine formulas
    const score1Inches = 0.3325 * sheetLength + 0.03;
    const score2Inches = 0.665 * sheetLength + 0.05;
    const fold1Inches = score2Inches;
    const fold2Inches = score2Inches - score1Inches;
    const panel1Inches = score1Inches;
    const panel2Inches = score2Inches - score1Inches;
    const panel3Inches = sheetLength - score2Inches;

    // Convert measurements back to mm if using Metric units
    let displayScore1 = score1Inches;
    let displayScore2 = score2Inches;
    let displayFold1 = fold1Inches;
    let displayFold2 = fold2Inches;
    let displayPanel1 = panel1Inches;
    let displayPanel2 = panel2Inches;
    let displayPanel3 = panel3Inches;

    if (useMetricUnits) {
        displayScore1 *= 25.4; // Convert inches to mm
        displayScore2 *= 25.4;
        displayFold1 *= 25.4;
        displayFold2 *= 25.4;
        displayPanel1 *= 25.4;
        displayPanel2 *= 25.4;
        displayPanel3 *= 25.4;
    }

    // Display the results in the corresponding elements
    document.getElementById('score1').textContent = formatMeasurement(displayScore1);
    document.getElementById('score2').textContent = formatMeasurement(displayScore2);
    document.getElementById('fold1').textContent = formatMeasurement(displayFold1);
    document.getElementById('fold2').textContent = formatMeasurement(displayFold2);
    document.getElementById('panel1').textContent = formatMeasurement(displayPanel1);
    document.getElementById('panel2').textContent = formatMeasurement(displayPanel2);
    document.getElementById('panel3').textContent = formatMeasurement(displayPanel3);
}
