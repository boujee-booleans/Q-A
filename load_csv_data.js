const fs = require('fs')
const path = require('path')
const copyFrom = require('pg-copy-streams').from
const client = require('./db.js')

// inputfile & target table
var inputFile = path.join(__dirname, '/csv_data/answers_photos.csv')
var targetTable = 'answers_photos'


var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN WITH (FORMAT csv, HEADER true)`))
var fileStream = fs.createReadStream(inputFile)

// COPY ${targetTable} FROM STDIN WITH (FORMAT csv, HEADER true)

const executeQuery = (targetTable) => {
  const execute = (target, callback) => {
      client.query(`Truncate ${target}`, (err) => {
              if (err) {
              client.end()
              callback(err)
              // return console.log(err.stack)
              } else {
              console.log(`Truncated ${target}`)
              callback(null, target)
              }
          })
  }
  execute(targetTable, (err) =>{
      if (err) return console.log(`Error in Truncate Table: ${err}`)
      var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN`))
      var fileStream = fs.createReadStream(inputFile)

      fileStream.on('error', (error) =>{
          console.log(`Error in creating read stream ${error}`)
      })
      stream.on('error', (error) => {
          console.log(`Error in creating stream ${error}`)
      })
      stream.on('end', () => {
          console.log(`Completed loading data into ${targetTable}`)
          client.end()
      })
      fileStream.pipe(stream);
  })
}
// Execute the function
executeQuery(targetTable)