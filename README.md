# Number Classification API

## Project Description
The **Number Classification API** is a simple yet powerful API that classifies numbers based on their mathematical properties and provides a fun fact about them. It accepts a number as a query parameter and returns JSON data including:
- Whether the number is prime
- Whether the number is perfect
- Whether the number is an Armstrong number
- The sum of its digits
- A fun fact fetched from an external API

## Setup Instructions
### 1. Clone the Repository
```sh
git clone https://github.com/WhalesDbayor/number-classification-api.git
cd number-classification-api
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the Server Locally
```sh
node index.js
```

The API will be available at `http://localhost:3000`.

## API Documentation
### Endpoint
```
GET /api/classify-number?number={integer}
```

### Request Parameters
| Parameter | Type  | Required | Description |
|-----------|-------|----------|-------------|
| number    | int   | Yes      | The number to classify |

### Response Format
#### **Success Response (200 OK)**
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### **Error Response (400 Bad Request)**
```json
{
    "number": "invalid_input",
    "error": true,
}
```

## Deployment
The API is deployed and accessible at:
```
<your-deployed-api-url>
```

## Technologies Used
- **JavaScript (Node.js & Express.js)** - Backend API
- **Numbers API** - Fetching fun facts about numbers
- **CORS** - Handling cross-origin requests

## Additional Resources
Learn more about JavaScript development: [Hire Node.js Developers](https://hng.tech/hire/nodejs-developers)

