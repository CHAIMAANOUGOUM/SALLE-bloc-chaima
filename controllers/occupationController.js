const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Salle = mongoose.model('Salle');
const Occupation = mongoose.model('Occupation');
const Creneau = mongoose.model('Creneau');
const QRCode = require('qrcode')

router.get('/', (req, res) => {
    Creneau.find((err, docs) => {
        if (!err) {
            Salle.find((err, doc) => {
                if (!err) {
                    res.render("occupation/addOrEdit", {
                        salle: doc,
                        creneau: docs,
                        viewTitle: "Insert Occupation"
                    })
                }
            });

        } else {
            console.log('Error in retrieving occupation list :' + err);
        }
    });
});



router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var occupation = new Occupation();
    occupation.date = new Date();
    Salle.findById(req.body.salle, function(err, docs) {
        Creneau.findById(req.body.creneau, function(err, docss) {
            if (err) {
                console.log(err);
            } else {
                occupation.nameSalle = docs.code
                occupation.nameCreneau = docss.heure_debut + " - " + docss.heure_fin

                console.log(docs.name);
                occupation.salle = docs;
                occupation.creneau = docss
                occupation.save((err, doc) => {
                    if (!err)
                        res.redirect('occupation/list');
                    else {
                        if (err.name == 'ValidationError') {
                            handleValidationError(err, req.body);
                            res.render("occupation/addOrEdit", {
                                viewTitle: "Insert reservation",
                                occupation: req.body
                            });
                        } else
                            console.log('Error during record insertion : ' + err);
                    }
                });
                console.log("Result : ", docs);
            }
        });
    });


    console.log("Salle.findById(req.body.hall)");

    occupation.salle = Salle.findById(req.body.hall);
    occupation.creneau = Creneau.findById(req.body.hall);

}

function updateRecord(req, res) {
    Occupation.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('occupaation/list'); } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("occupation/addOrEdit", {
                    viewTitle: 'Update reservation',
                    occupation: req.body
                });
            } else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Occupation.find((err, docs) => {
        if (!err) {
            res.render("occupation/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving occupation list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'date':
                body['dateError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


router.get('/:id', (req, res) => {
    Creneau.find((err, docss) => {
        Salle.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.render("occupation/addOrEdit", {
                    viewTitle: "Update occupation",
                    salle: doc,
                    creneau: docss
                });
            }
        });
    });
});

router.get('/:id', (req, res) => {
    Occupation.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("occupation/addOrEdit", {
                viewTitle: "Update occupation",
                occupation: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Occupation.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/occupation/list');
        } else { console.log('Error in occupation delete :' + err); }
    });
});
router.get('/qrgenerator/:id', (req, res) => {
    var salle = new Salle();
    Salle.findById(req.params.id, (err, doc) => {
        if (!err) {
            salle.code = doc.code;
            salle.libelle = doc.libelle;
            QRCode.toDataURL(doc._id + "", (err, src) => {
                if (!err) {
                    console.log(doc._id);
                    res.render("occupation/qrCode", {
                        src: src,
                        salle: salle.libelle
                    });
                }
            })
        }
    });

});


module.exports = router;