require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json())

/// GET qa/questions
// parameters -product.id, page, count
// does not include any reported questions

// GET /qa/questions/:question_id/answers
// does not include any reported answers

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);