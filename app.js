const display = document.querySelector(".display");
const expression = document.querySelector(".expression");

const calculationHistory =
    JSON.parse(localStorage.getItem("calculation")) || [];

// FIXME: touchstart?
addEventListener("touchstart", function () {}, true);

// When true u can't make calculation again to prevent save same expression history
let isCalculated = false;

function addToDisplay(param) {
    display.textContent += param;
    expression.innerHTML = "";
    isCalculated = false;
}

document.querySelectorAll(".js-display-btn").forEach((btn) => {
    const btnValue = btn.innerHTML;
    btn.addEventListener("click", () => {
        addToDisplay(btnValue);
    });
});

function clearDisplay() {
    display.textContent = "";
    expression.textContent = "";
}

document.querySelector(".js-clear-btn").addEventListener("click", () => {
    clearDisplay();
});

function calculate() {
    if (
        (!isCalculated && display.innerHTML.includes("*")) ||
        display.innerHTML.includes("-") ||
        display.innerHTML.includes("+") ||
        display.innerHTML.includes("/")
    ) {
        try {
            expression.textContent = display.innerHTML;
            display.textContent = eval(display.textContent);
            calculationHistory.push({
                calc: expression.textContent,
                result: display.textContent,
            });
            localStorage.setItem(
                "calculation",
                JSON.stringify(calculationHistory)
            );
            isCalculated = true;
        } catch (error) {
            display.textContent = "Error";
        } finally {
            refreshCalculation();
        }
    } else {
        return;
    }
}

document.querySelector(".js-calculate-btn").addEventListener("click", () => {
    calculate();
});

function refreshCalculation() {
    let calculationHTML = "";
    calculationHistory.forEach((item) => {
        calculationHTML += `<p>${item.calc}=${item.result}</p>`;
    });
    document.querySelector(".js-history-container").innerHTML = calculationHTML;
}

refreshCalculation();

function clearCalcHistory() {
    localStorage.removeItem("calculation");
    document.querySelector(".js-history-container").innerHTML = "";
}

document
    .querySelector(".js-clear-history-btn")
    .addEventListener("click", () => {
        clearCalcHistory();
    });

function toggleBurger12() {
    document.querySelector(".burger-12").classList.toggle("burger-12--active");
    document
        .querySelector(".burger-12__center-line")
        .classList.toggle("burger-12__center-line--active");
}

document.querySelector(".js-burger").addEventListener("click", () => {
    toggleBurger12();
    document
        .querySelector(".left-section")
        .classList.toggle("left-section--active");
});

// Play sound effect on click
document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
        // Better/faster way then get audio from HTML audio tag
        const sound = new Audio("./sounds/tidid.mp3");
        sound.play();
    });
});
