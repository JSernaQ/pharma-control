const express = require('express');
const { mongoConnect } = require('../database/mongoConnection');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            home: '',
            auth: '/auth',
            products: '/productos',
            sales: '/ventas',
        };

        this.middlewares();

        this.routes();
    }

    async dbConecction() {
        await mongoConnect();
    }

    routes() {
        this.app.use(this.path.home, require('../routes/home.route'))
        this.app.use(this.path.auth, require('../routes/auth.route'));
        this.app.use(this.path.products, require('../routes/product.route'));
        this.app.use(this.path.sales, require('../routes/sale.route'));
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(express.static(path.join(__dirname, '../../public')));

        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        });
    }
}

module.exports = {
    Server
};
