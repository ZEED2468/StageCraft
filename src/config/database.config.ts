import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'stagecraft_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: false,
    autoLoadEntities: true,
    ssl:
      process.env.DATABASE_SSL === 'require'
        ? { rejectUnauthorized: false }
        : false,
  }),
);
