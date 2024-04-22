const Router = require('express').Router;
const router = Router();
const path = require('path');


router.get('/tictactoe/', (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', 'views', 'tictactoeViews', 'menu.html'));
});

router.get('/tictactoe/game', (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', 'views', 'tictactoeViews', 'game.html'));
});
module.exports = router;