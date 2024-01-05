const express = require('express');
const app = express();
const ejs = require('ejs');
const cors = require('cors');
const { searchSerpAPI } = require('./serpapi')

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the HTML
app.get('/', cors(), (req, res) => {
    res.render('index', { pageTitle: 'Pregnant Questions', username: 'Jason' });
});

app.get('/search', async(req, res) => {
    const query = req.query.q;

    try{
        const serpapiResults = await searchSerpAPI(query);
        res.json(serpapiResults);
    } catch (error){
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Start the server
const port = 80;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});