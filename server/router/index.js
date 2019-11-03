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
        .catch(e => res.status(500).json({msg: 'Something broke', error: e}));
});

router.get('/article/:id', async function (req, res) {
    const id = req.params.id;
    
    return controller.getArticle(id)
        .then(result => res.status(200).json(result))
        .catch(e => res.status(500).json({msg: 'Something broke', error: e}));
});

router.post('/article/new', async function (req, res) {
    const text = req.body.text;
    const name = req.body.name;
    
    return controller.createArticle(text, name)
        .then(result => res.status(200).json(result))
        .catch(e => res.status(500).json({msg: 'Something broke', error: e}));
});
module.exports = router;


// router.post('/', function (req, res) {
//     const name = req.body.name;
//     const UserSchema = mongoose.model('User');
//     res.send({result: user});
//         // }).catch(e => {
//         //     res.status(500);
//         // });
// });