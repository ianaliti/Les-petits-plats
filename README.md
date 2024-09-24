<p align="center">Les Petits Plats - Recipe Search & Filter App 🍽️</p>
<p align="center"> <img src="assets/images/logo/Logo-les-petits-plats.png" alt="Les Petits Plats Logo" width="200"/> </p>
Overview
Les Petits Plats is a recipe search and filter web application that allows users to explore a collection of more than 1500 recipes. Users can search by recipe name, ingredient, appliance, or utensil. The app also provides advanced filtering options, enabling users to narrow down recipes based on their preferred criteria and tags.

The project is built using vanilla JavaScript, HTML, CSS, and Bootstrap for styling, with a modular structure for easy maintenance and scalability.

Features <ul>
<li>🔍 Search Recipes: Search by recipe name, description, or ingredients using the search bar.</li>
<li>📝 Filter Recipes: Filter recipes based on ingredients, appliances, and utensils via dropdown menus.</li>
<li>🏷️ Tag Management: Add and remove tags for filtering recipes dynamically.</li>
<li>📱 Responsive Design: Built with Bootstrap for mobile-friendly usage.</li>
<li>⚡ Dynamic Recipe Display: Recipes are rendered dynamically based on user input and filters.</li>

Technologies
This project uses the following technologies:

<ul> <li><b>HTML5</b>: For the structure of the web page.</li> <li><b>CSS3</b>: Custom styles along with Bootstrap for responsive design.</li> <li><b>JavaScript (ES6 Modules)</b>: Handles logic for filtering, searching, and rendering UI components.</li> <li><b>Bootstrap 5.3</b>: For responsive design and built-in components.</li> <li><b>Google Fonts</b>: For custom fonts.</li> </ul>

Usage
Search for recipes: Use the search bar to find recipes by typing in a keyword. The app will display relevant recipes matching the title, description, or ingredients.

Apply filters: Use the dropdowns for Ingredients, Appliances, and Utensils to narrow down your search. The filters will update dynamically based on the remaining available options after your initial search.

Tagging system: Click on the dropdown options to add them as tags. Tags allow for more refined filtering. You can also remove tags by clicking the "x" button next to each tag.

View recipes: The filtered recipes will be displayed as cards with details such as preparation time, ingredients, and instructions.

Key Files
<table> <thead> <tr> <th>File</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td><code>index.html</code></td> <td>The main entry point of the web application. It includes the layout of the page, links to stylesheets, and scripts.</td> </tr> <tr> <td><code>app.js</code></td> <td>The core logic for the app, including handling user input (searching and filtering), tag management, and rendering recipes.</td> </tr> <tr> <td><code>dropdownUtils.js</code></td> <td>Utility functions for filtering and updating the dropdown menus based on user input.</td> </tr> <tr> <td><code>filterUtils.js</code></td> <td>Contains logic for advanced filtering based on selected tags and dropdown options.</td> </tr> <tr> <td><code>RecipeCardFactory.js</code></td> <td>A class that generates the HTML structure for displaying each recipe.</td> </tr> <tr> <td><code>tagUtils.js</code></td> <td>Manages the creation, addition, and removal of tags in the UI.</td> </tr> <tr> <td><code>uiUtils.js</code></td> <td>Handles updating the UI, displaying error messages, and managing the recipe count display.</td> </tr> </tbody> </table>


