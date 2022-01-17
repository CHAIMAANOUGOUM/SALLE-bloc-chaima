const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Salle = mongoose.model('Salle');
const Bloc = mongoose.model('Bloc');
const Creneau = mongoose.model('Creneau');
const Occupation = mongoose.model('Occupation');
///-----Salle-----//////

/**
 * @swagger
 * /apiSalleController/salle/:
 *   get:
 *     summary: Returns all salle
 *     responses:
 *       200:
 *         description: the list of the salle
 *         content:
 *           application/json:
 *             schema:
 *               type: array

 */
router.get('/salle', function(req, res, next) {
    Bloc.find((err, docs) => {
        Salle.find({}).then(function(salle) {
            res.send(salle);
        }).catch(next);
    });

});



/** 
 * @swagger 
 * /apiSalleController/Salle/{_Id}: 
 *  
 *   get: 
 *     description: Get salle by Id
 *     parameters:
 *      - in: path
 *        name: _Id   # Note the name is the same as in the path
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *        
 *   
 */
router.get('/salle/:id', function(req, res, next) {
    Salle.findOne({ _id: req.params.id }).then(function(salle) {
        res.send(salle);
    });
});


/** 
 * @swagger 
 * /apiSalleController/salle/: 
 *   post: 
 *     description: Create an salle 
 *     parameters: 
 *      - name: code
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: libelle
 *        in: formData 
 *        type: string
 *      - name: bloc
 *        in: formData
 *        type: string
 *      - name: nameBloc
 *        in: formData 
 *        type: string
 *     responses:  
 *       201: 
 *         description: Created  
 *   
 */

router.post('/salle', function(req, res, next) {
    Salle.create(req.body).then(function(salle) {
        res.send(salle);
    }).catch(next);
});

/** 
 * @swagger 
 * /apiSalleController/salle/{_Id}: 
 *   put: 
 *     description: Update salle
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *      - name: code
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: libelle
 *        in: formData 
 *        type: string
 *      - name: bloc
 *        in: formData
 *        type: string
 *      - name: nameBloc
 *        in: formData 
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success  
 *   
 */
router.put('/salle/:id', function(req, res, next) {
    Salle.findOneAndUpdate({ _id: req.params.id }, req.body).then(function(s) {
        Salle.findOne({ _id: req.params.id }).then(function(s) {
            res.send(s);
        });
    });
});






///---blocs----///

/** 
 * @swagger 
 * /apiSalleController/bloc: 
 *   get: 
 *     description: Get all blocs
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
router.get('/bloc', function(req, res, next) {
    Bloc.find({}).then(function(bloc) {
        res.send(bloc);
    }).catch(next);
});



/** 
 * @swagger 
 * /apiSalleController/bloc/{_Id}: 
 *   get: 
 *     description: Get bloc by Id
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *   
 */
router.get('/bloc/:id', function(req, res, next) {
    Bloc.findOne({ _id: req.params.id }).then(function(bloc) {
        res.send(bloc);
    });
});



/** 
 * @swagger 
 * /apiSalleController/bloc/: 
 *   post: 
 *     description: Add bloc
 *     parameters:
 *      - name: code
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: libelle
 *        in: formData  
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success  
 *   
 */
router.post('/bloc', function(req, res, next) {
    Bloc.create(req.body).then(function(bloc) {
        res.send(bloc);
    }).catch(next);
});





/** 
 * @swagger 
 * /apiSalleController/bloc/{_Id}: 
 *   put: 
 *     description: Update bloc
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *      - name: code
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: libelle
 *        in: formData 
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success  
 *   
 */
router.put('/bloc/:id', function(req, res, next) {
    Bloc.findOneAndUpdate({ _id: req.params.id }, req.body).then(function(bloc) {
        Bloc.findOne({ _id: req.params.id }).then(function(bloc) {
            res.send(bloc);
        });
    });
});






/** 
 * @swagger 
 * /apiSalleController/bloc/{_Id}: 
 *   delete: 
 *     description: Delete bloc
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *        
 *   
 */
router.delete('/bloc/:id', function(req, res, next) {
    Bloc.findOneAndDelete({ _id: req.params.id }).then(function(bloc) {
        res.send(bloc);
    });
});




// -------------------------------------------------------------------------------
// ----------------------------------------- creneaux--------------------------------------

/**
 * @swagger
 * /apiSalleController/creneau:
 *   get:
 *     summary: Returns all creneau
 *     responses:
 *       200:
 *         description: the list of the creneau
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/creneau', function(req, res, next) {
    Creneau.find({}).then(function(creneau) {
        res.send(creneau);
    }).catch(next);
});



/** 
 * @swagger 
 * /apiSalleController/creneau/{_Id}: 
 *   get: 
 *     description: Get creneau by Id
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *        
 *   
 */
router.get('/creneau/:id', function(req, res, next) {
    Creneau.findOne({ _id: req.params.id }).then(function(creneau) {
        res.send(creneau);
    });
});

/** 
 * @swagger 
 * /apiSalleController/creneau/: 
 *   post: 
 *     description: Add Creneau
 *     parameters:
 *      - name: heure_debut
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: heure_fin
 *        in: formData  
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success  
 *   
 */


router.post('/creneau', function(req, res, next) {
    Creneau.create(req.body).then(function(creneau) {
        res.send(creneau);
    }).catch(next);
});






/** 
 * @swagger 
 * /apiSalleController/creneau/{_Id}: 
 *   put: 
 *     description: Update creneau
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *      - name: heure_debut
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: heure_fin
 *        in: formData 
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success  
 *   
 */
router.put('/creneau/:id', function(req, res, next) {
    Creneau.findOneAndUpdate({ _id: req.params.id }, req.body).then(function(creneau) {
        Creneau.findOne({ _id: req.params.id }).then(function(creneau) {
            res.send(creneau);
        });
    });
});

//-------------------------------------------------------------------------------
// ----------------------------------------- Occupation--------------------------------------


/** 
 * @swagger 
 * /apiSalleController/occupation: 
 *   get: 
 *     description: Get all occupations
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
router.get('/occupation', function(req, res, next) {
    Occupation.find({}).then(function(occupation) {
        res.send(occupation);
    }).catch(next);
});



/** 
 * @swagger 
 * /api/occupation/{_Id}: 
 *   get: 
 *     description: Get occupation by Id
 *     parameters:
 *      - in: path
 *        name: _Id   
 *        type: string
 *        required: true
 *     responses:  
 *        200: 
 *         description: Success  
 *        
 *   
 */
router.get('/occupation/:id', function(req, res, next) {
    Occupation.findOne({ _id: req.params.id }).then(function(occupation) {
        res.send(occupation);
    });
});


/** 
 * @swagger 
 * /apiSalleController/occupation/: 
 *   post: 
 *     description: Add Occupation
 *     parameters:
 *      - name: nameCreneau
 *        in: formData  
 *        type: string
 *        required: true
 *      - name: nameSalle
 *        in: formData  
 *        type: string
 *     responses:  
 *        200: 
 *         description: Success  
 *   
 */


router.post('/occupation', function(req, res, next) {
    Occupation.create(req.body).then(function(occupation) {
        res.send(occupation);
    }).catch(next);
});




module.exports = router;