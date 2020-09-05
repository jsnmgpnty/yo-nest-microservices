<% if (useRabbitMq) { %>
import { MessagingOptions } from './messaging';
<% } %>
<% if (useOpenApiSources) { %>
import { OpenApiOptions } from './open-api-connector';
<% } %>
<% if (useRedis) { %>
import { RedisOptions } from './redis';
<% } %>
<% if (useStorage) { %>
import { StorageOptions } from './storage';
<% } %>

export interface ElasticSearchOptions {
  url: string;
  index: string;
}

export interface SwaggerOptions {
  title: string;
  description: string;
  version: string;
}

export interface DatabaseOptions {
  connectionString: string;
}

export interface ConfigOptions {
  appName: string;
  appPort: number;
  <% if (useRabbitMq) { %>
  messaging?: MessagingOptions;
  <% } %>
  database?: DatabaseOptions;
  swagger?: SwaggerOptions;
  elasticSearch?: ElasticSearchOptions;
  <% if (useRedis) { %>
  redis?: RedisOptions;
  <% } %>
  <% if (useOpenApiSources) { %>
  openApi?: OpenApiOptions
  <% } %>
  <% if (useStorage) { %>
  storage?: StorageOptions
  <% } %>
}
