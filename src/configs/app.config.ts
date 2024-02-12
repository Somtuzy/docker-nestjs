import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  const PORT = parseInt(process.env.APP_PORT || process.env.PORT, 10) || 9090;

  return {
    envName: process.env.NODE_ENV,
    apiPrefix: 'api/v1',
    port: PORT,
    appURL:
      process.env.NODE_ENV === 'production'
        ? process.env.APP_URL + '/api'
        : `http://localhost:${PORT}/api`
  };
});