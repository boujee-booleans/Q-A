require("dotenv").config();
const express = require("express");
const path = require("path");
const models  = require('./models/models.js');

const app = express();
app.use(express.json())

app.get('/qa/questions', (req, res) =>{
  // Retrieves a list of questions for a particular product.
  // This list does not include any reported questions.
  const response = async function () {
    const result = await models.getQuestions()
    return result;
  }()
  console.log(response, "this is response!!!")

  response.then((data) => {res.status(200).send(data.rows)})
})

// app.get (`/qa/questions/${question_id}/answers`, (req, res) => {
//   // Returns answers for a given question.
//   // This list does not include any reported answers.

// })

app.post('qa/questions', (req, res) => {
  // Adds a question for the given product

})

// app.post(`/qa/questions/${question_id}/answers`, (req, res) => {
//   // Adds an answer for the given question

// })

// app.put(`/qa/questions/${question_id}/helpful`, (req, res) => {
//   // Updates a question to show it was found helpful.

// })

// app.put(`/qa/questions/${question_id}/report`, (req, res) => {
//   // Updates a question to show it was reported.
//   // Note, this action does not delete the question, but the question will not be returned in the above GET request.

// })

// app.put(`/qa/answers/${answer_id}/helpful`, (req, res) => {
//   // Updates an answer to show it was found helpful.

// })

// app.put(`/qa/answers/${answer_id}/report`, (req, res) => {
//   // Updates an answer to show it has been reported.
//   // Note, this action does not delete the answer, but the answer will not be returned in the above GET request.

// })




app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);