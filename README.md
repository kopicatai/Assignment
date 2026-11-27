# Recipe Finder

An interactive web app that helps people decide what to cook. The user picks a meal type from a dropdown, and the app shows matching recipes with photos, ingredients and step-by-step instructions.

Live demo: https://kopicatai.github.io/Assignment/
Author: Poh Yang Kang (& Claude)

---

## Theme

Making the daily "what should I cook?" decision quick and easy. Instead of searching through long recipe websites, the user makes one choice and immediately sees ideas.

## Features

- Drop-down with six meal types: Beef, Chicken, Fish, Lamb, Pork and Vegetarian
- Recipes load automatically when a choice is made (no search button needed)
- Recipe cards with a photo and name
- Click a card to see the full recipe: category, cuisine, ingredients and numbered instructions
- "Return to main" button at the bottom of the recipe that closes it and scrolls back to the top
- Loading messages and friendly error messages (no internet, no results, API failure)
- Responsive layout that works on phone and desktop


## APIs used

| API | Type | Purpose |
|---|---|---|
| [TheMealDB](https://www.themealdb.com/api.php) | Third-party API | Recipe categories, photos, ingredients and instructions |
| Fetch API | Built-in HTML5/browser API | Sends requests to TheMealDB and receives JSON |
| DOM events and scroll methods | Built-in browser APIs | Dropdown changes, card clicks, smooth scrolling |

TheMealDB endpoints used:

- `filter.php?c=<category>` returns all meals in a category
- `lookup.php?i=<id>` returns the full recipe for one meal

The free test key (`1`) is public, so no secret keys are stored in this project.

## Technologies

- HTML5
- CSS3 (flexbox, grid, responsive design)
- Vanilla JavaScript (async/await, template strings, event delegation)

No frameworks or libraries are needed.

## Project structure

```
recipe-app/
├── images/
│   └── wallpaper.jpg
├── index.html     Page structure
├── style.css      Appearance
├── app.js         Behavior and API calls
└── README.md
```

## How it works

1. The user chooses a meal type in the dropdown.
2. `buildUrl()` creates the TheMealDB address for that category.
3. `fetch()` requests the data, and `processData()` keeps only the id, name and photo.
4. `renderCard()` turns each item into a recipe card on the page.
5. When a card is clicked, a second request loads the full recipe.
6. `formatInstructions()` cleans up the text into a numbered list.
7. The "Return to main" button hides the recipe and scrolls to the top.

The JavaScript is split into a custom section (the three functions that depend on the API) and a generic section (loading, fetching and error handling), so the same template can be reused with other APIs.

## How to run

**Option 1:** Download or clone the project and open `index.html` in a browser.

**Option 2 (recommended):** Open the folder in VS Code and use the **Live Server** extension.

An internet connection is required to load recipes.

```bash
git clone https://github.com/YOUR-USERNAME/recipe-app.git
cd recipe-app
```

## Design decisions

- **Dropdown instead of a text box:** avoids typing, spelling mistakes and empty results.
- **"Fish" sends `Seafood`:** TheMealDB has no Fish category, so the label users see is different from the value sent to the API.
- **Cards first, details second:** the category search returns only names and photos, so the full recipe is loaded only when the user asks for it. This keeps the first screen fast.
- **Return button:** long recipes need an easy way back to the choices.

## Testing

- Each of the six categories loads recipe cards
- Switching categories replaces the old cards
- Choosing the blank option clears the page
- Clicking a card shows the full recipe with a working Return button
- Turning off the internet shows an error message
- Layout checked on a narrow (phone-sized) window

## Possible future improvements

- "Surprise me" button using TheMealDB's random recipe
- Save favorite recipes with `localStorage`
- Load the dropdown categories from the API
- Add a cuisine filter and a search by meal name
- Link to the recipe's YouTube video
- Dark mode

## Credits

- Recipe data and images: [TheMealDB](https://www.themealdb.com)
- Wallpaper photo from https://www.magnific.com/free-photos-vectors/food-1080p
