import { Client } from '@elastic/elasticsearch'
import config from 'config'
import fetch from 'node-fetch'
import fs from 'fs'

console.log('TEST')

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: process.env.username,
    password: process.env.password
  },
  tls: {
    ca: fs.readFileSync('Q:/elasticsearch/elasticsearch-8.7.0/config/certs/http_ca.crt'),
    rejectUnauthorized: false
  }

})

console.log(client)

const elasticConfig = config.get('elastic')
console.log(elasticConfig)

async function test() {
  const response = await client.index({
    index: 'testing',
    body: { test: 'test' }
  })
  console.log(response)
}

async function createIndex() {
  console.log('ÅÅÅÅÅÅÅÅÅÅÅÅÅ')
  const indexName = 'indexName'
  const response = await client.indices.create({
    index: indexName
  })
  console.log('ÅÅÅÅÅÅÅÅÅÅÅÅÅ')

console.log(response)

}

async function indexDocument() {
  console.log('ÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅ')
  const response = await client.index({ 
    index: 'testing', 
    body: { first_name: 'Pelle', candy: "daim" } 
  });
  console.log('ÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅ')
  console.log(response)
}

async function getData() {
  const response = await client.search({index: 'movieseriesdata', body: { size: 30}})
  console.log(response)
  response.hits.hits.forEach(element => {
    console.log(element)
  });
}

// await createIndex()
await getData()
// await indexDocument()
// test()

// console.log(client)

/* {
  "elastic": {
    "cloudID": "DEPLOYMENT_NAME:CLOUD_ID_DETAILS", 
    "username": "elastic",
    "password": "LONGPASSWORD"
  }
} */

// console.log(client)