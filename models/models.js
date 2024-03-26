let client = require('../db.js');

exports.getQuestions = async function getQuestions (product_id) {
  const questions = await client.query(`SELECT
  q.question_id,
    q.product_id,
    q.question_body,
    q.question_date,
    q.asker_name,
    q.question_helpfulness,
    q.reported,
    a.id,
    a.body,
    a.date,
    a.answerer_name,
    a.helpfulness,
    ap.id,
    ap.url
    FROM
    questions q
    JOIN answers a ON q.question_id = a.question_id
    JOIN answers_photos ap ON a.id = ap.answer_id
    WHERE
    q.reported = 0
    AND
    product_id IN ('${product_id}');
  `)

  return questions;
}
