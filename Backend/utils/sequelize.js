import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
    "postgres://postgres:admin@localhost:5432/foodorder", {
        logging: false,
    }
);

// (async function () {
//     try {
//         await sequelize.authenticate();

//         await sequelize.models["Users"].sync({
//             alter: true
//         });
//         await sequelize.models["Cars"].sync({
//             alter: true
//         });

//         console.log("Connection database!");
//     } catch (er) {
//         console.log(er);
//     }
// })();

export default sequelize;
