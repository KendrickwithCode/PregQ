document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const locationInput = document.getElementById('locationInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const searchQuery = document.getElementById('searchQuery');

    const paragraph = document.createElement('p');
    const sourceParagraph = document.createElement('a');

    searchForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        paragraph.innerText = '';
        sourceParagraph.textContent = '';
        searchQuery.textContent = 'You: ' + searchInput.value.trim();

        let query = '';
        if (locationInput.value !== ''){
            query = searchInput.value.trim() + '+while+pregnant+' + locationInput.value + '+sources';
        }
        else{
            query = searchInput.value.trim() + '+while+pregnant';
        }

        query = query.replace(/\s+/g, '+');
        searchInput.innerText = '';
        console.log(query);

        try {
            // Make a request to the server's /search endpoint
            const response = await fetch(`/search?q=${query}`);
            const serpapiResults = await response.json();
            
            // Process and display the search results
            displayResults(serpapiResults);
        } catch (error) {
            console.error('Error fetching SerpAPI results:', error);
            // Handle error as needed
        }
    });

    function displayResults(data) {

        paragraph.innerText = data.answer_box.snippet;
        sourceParagraph.id = "firstLink";
        sourceParagraph.textContent = data.answer_box.source;
        sourceParagraph.href = data.answer_box.link;
        sourceParagraph.target = '_blank';

        resultsContainer.appendChild(paragraph);
        resultsContainer.appendChild(sourceParagraph);
        sourceParagraph.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
});