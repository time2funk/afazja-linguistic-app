const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    next();
});

router.get('/', function (req, res) {
    const result = [];
    const words = [
        'przyjaciela',
        'ciągu',
        'narodził',
        'już',
        '1832',
        'Według',
        'informował',
        'długi',
        'trudny'
    ];
    result.push(' - ----------------------------- -');
    for (let i = 0; i < words.length; i++) {
        const lexem = nlp.getLexem(words[i]);
        if (lexem)
            result.push(` [ lexem ] - ${words[i]}`, lexem.getPOS());
        else
            result.push(` [ lexem ] - ${words[i]}`, lexem);
    }
    result.push(' - ----------------------------- -');

    const lexem = nlp.getLexem(words[0]);
    result.push(` [ lexem ] - ${words[0]} (adj 2 noun)`, nlp.getAllFormsOf(lexem).map(a => a.toString()));

    res.status(200).json({ data: result });
});
module.exports = router;


router.post('/', function (req, res) {
    const name = req.body.name;
    const UserSchema = mongoose.model('User');
    const user = new UserSchema({name});
    user.save();
    res.send({result: user});
        // }).catch(e => {
        //     res.status(500);
        // });
});