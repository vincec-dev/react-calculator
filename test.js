function getValue(input) {
  const {displayValue} = this.state;
  if (dotOperator.includes(inputs[inputs.length - 1]) && input === ".") {
    console.log("Two Dots are NOT ALLOWED.");
  } else if (inputs.length===0 && operators.includes(input)) {
    console.log("Please start with a number or a dot.");
  } else if (operators.includes(inputs[inputs.length - 1]) === false) {
    inputs.push(input);
  } else if (numbers.includes(Number(input))) {
    this.setState({displayValue: displayValue + input});
  }
  console.log(inputs);
}

function getTotal() {
  totalString = inputs.join("");
  console.log(eval(totalString));
  console.log("getTotal Done!");
}

function handleClick(id) {
  if (id === "clear") {
    console.log("clear!");
    inputs = [];
  } else if (id === "=") {
    console.log("equals!");
    getTotal();
  } else {
    if(inputs[inputs.length-1]!=='+' && inputs[inputs.length-1]!=='-' && inputs[inputs.length-1]!=='/' && inputs[inputs.length-1]!=='*') {
      getValue(id);
    }
    else {
      getValue(id);
    }
  }
}
