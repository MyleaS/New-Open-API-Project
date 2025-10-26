// Selecting DOM elements//
const coffeeList = document.getElementById("coffee-list");
const hotBtn = document.getElementById("hotBtn");
const artWorkBtn = document.getElementById("artWork");
const coffeeForm = document.getElementById("coffeeForm");
const userList = document.getElementById("userList");

// Initial log to confirm script is loaded//
console.log("JavaScript loaded successfully!");
console.log("Elements found:", {
  coffeeList,
  hotBtn,
  artWorkBtn,
  coffeeForm,
  userList,
});

// 🔥 Hot Coffee Button
hotBtn.addEventListener("click", () => {
  deleteAlArtwork(); // Clear artwork cards when fetching coffee
  console.log("Hot Coffee button clicked!");
  fetchCoffee("hot");
});

// 🔁 Fetch coffee data from sample API
async function fetchCoffee(type) {
  coffeeList.innerHTML = "<p class='message'>Loading...</p>";
  console.log(`Fetching ${type} coffee data...`);

  try {
    const response = await fetch(`https://api.sampleapis.com/coffee/${type}`);
    console.log("Coffee API response:", response);

    const data = await response.json();
    console.log("Coffee data received:", data);
    console.log("Number of coffees:", data.length);

    delete data[3]; // Remove the 4th item (index 3)
    console.log("After removing last item:", data.length);

    displayCoffee(data);
  } catch (error) {
    console.error("Error fetching coffee data:", error);
    coffeeList.innerHTML = `<p class='message'>Error loading data: ${error.message}</p>`;
  }
}

// Render Coffee Cards//
function displayCoffee(coffees) {
  console.log("Displaying coffee cards...");
  coffeeList.innerHTML = "";

  coffees.forEach((coffee, index) => {
    console.log(`Coffee ${index + 1}:`, coffee);

    const card = document.createElement("div");
    card.className = "coffee-card";
    //Template for Coffee Card//
    card.innerHTML = `
      <div class="coffee-title">${coffee.title}</div>
      <img src="${coffee.image}" alt="${coffee.title}" class="coffee-image"
           onerror="this.src='https://via.placeholder.com/800x300?text=Image+Not+Available'">
      <div class="coffee-description">${coffee.description}</div>
    `;

    coffeeList.appendChild(card);
  });

  console.log(`Successfully displayed ${coffees.length} coffee cards`);
}
function deleteAllCoffee() {
  console.log("Deleting all coffee cards...");
  coffeeList.innerHTML = "";
  console.log("All coffee cards deleted.");
}

// Random Art Institute Artwork//
artWorkBtn.addEventListener("click", async () => {
  deleteAllCoffee(); // Clear coffee cards when fetching artwork
  console.log("Artwork button clicked!");

  const artContainer = document.getElementById("art-container");
  artContainer.innerHTML = "<p class='message'>Loading artwork...</p>";

  try {
    // Fetch a list of artworks with images
    console.log("Fetching artworks from Art Institute API...");

    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?limit=100&fields=id,title,artist_display,date_display,medium_display,dimensions,place_of_origin,image_id"
    );
    console.log("Artwork API response:", response);

    const data = await response.json();
    console.log("Artwork data received:", data);
    console.log("Total artworks:", data.data.length);

    // Filter artworks that have images
    const artworksWithImages = data.data.filter((art) => art.image_id);
    console.log("Artworks with images:", artworksWithImages.length);
    console.log("Filtered artworks:", artworksWithImages);
    //If no artworks with images found show message//
    if (artworksWithImages.length === 0) {
      console.warn("No artworks with images found!");
      artContainer.innerHTML =
        "<p class='message'>No artworks with images found.</p>";
      return;
    }

    // Pick a random artwork
    const randomIndex = Math.floor(Math.random() * artworksWithImages.length);
    const randomArtwork = artworksWithImages[randomIndex];
    console.log(
      "Random artwork selected (index " + randomIndex + "):",
      randomArtwork
    );
    // Construct image URL//
    const imageUrl = `https://www.artic.edu/iiif/2/${randomArtwork.image_id}/full/843,/0/default.jpg`;
    console.log("Image URL:", imageUrl);

    artContainer.innerHTML = `
      <div class="art-card">
        <img src="${imageUrl}" alt="${randomArtwork.title}" class="art-image"
             onerror="this.src='https://via.placeholder.com/300x400?text=Image+Not+Available'"/>
        <div class="art-details">
          <h3>${randomArtwork.title || "Untitled"}</h3>
          <p><strong>Artist:</strong> ${
            randomArtwork.artist_display || "Unknown"
          }</p>
          <p><strong>Date:</strong> ${
            randomArtwork.date_display || "Unknown"
          }</p>
          <p><strong>Medium:</strong> ${
            randomArtwork.medium_display || "Unknown"
          }</p>
          <p><strong>Dimensions:</strong> ${
            randomArtwork.dimensions || "Unknown"
          }</p>
          <p><strong>Place of Origin:</strong> ${
            randomArtwork.place_of_origin || "Unknown"
          }</p>
        </div>
      </div>
    `;

    console.log("Artwork displayed successfully!");
  } catch (error) {
    console.error("Error fetching artwork:", error);
    artContainer.innerHTML = `<p class='message'>Failed to load artwork. Please try again later.</p>`;
  }
});

// Coffee preference form submission//
coffeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted!");

  const userName = document.getElementById("userName").value;
  const favCoffee = document.getElementById("favCoffee").value;
  console.log("User data:", { userName, favCoffee });

  const li = document.createElement("li");
  li.textContent = `${userName} loves ${favCoffee}`;
  userList.appendChild(li);
  console.log("User preference added to list");

  // Reset form
  coffeeForm.reset();
  console.log("Form reset");
});
// Function to delete all artwork cards
function deleteAlArtwork() {
  console.log("Deleting all artwork cards...");
  const artContainer = document.getElementById("art-container");
  artContainer.innerHTML = "";
  console.log("All artwork cards deleted.");
}
