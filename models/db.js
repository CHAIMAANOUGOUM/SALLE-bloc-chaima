const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sall_bloc', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('Mongo Db Connection Succed') } else { console.log('error in db connection:' + err) }
});
require('./bloc.model');
require('./salle.model');
require('./creneau.model');
require('./occupation.model');