const { Client } = require('pg');

const client = new Client({
  "host": "localhost",
  "user": "magicarpe_diem",
  "password": "1234",
  "database": "qadb",
  "port": 5432
})

client.connect();


async function dbConnection () {
  const questionsTable = await client.query(`CREATE TABLE IF NOT EXISTS questions (
    product_id INT,
    question_id INT NOT NULL,
    question_body text NOT NULL,
    question_date bigint NOT NULL,
    asker_name VARCHAR(50) NOT NULL,
    question_helpfulness INT DEFAULT '0',
    reported SMALLINT DEFAULT '0',
    PRIMARY KEY (question_id)
  )`)
  const answersTable = await client.query(`CREATE TABLE IF NOT EXISTS answers (
    id INT,
    question_id INT NOT NULL,
    body text NOT NULL,
    date bigint NOT NULL,
    answerer_name VARCHAR(50) NOT NULL,
    helpfulness INT DEFAULT '0',
    reported SMALLINT DEFAULT '0',
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)

  )`)
  const answersPhotosTable = await client.query(`CREATE TABLE IF NOT EXISTS answers_photos (
    id INT,
    answer_id INT NOT NULL,
    url text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (answer_id) REFERENCES answers(id)
  )`)
  console.log('tables successfully created')

}

dbConnection();