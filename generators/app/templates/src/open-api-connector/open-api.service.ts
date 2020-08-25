import { Injectable, OnModuleInit } from '@nestjs/common';
import { OpenApiSource, SwaggerClientResult } from './open-api-options';
import { LoggerService } from '../logging';
const SwaggerClient = require('swagger-client');

@Injectable()
export class OpenApiService implements OnModuleInit {
  static options: OpenApiSource[] = [];
  retryDelay: number = 2000;

  constructor(private readonly logger: LoggerService) { }

  async onModuleInit() {
    await this.init();
  }

  async init() {
    const clientPromises: Promise<SwaggerClientResult>[] = [];
    OpenApiService.options.forEach(o => clientPromises.push(this.initializeService(o)));
    const results = await Promise.all(clientPromises);
    if (!results) this.logger.error('Failed to initialize Open API sources', null);
  }

  async initializeService(option: OpenApiSource): Promise<SwaggerClientResult> {
    try {
      const client = await new SwaggerClient(option.url);

      if (!client) {
        this.logger.error(`Failed to initialize OpenAPI source for ${option.name}`, null);
        setTimeout(async () => {
          await this.initializeService(option);
        }, this.retryDelay);
        return;
      }

      let result = {};
      for (let tag in client.apis) {
        result[tag] = {};

        for (let method in client.apis[tag]) {
          result[tag][method] = (args) => {
            const handleResponse = (res) => {
              res.ok = true;
              return res;
            };

            const responseInterceptor = (res) => {
              if (res.body) return handleResponse(res.body);
              if (res.text) return handleResponse(JSON.parse(res.text));
              return res;
            };

            return client.apis[tag][method].call(this, args, { responseInterceptor });
          };
        }
      }

      this[option.name] = result;
      this.logger.info(`Initialized OpenAPI source for ${option.name}`);
      return { name: option.name, option, isSuccess: true };
    } catch (error) {
      this.logger.error(`Failed to initialize OpenAPI source for ${option.name}`, error);
    }
  }
}
