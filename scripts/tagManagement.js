import { filterRecipesByTags } from './filterTag.js';
import { removeOptionFromDropdown, addOptionToDropdown } from './domUtils.js';

// DOM element for the unified tag container
const tagContainerUnified = document.querySelector('.tag-container-unified');

// Array to store the currently selected tags
let selectedTags = [];

/**
 * Function to add a tag when clicked from a dropdown list
 * @param {string} tagText - The text of the tag being added
 * @param {string} selector - The dropdown selector to remove the tag from
 */

export function addTag(tagText, selector) {
    if (!selectedTags.includes(tagText)) {
        selectedTags.push(tagText); // Add tag to the selected tags array

        // Create the tag element
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.innerHTML = `<span>${tagText}</span><button>x</button>`;

        // Add event listener to remove tag when the 'x' button is clicked
        tagElement.querySelector('button').addEventListener('click', () => removeTag(tagText, tagElement, selector));
        tagContainerUnified.appendChild(tagElement); // Add the tag to the container

        // Remove the selected tag from the dropdown
        removeOptionFromDropdown(tagText, selector);

        // Filter recipes based on selected tags
        filterRecipesByTags();
    }
}

/**
 * Function to remove a tag when the 'x' button is clicked
 * @param {string} tagText - The text of the tag being removed
 * @param {HTMLElement} tagElement - The DOM element representing the tag
 * @param {string} selector - The dropdown selector to add the tag back to
 */
export function removeTag(tagText, tagElement, selector) {
    // Remove tag from selectedTags array
    selectedTags = selectedTags.filter(tag => tag !== tagText);
    // Remove the tag element from the DOM
    tagContainerUnified.removeChild(tagElement);
    // Add the tag back to the dropdown list
    addOptionToDropdown(tagText, selector);
    // Update the recipe list based on remaining tags
    filterRecipesByTags();
}

/**
 * Get the currently selected tags
 * @returns {Array} - Array of selected tags
 */
export function getSelectedTags() {
    return selectedTags;
}
