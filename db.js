const { Client } = require('pg');
const config = require('./config.json')

// Getting connectin parameters from config.json
const host = config.host
const user = config.user
const pw = config.pw
const db = config.db
const port = config.port
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`

const client = new Client({
  connectionString: conString
})

client.connect();


async function dbConnection () {
  const questionsTable = await client.query(`CREATE TABLE IF NOT EXISTS questions (
    question_id BIGSERIAL NOT NULL,
    product_id INT,
    question_body text NOT NULL,
    question_date bigint NOT NULL,
    asker_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    question_helpfulness INT DEFAULT '0',
    reported SMALLINT DEFAULT '0',
    PRIMARY KEY (question_id)
  )`)
  const answersTable = await client.query(`CREATE TABLE IF NOT EXISTS answers (
    id BIGSERIAL,
    question_id INT NOT NULL,
    body text NOT NULL,
    date bigint NOT NULL,
    answerer_name VARCHAR(50) NOT NULL,
    answerer_email VARCHAR(50) NOT NULL,
    reported SMALLINT DEFAULT '0',
    helpfulness INT DEFAULT '0',
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)

  )`)
  const answersPhotosTable = await client.query(`CREATE TABLE IF NOT EXISTS answers_photos (
    id BIGSERIAL,
    answer_id INT NOT NULL,
    url text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (answer_id) REFERENCES answers(id)
  )`)
  console.log('tables successfully created OR already exist')

}

dbConnection();

module.exports = client;

