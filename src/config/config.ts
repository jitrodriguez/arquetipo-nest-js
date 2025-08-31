export const config = () => ({
  PORT: process.env.PORT || 5000,
  DATABASE: {
    type: 'sqlite',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    synchronize: false,
    logging: false,
    entities: ['build/**/*.entity{.ts,.js}'],
  },
});
