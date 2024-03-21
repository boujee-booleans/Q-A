const { Client } = require('pg');

const client = new Client({
  "host": "localhost",
  "user": "magicarpe_diem",
  "password": "1234",
  "database": "qadb",
  "port": 5432
})

client.connect();

client.query(' SELECT current_database()', (err, res) => {
  if (err){
    console.log(err)
  } else {
    console.log(res, " it worked")
  }
})