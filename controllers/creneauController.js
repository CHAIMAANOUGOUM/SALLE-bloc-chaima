const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Creneau = mongoose.model('Creneau');
const Bloc = mongoose.model('Bloc');
const Salle = mongoose.model('Salle');

router.get('/', (req, res) => {
    res.render("creneau/addOrEdit", {
        viewTitle: "Insert Creneau"
    });
});
/** 
 * @swagger 
 * /creneau: 
 *   post: 
 *     description: Create an creneau
 *     parameters: 
 *     - name: creaneauName 
 *       description: Create an new  creneau
 *       in: formData 
 *       required: true 
 *       type: String 
 *     responses:  
 *       201: 
 *         description: Created  
 *   
 */

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var creneau = new Creneau();


    creneau.heure_debut = req.body.heure_debut;
    creneau.heure_fin = req.body.heure_fin;

    creneau.save((err, doc) => {
        if (!err)
            res.redirect('creneau/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("creneau/addOrEdit", {
                    viewTitle: "Insert Creneau",
                    creneau: req.body
                });
            } else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Creneau.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('creneau/list'); } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("creneau/addOrEdit", {
                    viewTitle: 'Update Creneu',
                    creneau: req.body
                });
            } else
                console.log('Error during record update : ' + err);
        }
    });
}
router.get('/list', (req, res) => {
    Creneau.find((err, docs) => {
        if (!err) {
            res.render("creneau/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving creneau list :' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'heure_debut':
                body['heure_debutError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
router.get('/:id', (req, res) => {
    Creneau.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("creneau/addOrEdit", {
                viewTitle: "Update Creneau",
                creneau: doc
            });
        }
    });
});
/**
 * @swagger
 *  /creneau/{id}:
 *    delete:
 *      summary: removes creneau from array
 *      tags: [creneau]
 *      parameters:
 *        - in: path
 *          name: id
 *    
 *          description: creneau id
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
    Creneau.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/creneau/list');
        } else { console.log('Error in Creneau delete :' + err); }
    });
});

module.exports = router;