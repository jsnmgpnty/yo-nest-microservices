import { NestFastifyApplication } from "@nestjs/platform-fastify";
import * as fs from 'fs';
import { resolve } from 'path';

const setupStaticPage = (app: NestFastifyApplication) => {
  const srv = app.getHttpAdapter();
  srv.get('/', (req, rep) => {
    fs.readFile(resolve(__dirname, 'public', 'index.html'), (err, data) => {
      if (err) {
        rep.type('application/json').send(err.toString());
        return;
      }
      rep.type('text/html').send(data.toString());
    });
  });
};

export default setupStaticPage;
