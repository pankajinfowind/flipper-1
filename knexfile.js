module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/flipper.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    debug: true
  }
};

