for (let i = 0; i <= 100; i++) {
//   if (i % 3 === 0) {
//   	console.log("Fizz") 
//   } 
//   if (i % 5 === 0) {
//   	console.log("Buzz")
//   } 
//   if (i % 3 === 0 && i % 5 === 0) {
//   	console.log("FizzBuzz")
//   }  
//   console.log(i)

    let output = "";
    if (i % 3 === 0) {
        output += "Fizz";
    }
    if (i % 5 === 0) {
        output += "Buzz";
    }
    if (output === "") {
        output = i;
    }
    console.log(output);
}