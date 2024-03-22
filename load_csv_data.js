const fs = require('fs')
const path = require('path')
const copyFrom = require('pg-copy-streams').from
const client = require('./db.js')

// inputfile & target table
var inputFile = path.join(__dirname, '/csv_data/answers_photos.csv')
var targetTable = 'public.answers_photos'


var stream = client.query(copyFrom(`COPY ${targetTable} FROM CSV HEADER STDIN`))
var fileStream = fs.createReadStream(inputFile)

fileStream.on('error', (error) =>{
  console.log(`Error in reading file: ${error}`)
})
stream.on('error', (error) => {
  console.log(`Error in copy command: ${error}`)
})
stream.on('end', () => {
  console.log(`Completed loading data into ${targetTable}`)
  client.end()
})
fileStream.pipe(stream);