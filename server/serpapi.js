const fetch = require('node-fetch');

async function searchSerpAPI(query) {
    const apiKey = process.env.API_KEY;
    
    // Construct the SerpAPI endpoint URL
    const apiUrl = `https://serpapi.com/search?q=${query}&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching SerpAPI results:', error);
        throw error;
    }
}

module.exports = {
    searchSerpAPI,
};