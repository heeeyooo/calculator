const display = document.querySelector(".display");
const displayResult = document.querySelector(".display-result");

function addToDisplay(param) {
    display.textContent += param;
}

let calculation = JSON.parse(localStorage.getItem("calculation")) || [];

function refreshCalculation() {
    let calculationHTML = "";
    calculation.forEach((item) => {
        calculationHTML += `<p>${item.calc}=${item.result}</p>`;
    });

    document.querySelector(".history").innerHTML = calculationHTML;
}

refreshCalculation();

function calculate() {
    try {
        displayResult.textContent = eval(display.textContent);
    } catch (error) {
        displayResult.textContent = "Error";
    } finally {
        calculation.push({
            calc: display.textContent,
            result: displayResult.textContent,
        });
        localStorage.setItem("calculation", JSON.stringify(calculation));
        refreshCalculation();
    }
}

function clearDisplay() {
    display.textContent = "";
    displayResult.textContent = "";
}

function toggleBurgerSeven() {
    document
        .querySelector(".burger-seven")
        .classList.toggle("burger-seven--active");
    document
        .querySelector(".burger-seven__center-line1")
        .classList.toggle("burger-seven__center-line1--active");
    document
        .querySelector(".burger-seven__center-line2")
        .classList.toggle("burger-seven__center-line2--active");
    document
        .querySelector(".left-section")
        .classList.toggle("left-section--active");
}

function clearCalcHistory() {
    localStorage.removeItem("calculation");
    document.querySelector(".history").innerHTML = "";
}
