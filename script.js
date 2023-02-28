const numberButtons = [...document.querySelectorAll("[data-number]")];
const operatorButtons = [...document.querySelectorAll("[data-op]")];
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-ac");
const deleteButton = document.querySelector("[data-del]");
const previousText = document.querySelector("[data-screen-top]");
const currentText = document.querySelector("[data-screen-bot]");

class Calc{
    constructor(previousText, currentText){
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }

appendNumber(number){
this.current += number;
}

updateScreen(){
currentText.innerText = this.current;
previousText.innerText = this.previous;
}

chooseOperator(operator){
    if (this.current === "") return;
    if (this.previous !== ""){
        this.compute(this.operator);
    }
this.operator = operator;
this.previous = `${this.current} ${operator}`;
this.current = "";
}

compute(operator){
let prev = parseFloat(this.previous);
let cur = parseFloat(this.current);
let result;
if (isNaN(prev) || isNaN(cur)) return;
switch (operator){
    case "+":
        result = prev + cur;
        break;
    case "-":
        result = prev - cur;
        break;
    case "*":
        result = prev * cur;
        break;
    case "/":
        result = prev / cur;
        break;
    default:
        return;
}
this.current = result;
this.previous = "";
this.operator = undefined;
}

delete(){
this.current = this.current.slice(0, -1);
}

clear(){
    this.previous = "";
    this.current = "";
    this.operator = undefined;
}
}

const calculator = new Calc(previousText, currentText);

numberButtons.forEach(button => button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateScreen();
}));

operatorButtons.forEach(button => button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateScreen();
}));

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateScreen();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateScreen();
});

equalsButton.addEventListener("click", () => {
    calculator.compute(calculator.operator);
    calculator.updateScreen();
});