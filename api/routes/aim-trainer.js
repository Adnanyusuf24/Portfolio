const Router = require('express').Router;
const router = Router();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Database connection
// Connect to MongoDB
mongoose.connect('mongodb+srv://Mule:Test1234@cluster0.xnqqeoh.mongodb.net/yourDatabaseName?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Schema for Game Results
const GameResultSchema = new mongoose.Schema({
    username: String,
    difficulty: String,
    hits: Number
});
const GameResult = mongoose.model('GameResult', GameResultSchema);

router.get('/aim-trainer/', (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', 'views', 'Aim-trainerViews', 'menu.html'));
});

router.get('/aim-trainer/game', (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', 'views', 'Aim-trainerViews', 'game.html'));
});

router.post('/aim-trainer/save', async (req, res) => {
    const { username, difficulty, hits } = req.body;
    const newGameResult = new GameResult({
        username: username,
        difficulty: difficulty,
        hits: hits
    });
    try {
        const doc = await newGameResult.save();
        console.log('Game result saved:', doc);
        res.status(200).json({ message: 'Game result saved successfully', data: doc });
    } catch (err) {
        console.error('Error saving game result:', err);
        res.status(500).json({ message: 'Failed to save game result' });
    }
});

router.get('/aim-trainer/getResults', async (req, res) => {
    try {
        const topResults = await GameResult.find({}).sort({ hits: -1 }).limit(10); // Fetch top 10 results
        res.json(topResults);
    } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        res.status(500).send('Failed to fetch leaderboard');
    }
});

router.get('/aim-trainer/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', 'views', 'Aim-trainerViews', 'leaderboard.html'));
});
module.exports = router;