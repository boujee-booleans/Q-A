let client = require('../db.js');

exports.getQuestions = async function getQuestions () {
  const questions = await client.query(`SELECT
  question_id,
    product_id,
    question_body,
    question_date,
    asker_name,
    question_helpfulness
    FROM
    questions
    WHERE
    reported = 0
    AND
    product_id IN (1,2,3);
  `)

  return questions;
}
