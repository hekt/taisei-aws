import Container from 'infrastructure/Container';
import { Where } from 'infrastructure/Query';
import Application from 'applications/Application';
import { getDataConnectionOptions } from 'applications/Connection';
import QueryConverter from 'applications/QueryConverter';
import ResponseFormatter from 'applications/ResponseFormatter';
import DenormalizedData from 'domains/Denormalized/DenormalizedData';
import DenormalizedDataRepository from 'domains/Denormalized/DenormalizedDataRepository';

class App extends Application<{[key: string]: string}, Object[]> {
  protected connectionOptions() {
    return [
      getDataConnectionOptions(false),
    ];
  }

  protected async main(
    container: Container,
    query?: {[key: string]: string}
  ): Promise<Object[]> {
    let denormalizedDataRepository = container
      .get<DenormalizedDataRepository>('denormalizedDataRepository');

    let wheres: Where[] = [];
    if (query) {
      wheres = QueryConverter.urlParamsToWheres(query);
    }

    let data: DenormalizedData[] = await denormalizedDataRepository
      .getByWheres(wheres);

    return data.map(ResponseFormatter.format);
  }
}

let app;

export function handler(event, context, callback) {
  let done = (err, res) => callback(null, {
    statusCode: err ? '400' : '200',
    body: err ? err.message : JSON.stringify(res),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  (app = app || new App())
    .run(event['queryStringParameters'])
    .then((data) => {
      done(null, data);
    }).catch((err) => {
 done(err.stack, null);
    });
}
