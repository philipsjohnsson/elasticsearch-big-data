/**
 * Elasticsearch communication.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { Client } from '@elastic/elasticsearch'
import { IElasticsearchClient } from './IElasticsearchClient'
import { Request, Response, NextFunction } from "express"
import { IAuth } from '../types/IAuth'
import { IMyBuckets } from '../types/IMyBuckets'
import createError from 'http-errors'

export class ElasticsearchClient implements IElasticsearchClient {
  #client

  constructor() {
    this.#client = this.#connectToElastic()
  }

  #connectToElastic() {
    try {
      const client = new Client({
        node: process.env.URL_ELASTIC,
        auth: {
          username: process.env.user,
          password: process.env.password
        } as IAuth
      })

      return client
    } catch (err) {
      throw createError(500)
    }
  }

  async getMoviesBasedOnSpecificYear(req: Request, res: Response, next: NextFunction) {
    try {
      let response = null
      if (this.#client) {
        response = await this.#client.search({
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
      }
      if (response && response.body.aggregations) {
        const release_year = (response.body.aggregations.movies_between_1990_and_2000 as IMyBuckets).release_years
        return { release_year }
      } else {
        throw createError(500)
      }
    } catch (err) {
      next(createError(500))
    }
  }
}