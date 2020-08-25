const config = {
  appName: 'example-api',
  appPort: 3200,
  messaging: {
    exchanges: [
      {
        name: 'example.exchange',
        type: 'topic',
      },
    ],
    uri: 'amqp://rabbitmq:rabbitmq@localhost:5672/example',
    connectionInitOptions: { wait: false },
  },
  database: {
    connectionString: 'mongodb://localhost/nest',
  },
  swagger: {
    title: 'Example API',
    description: 'Some sample API description here',
    version: '1.0',
  },
  elasticSearch: {
    url: 'http://localhost:9200',
    index: 'example',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  openApi: {
    hosts: [
      { name: 'PetStore', url: 'https://petstore.swagger.io/v2/swagger.json' },
    ],
  },
};

export default config;
