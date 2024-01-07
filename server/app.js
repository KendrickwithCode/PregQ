const ejs = require('ejs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const { searchSerpAPI } = require('./serpapi')

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/views/public')));
app.use(express.static(__dirname + '/public'));


// Define a route to render the HTML
app.get('/', (req, res) => {
    res.render('index');
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