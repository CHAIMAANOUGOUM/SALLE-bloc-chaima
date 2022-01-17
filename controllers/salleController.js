const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Salle = mongoose.model('Salle');
const Bloc = mongoose.model('Bloc');

router.get('/', (req, res) => {
    Bloc.find((err, docs) => {
        if (!err) {
            console.log(docs);
            res.render("salle/addOrEdit", {
                blocs: docs,
                viewTitle: "Insert Salle"

            });
        } else {
            console.log('Error in retrieving blocs list :' + err);
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
    var salle = new Salle();
    salle.code = req.body.code;
    salle.libelle = req.body.libelle;
    Bloc.findById(req.body.bloc, function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            salle.nameBloc = docs.code
            console.log(docs.name);
            salle.bloc = docs;
            salle.save((err, doc) => {
                if (!err)
                    res.redirect('salle/list');
                else {
                    if (err.name == 'ValidationError') {
                        handleValidationError(err, req.body);
                        res.render("salle/addOrEdit", {
                            viewTitle: "Insert Salle",
                            salle: req.body
                        });
                    } else
                        console.log('Error during record insertion : ' + err);
                }
            });
            console.log("Result : ", docs);
        }
    });
    console.log("Bloc.findById(req.body.hall)");

    salle.bloc = Bloc.findById(req.body.hall);


}

function updateRecord(req, res) {
    Salle.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('salle/list'); } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("salle/addOrEdit", {
                    viewTitle: 'Update Salle',
                    salle: req.body
                });
            } else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Salle.find((err, docs) => {
        if (!err) {
            res.render("salle/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving salle list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'code':
                body['codeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
router.get('/:id', (req, res) => {
    Bloc.find((err, docss) => {
        Salle.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.render("salle/addOrEdit", {
                    viewTitle: "Update  Salle",
                    salle: doc,
                    blocs: docss
                });
            }
        });
    });
});
/**
 * @swagger
 *  /salle/{id}:
 *    delete:
 *      summary: removes salle from array
 *      tags: [salle]
 *      parameters:
 *        - in: path
 *          name: id
 *    
 *          description: salle id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The post was deleted
 *        404:
 *          description: The post was not found
 *
 */



router.get('/delete/:id', (req, res) => {
    Salle.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/salle/list');
        } else { console.log('Error in salle delete :' + err); }
    });
});

module.exports = router;