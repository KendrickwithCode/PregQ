document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('SearchResults');

    searchForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const query = searchInput.value;

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
        // Clear previous results
        resultsContainer.innerHTML = '';

        if (data.organic_results) {
            for (let i = 0; i < Math.min(5, data.organic_results.length); i++) {
                const result = data.organic_results[i];
                const title = result.title;

                // Create a new paragraph element for each result
                const paragraph = document.createElement('p');
                paragraph.innerText = title;

                // Append the paragraph to the results container
                resultsContainer.appendChild(paragraph);
            }
        }
    }
});