const fetch = require('node-fetch');

async function searchSerpAPI(query) {
    const apiKey = '1b1b444923af452425ccd5f9b3f1691e9d897e7445d00478ff318967d9a6a502';
    
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