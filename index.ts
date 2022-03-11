import cors from 'cors';
import * as restify from 'restify';

import router from './bin/route';
import logger from './utils/logger';
import project from './package.json';
import response from './utils/response';
import DB from './bin/database/mongodb/db';

import { options } from './utils/commons';


class Index {

  private server;
  private routerInstance;
  private readonly PORT = process.env.PORT || 9000;


  public constructor() {
    this.routerInstance = router;
    this.server = restify.createServer();
  }


  private init(settings: { cors: Object, parser: Object }) {
    this.server.pre(cors(settings.cors));
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.authorizationParser());
    this.server.use(restify.plugins.bodyParser(settings.parser));
    this.server.use(restify.plugins.acceptParser(this.server.acceptable));

    this.routerInstance.applyRoutes(this.server, '/api');

    this.server.get('/', (req: restify.Request, res: restify.Response) =>
      response.data(res, 'Home', 'Server is working properly.', 200));

    this.server.get('*', (req: restify.Request, res: restify.Response) =>
      response.error(res, 'Cannot get undefined!', 404));
  }


  public run(scope: string) {
    this.init(options);

    /** @description: Server port and listen method **/
    this.server.listen(this.PORT, async (err: Error) => {
      const cx = 'server-listen';

      if (err) {
        logger.error(cx, err, scope);
        return process.exit(1);
      }

      await new DB().init();
      logger.info(cx, `Connected to port:${this.PORT}`, scope);
    });
  }

}


(() => {

  /** @description: Run the server **/
  const server = new Index();
  server.run(project.name);

})();