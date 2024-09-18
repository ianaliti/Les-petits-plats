// File: tagUtils.js
export function addTag(tagText, selector, selectedTags, tagContainerUnified, removeTagCallback, updateFiltersCallback) {
    if (!selectedTags.includes(tagText)) {
        selectedTags.push(tagText);
        
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.innerHTML = `<span>${tagText}</span><button>x</button>`;
        
        tagElement.querySelector('button').addEventListener('click', () => removeTagCallback(tagText, tagElement, selector));

        tagContainerUnified.appendChild(tagElement);

        removeOptionFromDropdown(tagText, selector);
        
        updateFiltersCallback();

        return true; // Tag added
    }
    return false; // Tag already exists
}

export function removeTag(tagText, tagElement, selector, selectedTags, tagContainerUnified, addOptionToDropdownCallback, updateFiltersCallback) {
    selectedTags = selectedTags.filter(tag => tag !== tagText);
    tagContainerUnified.removeChild(tagElement);

    addOptionToDropdownCallback(tagText, selector);
    
    updateFiltersCallback();

    return selectedTags; // Return updated selectedTags
}

export function removeOptionFromDropdown(tagText, selector) {
    const dropdownContainer = document.querySelector(selector);
    const options = Array.from(dropdownContainer.children);

    const optionToRemove = options.find(option => option.textContent.trim() === tagText.trim());
    if (optionToRemove) {
        dropdownContainer.removeChild(optionToRemove);
    }
}

export function addOptionToDropdown(tagText, selector, addTagCallback) {
    const dropdownContainer = document.querySelector(selector);
    const option = document.createElement('li');
    option.textContent = tagText;
    option.classList.add('dropdown-item');
    option.addEventListener('click', () => addTagCallback(tagText, selector));

    dropdownContainer.appendChild(option);
}