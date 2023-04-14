import { Client } from '@elastic/elasticsearch'
import fs from 'fs'
import { IElasticsearchClient } from './IElasticsearchClient'
import { Request, Response, NextFunction } from "express"
import { AggregationsAggregate } from '@elastic/elasticsearch/lib/api/types'

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
    const response = await this.#client.search({ index: 'movieseriesdata', body: { size: 30 } })
    console.log(response)
    next()
    response.hits.hits.forEach(element => {
      console.log(element)
    })
  }

  // Aggregation by year: This data includes a field called "release_year", which lists the year in which the movie was released. We could use aggregation to group movies by year and generate summary statistics, such as the total number of movies released each year, the average IMDB score for movies released each year, or the most popular years for movie releases based on TMDB popularity.

  // Aggregation by category, how many of each category in a movie..
  async getMoviesBasedOnSpecificYear(req: Request, res: Response, next: NextFunction) {
    console.log('TEST TEST GET MOVIES BASED ON SPECIFIC YEAR')
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

    console.log(response)

    if(response.aggregations) {
      const release_year = (response.aggregations.movies_between_1990_and_2000 as any).release_years
      const total_documents = (response.aggregations.movies_between_1990_and_2000 as any).doc_count
      console.log(release_year)
      console.log(total_documents)
      // console.log(response.aggregations.movies_between_1990_and_2000.release_years)
      return { release_year, total_documents }
    }
  }
}