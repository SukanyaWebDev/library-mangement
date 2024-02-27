let searchInputEle = document.getElementById("searchInput");
let displayCountEle = document.getElementById("selectDisplayCount");
let searchResultsEle = document.getElementById("searchResults");

let spinnerEle = document.getElementById("spinner");
let bookCount = displayCountEle.value;

function createAndAppendSearchBook(result) {
    let {
        title,
        imageLink,
        author
    } = result;

    let resultEle = document.createElement("div");
    resultEle.classList.add("result-item", "col-11", "col-md-5", "d-flex", "flex-column");
    searchResultsEle.appendChild(resultEle);

    let imageEle = document.createElement("img");
    imageEle.classList.add("image");
    imageEle.src = imageLink;
    imageEle.alt = imageLink;
    resultEle.appendChild(imageEle);

    let authorEle = document.createElement("p");
    authorEle.classList.add("author-name");
    authorEle.textContent = author;
    resultEle.appendChild(authorEle);

}

function displayResults(searchResults) {
    spinnerEle.classList.toggle("d-none");

    if (searchResults.length > 0) {
        let headingEle = document.createElement("h1");
        headingEle.textContent = "Popular Books";
        headingEle.classList.add("heading");
        searchResultsEle.appendChild(headingEle);
        for (let result of searchResults) {
            let titleName = result.title;
            createAndAppendSearchBook(result);
        }
    } else {
        searchResultsEle.textContent = "No results found";
        searchResultsEle.classList.add("text-center no-result-text ");
        console.log(searchResultsEle.textContent);
    }
}

function searchBook(event) {
    if (event.key === "Enter") {

        spinnerEle.classList.toggle("d-none");
        searchResultsEle.textContent = "";

        let searchBookName = searchInputEle.value;
        console.log(searchBookName);
        let bookCount = displayCountEle.value;
        console.log(bookCount);
        let url = "https://apis.ccbp.in/book-store?title=" + searchBookName + "&maxResults=" + bookCount;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                displayResults(jsonData.search_results);
                console.log(jsonData);
            })
    }
}


searchInputEle.addEventListener("keydown", searchBook);