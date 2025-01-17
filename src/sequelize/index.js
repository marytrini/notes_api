require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASS, DB_HOST, DB_URL } = process.env;

// const sequelize = new Sequelize(DB_URL, {
//   logging: false,
//   native: false,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // This might be necessary if using a self-signed certificate
//     },
//   },
// });
const sequelize = new Sequelize (
    `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/notes_manager`,
    {
        logging: false,
        native: false,
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    console.log(`Cargando modelo desde archivo: ${file}`);
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};