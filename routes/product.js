let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let product = require('../models/product');

router.route('/create').post((req, res, next) => {
    product.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log("api response:",data);
            res.json(data)
        }
    })
});

router.route('/').get((req, res) => {
    product.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/edit/:id').get((req, res) => {
    product.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


router.route('/update/:id').put((req, res, next) => {
    product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Product updated successfully !')
        }
    })
})

router.route('/delete/:id').delete((req, res, next) => {
    product.findByIdAndUpdate(req.params.id, {
        available: false
    },(error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;
