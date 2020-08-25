import { NestFastifyApplication } from "@nestjs/platform-fastify";
import * as fs from 'fs';

const setupStaticPage = (app: NestFastifyApplication, path: string) => {
  const srv = app.getHttpAdapter();
  srv.get('/', (req, rep) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        rep.type('application/json').send(err.toString());
        return;
      }
      rep.type('text/html').send(data.toString());
    });
  });
};

export default setupStaticPage;
