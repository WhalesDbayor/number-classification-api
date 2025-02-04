const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// function to check if a number is prime
// const isPrime = (num) => {
//   if (num < 2) return false;
//   for (let i = 2; i <= Math.sqrt(num); i++) {
//     if (num % i === 0) return false;
//   }
//   return true;
// };

// Function to check if a number is perfect
// const isPerfect = (num) => {
//   let sum = 1;
//   for (let i = 2; i <= Math.sqrt(num); i++) {
//       if (num % i === 0) {
//           sum += i;
//           if (i !== num / i) sum += num / i;
//       }
//   }
//   return sum === num && num !== 1;
// };

// Function to check if a number is an Armstrong number
// const isArmstrong = (num) => {
//   const digits = num.toString().split(""),
//         length = digits.length;
//   const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), length), 0);
//   return sum === num;
// };

// // Function to get a fun fact from Numbers API
// const getFunFact = async (num) => {
//   try {
//       const response = await axios.get(`http://numbersapi.com/${num}/math`);
//       return response.data;
//   } catch (error) {
//       return "No fun fact available.";
//   }
// };

// Number classification API endpoint
// app.get("/api/classify-number", async (req, res) => {
//     const { number } = req.query;
//     const num = parseInt(number);

//     if (isNaN(num)) {
//         return res.status(400).json({ number, error: true });
//     }

//     const properties = [];
//     if (isArmstrong(num)) properties.push("armstrong");
//     properties.push(num % 2 === 0 ? "even" : "odd");

//     const funFact = await getFunFact(num);

//     res.json({
//         number: num,
//         is_prime: isPrime(num),
//         is_perfect: isPerfect(num),
//         properties,
//         digit_sum: num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0),
//         fun_fact: funFact,
//     });
// });

app.get("/api/classify-number", async (req, res) => {
  let { number } = req.query;

  // Convert to integer
  number = parseInt(number, 10);

  // Validate input
  if (isNaN(number)) {
      return res.status(400).json({
          number: "alphabet",
          error: true,
          // message: "Please provide a valid integer."
      });
  }

  const absNumber = Math.abs(number); // Ensure absolute value for certain calculations

  // Check if Armstrong number
  const isArmstrong = (num) => {
      const digits = num.toString().split("").map(Number);
      const power = digits.length;
      const sum = digits.reduce((acc, d) => acc + Math.pow(d, power), 0);
      return sum === num;
  };

  // Check if Prime
  const isPrime = (num) => {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
      }
      return true;
  };

  // Check if Perfect Number
  const isPerfect = (num) => {
      if (num <= 0) return false;
      let sum = 0;
      for (let i = 1; i <= num / 2; i++) {
          if (num % i === 0) sum += i;
      }
      return sum === num;
  };

  // Compute digit sum (ignoring negative sign)
  const digitSum = absNumber.toString().split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  // Fetch Fun Fact (using absolute value)
  let funFact = "No fact available.";

  if (number < 0 && !isArmstrong(absNumber)) {
    // Generic fun fact for negative numbers (except Armstrong numbers)
    funFact = "Negative numbers are interesting, but they don't have fun facts like positive ones!";
  } else {
    // Specific fun facts for each type of number
    try {
        const response = await axios.get(`http://numbersapi.com/${absNumber}/math`);
        funFact = response.data;
    } catch (error) {
        console.error("Error fetching fun fact:", error.message);
    }
  }

  // Determine properties
  let properties = number % 2 === 0 ? ["even"] : ["odd"];
  if (isArmstrong(absNumber)) properties.unshift("armstrong");

  // Return Response
  return res.json({
      number: number, // Return the original number (including negative)
      is_prime: isPrime(absNumber), // Check primality with absolute value
      is_perfect: isPerfect(absNumber), // Check perfection with absolute value
      properties: properties,
      digit_sum: digitSum, // Ensure valid digit sum
      fun_fact: funFact // Use absolute number fact but return it normally
  });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
