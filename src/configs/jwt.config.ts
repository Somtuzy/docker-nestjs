import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  // options: {
  //   issuer: process.env.APP_NAME,
  //   audience: `${process.env.APP_NAME}.com`,
  //   subject: `${process.env.APP_NAME}:user`,
  //   expiresIn: process.env.NODE_ENV !== 'development' ? '6h' : '1d',
  //   algorithm: 'HS256'
  // },
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN ? process.env.JWT_EXPIRES_IN : process.env.NODE_ENV !== 'development' ? '6h' : '1d'
}));