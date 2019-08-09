import { startServer } from '../src/server-config';

before(async () => {
  await startServer();
});

require('./hello-world.test');
