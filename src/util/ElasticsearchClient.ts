import { Client } from '@elastic/elasticsearch'
import fs from 'fs'
import { IElasticsearchClient } from './IElasticsearchClient'
import { Request, Response, NextFunction } from "express"
import { AggregationsAggregate } from '@elastic/elasticsearch/lib/api/types'
import { IAuth } from './IAuth'
import { IMyBuckets } from '../types/IMyBuckets'

export class ElasticsearchClient implements IElasticsearchClient {
  #client

  constructor() {
    this.#client = new Client({
      node: 'https://localhost:9200',
      auth: {
        username: process.env.user,
        password: process.env.password
      } as IAuth,
      tls: {
        ca: fs.readFileSync('Q:/elasticsearch/elasticsearch-8.7.0/config/certs/http_ca.crt'),
        rejectUnauthorized: false
      }
    })

  }

  async getData(req: Request, res: Response, next: NextFunction) {
    const response = await this.#client.search({ index: 'movieseriesdata', body: { size: 30 } })
    console.log(response)
    next()
    response.hits.hits.forEach(element => {
      console.log(element)
    })
  }

  async getMoviesBasedOnSpecificYear(req: Request, res: Response, next: NextFunction) {
    const response = await this.#client.search({
      index: 'movieseriesdata',
      body: {
        size: 0,
        aggs: {
          movies_between_1990_and_2000: {
            filter: {
              bool: {
                must: [
                  { match: { type: 'MOVIE' } },
                  { range: { release_year: { gte: 1990, lte: 2000 } } }
                ]
              }
            },
            aggs: {
              release_years: {
                histogram: {
                  field: 'release_year',
                  interval: 1,
                  min_doc_count: 0
                }
              }
            }
          }
        }
      }
    })

    if (response.aggregations) {
      const release_year = (response.aggregations.movies_between_1990_and_2000 as IMyBuckets).release_years
      return { release_year }
    }
  }
}