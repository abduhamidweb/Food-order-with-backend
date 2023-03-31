const PORT = process.env.PORT || 5000;
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors"
import {
    Sequelize,
    DataTypes
} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()
import sequelize from "../utils/sequelize.js";
import {
    createToken
} from "../utils/jwt.js";
const app = express();
// import CarModel from "../models/carsModel.js";
// import UserModel from "../models/userModel.js";
// import car from "../routers/car.routes.js";
// import users from "../routers/user.routes.js";
 
// // UserModel.hasMany(CarModel, {
// //   foreignKey: {
// //     name: "user_id",
// //     allowNull: false,
// //   },
// //   onDelete: "cascade",
// // });

// const app = express();
app.use(express.json());
app.use(cors())
// app.use(car);
// app.use(users);
app.listen(PORT, console.log("server running..."));
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Food = sequelize.define('Food', {
    imgLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foodName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

User.hasMany(Food);
Food.belongsTo(User);


async function syncTables() {
    try {
        await sequelize.sync();
        console.log('Tables synced successfully.');
        const user = await User.create({
            username: 'John Doe',
            phoneNumber: '123-456-7890',
        });
        const food1 = await Food.create({
            imgLink: 'https://example.com/food1.jpg',
            foodName: 'Pizza',
            count: 2,
            UserId: user.id,
        });

        const food2 = await Food.create({
            imgLink: 'https://example.com/food2.jpg',
            foodName: 'Burger',
            count: 3,
            UserId: user.id,
        });
    } catch (error) {
        console.error('Unable to sync tables:', error);
    }
}

syncTables();
// app.get('/users/:id', (req, res) => {
//     const {
//         id
//     } = req.params;
// })
app.get('/:type/:id?', async (req, res) => {
    const {
        type,
        id
    } = req.params;
    if (type === 'users' && !id) {
        const users = await User.findAll();
        res.send(users);
    } else if (type === 'food' && !id) {
        const foods = await Food.findAll();
        res.send(foods);
    } else if (id) {
        const user = await User.findByPk(id,{
            include: Food,
        });
        if (user) {
            res.send(user);
        } else {
            const food = await Food.findByPk(id, {
                include: User
            });
            if (food) {
                res.send(food);
            } else {
                res.status(404).send('Not found');
            }
        }
    } else {
        res.status(404).send('Not found');
    }
});

app.post('/users', async (req, res) => {
    try {
        if (req.headers.authorization) {
            res.status(200).send('Token exists in header');
        } else {}
        User.create({
                username: req.body.username,
                phoneNumber: req.body.phoneNumber,
            })
            .then((user) => {
                res.send({
                    token: createToken.SIGN({
                        token: user
                    }),
                });
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
});
app.post('/foods', async (req, res) => {
    try {
        if (req.headers.token) {
            // Token exists in header
            const {
                token
            } = createToken.VERIFY(req.headers.token)
            const {
                id
            } = token;
            await Food.create({
                imgLink: req.body.imgLink,
                foodName: req.body.foodName,
                count: req.body.count,
                UserId: id,
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
});
app.delete('/users/:id', async (req, res) => {
    const {
        id
    } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).send('Not found');
        return;
    }

    await user.destroy({
        include: Food
    });
    res.send('User and associated foods deleted successfully');
});
app.delete('/foods/:id', async (req, res) => {
    const {
        id
    } = req.params;

    const food = await Food.findByPk(id);
    if (!food) {
        res.status(404).send('Not found');
        return;
    }

    await food.destroy();
    res.send('Food item deleted successfully');
});