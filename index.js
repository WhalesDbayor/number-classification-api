const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Function to check if a number is prime
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check if a number is a perfect number
function isPerfect(num) {
    if (num < 1) return false;
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

// Function to check if a number is an Armstrong number
function isArmstrong(num) {
    const numStr = Math.abs(num).toString();
    const power = numStr.length;
    const sum = numStr.split("").reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
    return sum === Math.abs(num);
}

// Function to calculate the sum of digits
function digitSum(num) {
    return Math.abs(num)
        .toString()
        .split("")
        .reduce((acc, digit) => acc + parseInt(digit), 0);
}

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    let { number } = req.query;

    // Validate input: Ensure number is an integer
    if (!/^-?\d+$/.test(number)) {
        return res.status(400).json({
            number: number,
            error: true
        });
    }

    number = parseInt(number);

    // Determine number properties
    const prime = isPrime(number);
    const perfect = isPerfect(number);
    const armstrong = isArmstrong(number);
    const sumOfDigits = digitSum(number);
    const parity = number % 2 === 0 ? "even" : "odd";

    let properties = [parity];
    if (armstrong) properties.unshift("armstrong");

    // Fetch fun fact from Numbers API
    let funFact = "";
    try {
        if (number >= 0 || armstrong) {
            const response = await axios.get(`http://numbersapi.com/${number}/math?json`);
            funFact = response.data.text || "No fact available.";
        } else {
            funFact = "Negative numbers have unique mathematical properties!";
        }
    } catch (error) {
        funFact = "No fact available."; // Default fallback in case API request fails
    }

    // Return JSON response
    return res.status(200).json({
        number,
        is_prime: prime,
        is_perfect: perfect,
        properties,
        digit_sum: sumOfDigits,
        fun_fact: funFact
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
