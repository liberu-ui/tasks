/**
 * Import required libraries and components
 */
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

/**
 * Adds the specified icon to the library for further use.
 * 
 * @param icon - The icon to be added to the library
 */
function addIconToLibrary(icon: IconDefinition): void {
  library.add(icon);
}

// Add the "faTasks" icon to the library
addIconToLibrary(faTasks);