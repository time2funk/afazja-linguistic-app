const express = require('express');
const router = express.Router();

const controller = require('../controller');

// middleware
router.get('/', function (req, res, next) {
    console.log({req});
    next();
});

router.get('/test', function (req, res) {
    const result = controller.test();
    res.status(200).json({ data: result });
});

router.get('/article/all', async function (req, res) {
    return controller.getArticles()
        .then(result => res.status(200).json(result))
        .catch(defaultErrorCtrl(res));
});

router.get('/article/:id', async function (req, res) {
    const id = req.params.id;
    
    return controller.getArticle(id)
        .then(result => res.status(200).json(result))
        .catch(defaultErrorCtrl(res));
});

router.post('/article/new', async function (req, res) {
    const text = req.body.text;
    const name = req.body.name;
    
    return controller.createArticle(text, name)
        .then(result => res.status(200).json(result))
        .catch(defaultErrorCtrl(res));
});

router.post('/article/:id', async function (req, res) {
    const id = req.params.id;
    const article = req.body.article;
    return controller.updateArticle(id, article)
        .then(result => res.status(200).json(result))
        .catch(defaultErrorCtrl(res));
});

router.delete('/article/:id', async function (req, res) {
    const id = req.params.id;

    return controller.deleteArticle(id)
        .then(result => res.status(200).json(result))
        .catch(defaultErrorCtrl(res));
});

module.exports = router;

function defaultErrorCtrl(res) {
    return error => res.status(500).json({
        msg: 'Something broke', 
        error,
    });
}