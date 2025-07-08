/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let accumulator = null;
let prevOperator = null;
let prevInputIsOperator = false;
/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
// EVENT DELEGATION -- ADD EVENT LISTENERS TO PARENT ELEMENT
const calculator = document.querySelector("#calculator");
calculator.addEventListener("click", (event) => {
  if (event.target.classList.contains("number")) {
    // Update display
    if (prevInputIsOperator) {
      updateDisplay(event.target.innerHTML);
    } else if (getDisplay() === "" && event.target.innerHTML === "0") {
      // pass - do not update display
    } else {
      updateDisplay(getDisplay() + event.target.innerHTML);
    }
    prevInputIsOperator = false;
  } else {
    if (event.target.innerHTML === "C") {
      accumulator = null;
      prevOperator = null;
      updateDisplay("");
    } else if (accumulator === null && prevOperator === null) {
      accumulator = parseInt(getDisplay());
      prevOperator = event.target.innerHTML;
    } else if (prevOperator === null) {
      prevOperator = event.target.innerHTML;
    } else {
      [accumulator, prevOperator] = calculate(
        event.target.innerHTML,
        accumulator,
        prevOperator
      );
    }
    prevInputIsOperator = true;
  }
});

/*-------------------------------- Functions --------------------------------*/
const add = (a, b) => a + b;
const subt = (a, b) => a - b;
const mult = (a, b) => a * b;
const div = (a, b) => a / b;

function calculate(operator, accumulator, prevOperator) {
  let curr = parseInt(getDisplay());
  switch (prevOperator) {
    case "+":
      accumulator = add(accumulator, curr);
      break;
    case "-":
      accumulator = subt(accumulator, curr);
      break;
    case "*":
      accumulator = mult(accumulator, curr);
      break;
    case "/":
      accumulator = div(accumulator, curr);
      break;
  }
  if (operator == "=") {
    prevOperator = null;
  } else {
    prevOperator = operator;
  }
  updateDisplay(accumulator);
  return [accumulator, prevOperator];
}

function updateDisplay(display) {
  document.querySelector(".display").innerHTML = display;
}
function getDisplay() {
  return document.querySelector(".display").innerHTML;
}
/*----------------------------- Fringe Cases ------------------------------*/
// DONE: press operator multiple times - expected behaviour to operate on accumulator & displayed num
// type 0 first
