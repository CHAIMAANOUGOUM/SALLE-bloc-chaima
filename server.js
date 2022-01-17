require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyparser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const qrcode = require("qrcode");

const blocController = require('./controllers/blocController');
const salleController = require('./controllers/salleController');
const creneauController = require('./controllers/creneauController');
const occupationController = require('./controllers/occupationController');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Express server started at port :3000');
});
app.use('/bloc', blocController);
app.use('/salle', salleController);
app.use('/creneau', creneauController);
app.use('/occupation', occupationController);
app.use('/apiSalleController', require('./Controllers/apiSalleController'));
//Swagger Configuration  
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Salle Bloc API',
            version: '1.0.0'
        }
    },
    apis: ['./controllers/apiSalleController.js'],
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.static("public"));
app.get("/", (req, res, next) => {
    res.render("index");
});
app.post("/scan", (req, res, next) => {
    const input_text = req.body.text;
    qrcode.toDataURL(input_text, (err, src) => {
        if (err) res.send("Something went wrong!!");
        res.render("scan", {
            qr_code: src,

        });
    });

});