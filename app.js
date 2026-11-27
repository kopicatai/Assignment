// part A >> inputs

const input = document.getElementById("userInput");    // the dropdown
const statusEl = document.getElementById("status");    // "Loading..." / error messages
const resultsEl = document.getElementById("results");  // where recipe cards appear
const detailsEl = document.getElementById("details");  // where the full recipe appears


// part B >> API


function buildUrl(userValue) {
  return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(userValue)}`;
}


function processData(data) {
  if (!data.meals) return [];   // the API returns null when nothing matches
  return data.meals.map(meal => ({
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb
  }));
}

// HTML for one recipe card
function renderCard(item) {
  return `
    <article class="card" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
    </article>`;
}


//part C >> generic

input.addEventListener("change", search);   // search whenever a choice is made

async function search() {
  const value = input.value;

  // Blank option chosen: clear the page and stop
  if (!value) {
    statusEl.textContent = "";
    resultsEl.innerHTML = "";
    detailsEl.innerHTML = "";
    return;
  }

  statusEl.textContent = "Loading...";
  resultsEl.innerHTML = "";
  detailsEl.innerHTML = "";

  try {
    const response = await fetch(buildUrl(value));
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();

    const items = processData(data);
    if (items.length === 0) {
      statusEl.textContent = "No results found.";
      return;
    }

    statusEl.textContent = "";
    resultsEl.innerHTML = items.map(renderCard).join("");
  } catch (err) {
    statusEl.textContent = "Something went wrong. Please try again.";
  }
}


//part D >> recipe


resultsEl.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) showRecipe(card.dataset.id);
});

// format instruction
function formatInstructions(text) {
 
  let steps = text
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => s && !/^step\s*\d+$/i.test(s))
    .map(s => s.replace(/^(step\s*)?\d+[.):\-]\s*/i, ""));   // remove leading "1." or "Step 1:"

  // Some recipes arrive as one long paragraph, so split by sentence instead
  if (steps.length <= 2) {
    steps = text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
  }

  return `<ol class="instructions">${steps.map(s => `<li>${s}</li>`).join("")}</ol>`;
}

// fetch the full recipe and show it
async function showRecipe(id) {
  detailsEl.textContent = "Loading recipe...";

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!res.ok) throw new Error("Request failed");
    const data = await res.json();
    if (!data.meals) throw new Error("Recipe not found");
    const meal = data.meals[0];

    // Ingredients format
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`] || "";
      if (name && name.trim()) {
        ingredients.push(`${measure} ${name}`.trim());
      }
    }

    detailsEl.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <p><strong>${meal.strCategory}</strong> · ${meal.strArea}</p>
      <h3>Ingredients</h3>
      <ul>${ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      <h3>Instructions</h3>
      ${formatInstructions(meal.strInstructions)}
      <button id="backBtn">⬆ Return to top</button>`;

    detailsEl.scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    detailsEl.textContent = "Couldn't load the recipe. Please try again.";
  }
}

// return to Top
detailsEl.addEventListener("click", e => {
  if (e.target.id === "backBtn") {
    detailsEl.innerHTML = "";                           
    window.scrollTo({ top: 0, behavior: "smooth" });    
  }
});