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
  if (event.target.innerText === "C") {
    [accumulator, prevOperator] = calculate(
      event.target.innerText,
      accumulator,
      prevOperator
    );
  } else if (event.target.classList.contains("number")) {
    // Update display
    if (prevInputIsOperator) {
      updateDisplay(event.target.innerText, prevInputIsOperator);
    } else if (getDisplay() === "" && event.target.innerText === "0") {
      // pass - do not update display
    } else {
      updateDisplay(getDisplay() + event.target.innerText);
    }
    prevInputIsOperator = false;
  } else if (event.target.classList.contains("button")) {
    if (accumulator === null && prevOperator === null) {
      accumulator = parseInt(getDisplay());
      prevOperator = event.target.innerText;
    } else if (prevOperator === null) {
      prevOperator = event.target.innerText;
    } else {
      [accumulator, prevOperator] = calculate(
        event.target.innerText,
        accumulator,
        prevOperator
      );
    }
    prevInputIsOperator = true;
  }
});

/*-------------------------------- Functions --------------------------------*/
function calculate(operator, accumulator, prevOperator) {
  /**
   * @return [accumulator, prevOperator]
   */
  let curr = parseInt(getDisplay());
  if (operator === "C") {
    updateDisplay("");
    return [null, null];
  }
  switch (prevOperator) {
    case "+":
      accumulator += curr;
      break;
    case "-":
      accumulator -= curr;
      break;
    case "*":
      accumulator *= curr;
      break;
    case "/":
      accumulator /= curr;
      break;
  }
  updateDisplay(accumulator);
  if (operator === "=") {
    return [null, null];
  } else {
    return [accumulator, operator];
  }
}

function updateDisplay(display, prevInputIsOperator = false) {
  !prevInputIsOperator && display === "0"
    ? (document.querySelector(".display").innerText = "")
    : (document.querySelector(".display").innerText = display);
}

function getDisplay() {
  return document.querySelector(".display").innerText;
}

/*----------------------------- Fringe Cases ------------------------------*/
// DONE: press operator multiple times
// - expected behaviour: old school (selected operation done on accumulator & displayed num)
// In Progress: type 0 first
// - expected behaviour: 0 not allowed unless it's preceded by an operation (DONE)
// - expected behaviour: 0 not allowed IF preceded by operation of C or = (in progress)
