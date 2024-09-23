<p align="center">Les Petits Plats - Recipe Search & Filter App 🍽️</p>
<p align="center"> <img src="assets/images/logo/Logo-les-petits-plats.png" alt="Les Petits Plats Logo" width="200"/> </p>
Overview
Les Petits Plats is a recipe search and filter web application that allows users to explore a collection of more than 1500 recipes. Users can search by recipe name, ingredient, appliance, or utensil. The app also provides advanced filtering options, enabling users to narrow down recipes based on their preferred criteria and tags.

The project is built using vanilla JavaScript, HTML, CSS, and Bootstrap for styling, with a modular structure for easy maintenance and scalability.

Features
🔍 Search Recipes: Search by recipe name, description, or ingredients using the search bar.
📝 Filter Recipes: Filter recipes based on ingredients, appliances, and utensils via dropdown menus.
🏷️ Tag Management: Add and remove tags for filtering recipes dynamically.
📱 Responsive Design: Built with Bootstrap for mobile-friendly usage.
⚡ Dynamic Recipe Display: Recipes are rendered dynamically based on user input and filters.
Technologies
This project uses the following technologies:

<ul> <li><b>HTML5</b>: For the structure of the web page.</li> <li><b>CSS3</b>: Custom styles along with Bootstrap for responsive design.</li> <li><b>JavaScript (ES6 Modules)</b>: Handles logic for filtering, searching, and rendering UI components.</li> <li><b>Bootstrap 5.3</b>: For responsive design and built-in components.</li> <li><b>Google Fonts</b>: For custom fonts.</li> </ul>
Installation
To get a local copy up and running, follow these simple steps:

1. Clone the repository
bash
Copy code
git clone https://github.com/your-username/les-petits-plats.git
2. Navigate into the project directory
bash
Copy code
cd les-petits-plats
3. Open index.html in your browser
Simply open the index.html file in your browser to start using the application.

Alternatively, you can serve the project locally using a simple server:

bash
Copy code
npx live-server
Usage
Search for recipes: Use the search bar to find recipes by typing in a keyword. The app will display relevant recipes matching the title, description, or ingredients.

Apply filters: Use the dropdowns for Ingredients, Appliances, and Utensils to narrow down your search. The filters will update dynamically based on the remaining available options after your initial search.

Tagging system: Click on the dropdown options to add them as tags. Tags allow for more refined filtering. You can also remove tags by clicking the "x" button next to each tag.

View recipes: The filtered recipes will be displayed as cards with details such as preparation time, ingredients, and instructions.

Folder Structure
plaintext
Copy code
les-petits-plats/
│
├── assets/               # Images and other static files
├── css/                  # Stylesheets
│   └── style.css         # Main CSS file for custom styling
├── data/                 # Data storage
│   └── recipes.js        # Recipes data in JSON-like format
├── scripts/              # JavaScript modules
│   ├── app.js            # Main application logic
│   ├── dropdownUtils.js  # Functions for managing dropdown filters
│   ├── filterUtils.js    # Functions for filtering recipes based on tags
│   ├── RecipeCardFactory.js # Factory class for creating recipe cards
│   ├── searchUtils.js    # Functions for searching recipes
│   ├── tagUtils.js       # Functions for adding/removing tags
│   └── uiUtils.js        # Functions for updating the UI
├── index.html            # Main HTML file
└── README.md             # Project documentation
Key Files
<table> <thead> <tr> <th>File</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td><code>index.html</code></td> <td>The main entry point of the web application. It includes the layout of the page, links to stylesheets, and scripts.</td> </tr> <tr> <td><code>app.js</code></td> <td>The core logic for the app, including handling user input (searching and filtering), tag management, and rendering recipes.</td> </tr> <tr> <td><code>dropdownUtils.js</code></td> <td>Utility functions for filtering and updating the dropdown menus based on user input.</td> </tr> <tr> <td><code>filterUtils.js</code></td> <td>Contains logic for advanced filtering based on selected tags and dropdown options.</td> </tr> <tr> <td><code>RecipeCardFactory.js</code></td> <td>A class that generates the HTML structure for displaying each recipe.</td> </tr> <tr> <td><code>tagUtils.js</code></td> <td>Manages the creation, addition, and removal of tags in the UI.</td> </tr> <tr> <td><code>uiUtils.js</code></td> <td>Handles updating the UI, displaying error messages, and managing the recipe count display.</td> </tr> </tbody> </table>
Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

To contribute:

<ol> <li>Fork the Project</li> <li>Create your Feature Branch (<code>git checkout -b feature/amazing-feature</code>)</li> <li>Commit your Changes (<code>git commit -m 'Add some amazing feature'</code>)</li> <li>Push to the Branch (<code>git push origin feature/amazing-feature</code>)</li> <li>Open a Pull Request</li> </ol>
License
Distributed under the MIT License. See LICENSE for more information.

Additional Styling Tips:
Tables: HTML tables provide a better structure for complex data (as shown in the Key Files section).
Alignment: Use <p align="center"> or <div align="center"> to center elements like images or text.
Images: You can use <img> tags to display logos or screenshots with specified sizes and alignment.
