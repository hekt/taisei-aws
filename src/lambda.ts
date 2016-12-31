import Container from './infrastructure/Container';
import { Where } from './infrastructure/Query';
import Application from './applications/Application';
import {
  getDataConnectionProvider
} from './applications/ContainerHelpers';
import QueryConverter from './applications/QueryConverter';
import ResponseFormatter from './applications/ResponseFormatter';
import DenormalizedData from './domains/Denormalized/DenormalizedData';
import DenormalizedDataRepository from './domains/Denormalized/DenormalizedDataRepository';

class App extends Application<{[key: string]: string}, Object[]> {
  protected async getConnectionProviders() {
    return [
      await getDataConnectionProvider(false),
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

// let app = new App();
// app.run({
//   'finalForm': 'true',
//   'normal': 'eq,0.25',
// }).then((data) => {
//   console.log(data);
//   console.log('success');
// }).catch((err) => {
//   console.error(err);
// })

export function handler(event, context, callback) {
  let done = (err, res) => callback(null, {
    statusCode: err ? '400' : '200',
    body: err ? err.message : JSON.stringify(res),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  let app = new App();
  app.run(event['queryStringParameters']).then((data) => {
    done(null, data);
  }).catch((err) => {
    done(err, null);
  });
}
