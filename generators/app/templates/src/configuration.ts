export default () => ({
  appName: process.env.APP_NAME,
  appPort: parseInt(process.env.APP_PORT),
  <% if (useRabbitMq) { %>
  messaging: {
    exchanges: [
      {
        name: process.env.MESSAGING_EXCHANGE_NAME,
        type: process.env.MESSAGING_EXCHANGE_TYPE,
      },
    ],
    uri: process.env.MESSAGING_URI,
    connectionInitOptions: { wait: false },
    connectionManagerOptions: { heartbeatIntervalInSeconds: 60 },
  },
  <% } %>
  database: {
    connectionString: process.env.DATABASE_CONNECTION_STRING,
  },
  swagger: {
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
  },
  elasticSearch: {
    url: process.env.ELASTIC_SEARCH_URL,
    index: process.env.ELASTIC_SEARCH_INDEX,
  },
  <% if (useRedis) { %>
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  <% } %>
  <% if (useOpenApiSources) { %>
  openApi: {
    hosts: [
      { name: process.env.OPENAPI_HOSTS_NAME_PETSTORE, url: process.env.OPENAPI_HOSTS_URL_PETSTORE },
    ],
  },
  <% } %>
  <% if (useStorage) { %>
  storage: {
    accountName: process.env.STORAGE_ACCOUNT_NAME,
    accessKey: process.env.STORAGE_ACCESS_KEY,
    connectionString: process.env.STORAGE_CONNECTION_STRING,
    containerName: process.env.STORAGE_CONTAINER_NAME,
  },
  <% } %>
});
