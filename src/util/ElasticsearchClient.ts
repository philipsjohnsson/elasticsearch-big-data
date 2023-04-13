import { Client } from '@elastic/elasticsearch'
import fs from 'fs'
import { IElasticsearchClient } from './IElasticsearchClient'
import { Request, Response, NextFunction } from "express"

export class ElasticsearchClient implements IElasticsearchClient {
  #client

  constructor() {
    this.#client = new Client({
      node: 'https://localhost:9200',
      auth: {
          username: 'elastic',
          password: 'vdRb+KuI9SWQgDNkKt7H'
      },
      tls: {
          ca: fs.readFileSync('Q:/elasticsearch/elasticsearch-8.7.0/config/certs/http_ca.crt'),
          rejectUnauthorized: false
      }
  })

  }

  test() {
    console.log('inside of elastic search client method')
    console.log(this.#client)
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    const response = await this.#client.search({index: 'movieseriesdata', body: { size: 30}})
    console.log(response)
    next()
    response.hits.hits.forEach(element => {
      console.log(element)
    })
  }
}