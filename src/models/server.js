const express = require('express');
const { mongoConnect } = require('../database/mongoConnection');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { isAuthenticated } = require('../middleware/checkAuthenticated');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;

        this.path = {
            home: '',
            auth: '/auth',
            products: '/productos',
            sales: '/ventas',
            purchases: '/compras',
            // customers: '/clientes',
            // reports: '/informes',
            // config: '/config',
            maintenance: '/maintenance'
        };

        this.middlewares();

        this.routes();
    }

    async dbConecction() {
        await mongoConnect();
    }

    routes() {
        this.app.use(this.path.home, require('../routes/home.route'));
        this.app.use(this.path.auth, require('../routes/auth.route'));
        this.app.use(this.path.products, require('../routes/product.route'));
        this.app.use(this.path.sales, require('../routes/sale.route'));
        this.app.use(this.path.purchases, require('../routes/purchase.route.js'));
        // this.app.use(this.path.customers, require('../routes/sale.route'));
        // this.app.use(this.path.reports, require('../routes/sale.route'));
        // this.app.use(this.path.config, require('../routes/sale.route'));
        this.app.use(this.path.maintenance, require('../routes/maintenance.route'));

    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(isAuthenticated);

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
