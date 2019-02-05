function showAuthors(authorSource) {
  if (authorSource.length > 1) {
    let authorsDisplay = "<p>Authors:</p>";

    authorSource.forEach((author) => {
      authorsDisplay += `<p>${author}</p>`
    });

    return authorsDisplay;
  }
  else {
    return `<p>Author: ${authorSource}</p>`;
  };
};

function authorListing(bookWriter) {
  if (bookWriter !== undefined) {
    return showAuthors(bookWriter);
  }
  else {
    return "<p>No author listed</p>"
  };
};

function showPublisher(publisherSource) {
  if (publisherSource !== undefined) {
    return `<p>Publisher: ${publisherSource}</p>`;
  }
  else {
    return "<p>No publisher listed</p>";
  };
};

function showImage(imageSource) {
  if (imageSource !== undefined) {
    return `<img src=${imageSource.smallThumbnail}>`;
  }
  else {
    return "<p>No image available</p>";
  };
};

function displayResults(sourceData) {
  let output = "<h2>Results</h2>"

  if (sourceData !== undefined) {
    sourceData.forEach((result) => {
      let title = result.volumeInfo.title
      let authors = result.volumeInfo.authors
      let publisher = result.volumeInfo.publisher
      let imageUrl = result.volumeInfo.imageLinks
      let moreInfoLink = result.volumeInfo.infoLink

      output += `
        <div class="item-listing">
          <h3>${title}</h3>
          ${authorListing(authors)}
          ${showPublisher(publisher)}
          ${showImage(imageUrl)}
          <p><a href=${moreInfoLink}>More Information</a></p>
        </div>
      `;
    });
  }

  else {
    output += "<h3 class='no-results'>No Results</h3>"
  };

  document.getElementById("results").innerHTML = output
};

function fetchData(source) {
  fetch(source)
  .then((response) => response.json())
  .then((data) => {

    displayResults(data.items);

  })
  .catch((error) => console.log(error))
};

document.getElementById("book-search").addEventListener("submit", function() {
  event.preventDefault();
  let search = document.getElementById("search").value
  let url = "https://www.googleapis.com/books/v1/volumes?q=" + search

  fetchData(url);
});