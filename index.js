const coffeeList = document.getElementById("coffee-list");
const hotBtn = document.getElementById("hotBtn");

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
