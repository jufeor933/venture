const app = require('./src/app');
const model = require('./src/database/model');
const { PORT } = require('./src/common/constants');

async function bootstrap() {
  model.testConnection().then(res => {
    if (!res) {
      throw res;
    }

    // database connected, run application
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  });
}

bootstrap();
