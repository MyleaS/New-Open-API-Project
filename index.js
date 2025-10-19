const coffeeList = document.getElementById("coffee-list");
const hotBtn = document.getElementById("hotBtn");
const artWorkBtn = document.getElementById("artWork");

// Add click event to hot coffee button
hotBtn.addEventListener("click", () => {
  fetchCoffee("hot"); // API endpoint expects "hot"
});

// Async function to fetch coffee data from API
async function fetchCoffee(type) {
  // Show loading message while fetching
  coffeeList.innerHTML = "<p>Loading...</p>";

  try {
    // Fetch data from the Sample APIs coffee endpoint
    const response = await fetch(`https://api.sampleapis.com/coffee/${type}`);
    console.log(response);
    const data = await response.json();
    data.pop(); // Remove last item if needed
    // Call function to display the fetched data
    displayCoffee(data);
  } catch (error) {
    // Show error message if fetch fails
    coffeeList.innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
}

// Function to display coffee data in the DOM
function displayCoffee(coffees) {
  // Clear the list first
  coffeeList.innerHTML = "";

  coffees.forEach((coffee) => {
    // Create a new div element for each card
    const card = document.createElement("div");
    card.className = "coffee-card";

    // Build the card structure with title, image, and description
    // Title comes first
    // Image comes second
    // Description comes last
    card.innerHTML = `
        <div class="coffee-title">${coffee.title}</div>
        <img src="${coffee.image}" alt="${coffee.title}" class="coffee-image" onerror="this.src='https://via.placeholder.com/800x300?text=Image+Not+Available'">
        <div class="coffee-description">${coffee.description}</div>
    `;

    // Add the card to the coffeeList container
    coffeeList.appendChild(card);
  });
}

// Art Institute of Chicago API Integration//
artWorkBtn.addEventListener("click", () => {
  const artContainer = document.getElementById("art-container");

  fetch("https://api.artic.edu/api/v1/artworks/117266")
    // .then((res) => console.log(res) || response)
    .then((res) => res.json())
    .then((data) => {
      const artwork = data.data;
      const imageId = artwork.image_id;
      const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

      https: artContainer.innerHTML = `
        <div class="art-card">
          <img src="${imageUrl}" alt="${artwork.title}" class="art-image"/>
          <div class="art-details">
            <h3>${artwork.title}</h3>
            <p><strong>Artist:</strong> ${artwork.artist_display}</p>
            <p><strong>Date:</strong> ${artwork.date_display}</p>
            <p><strong>Medium:</strong> ${artwork.medium_display}</p>
            <p><strong>Dimensions:</strong> ${artwork.dimensions}</p>
            <p><strong>Place of Origin:</strong> ${artwork.place_of_origin}</p>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      // artContainer.innerHTML = `<p>Failed to load artwork. Please try again later.</p>`;
      // console.error(err);
    });
});
