export const config = () => {
  const entities_directory =
    __dirname + '../../../src/domain/entity/*.entity{.ts,.js}';
  return {
    DATABASE: {
      type: 'sqlite',
      database: ':memory:',
      dropSchema: false,
      synchronize: true,
      logging: false,
      entities: [entities_directory],
    },
  };
};
