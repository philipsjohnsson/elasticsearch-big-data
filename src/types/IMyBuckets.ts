// import { AggregationsAggregate } from "@elastic/elasticsearch/lib/api/types";

export interface IMyBuckets {
  release_years: {
    buckets: Array<{
      key: number,
      doc_count: number
    }>
  }
}