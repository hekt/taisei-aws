import Container from 'infrastructure/Container';
import { Where } from 'infrastructure/Query';
import Application from 'applications/Application';
import { getDataConnectionOptions } from 'applications/Connection';
import UrlParametersConverter from 'applications/Converter/UrlParametersConverter';
import DenormalizedDataConverter from 'applications/Converter/DenormalizedDataConverter';
import DenormalizedData from 'domains/Denormalized/DenormalizedData';
import DenormalizedDataFetchService from 'domains/Denormalized/DenormalizedDataFetchService';

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
    const fetchService = container
      .get<DenormalizedDataFetchService>('denormalizedDataFetchService');

    const queryCollection = UrlParametersConverter.toQueryCollection(query!);

    const data: DenormalizedData[] = await fetchService
      .fetchByQueryCollection(queryCollection);

    return data.map(DenormalizedDataConverter.toJson);
  }
}

let app;

export function handler(event, context, callback) {
  const done = (err, res) => callback(null, {
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
      done(err, null);
    });
}
