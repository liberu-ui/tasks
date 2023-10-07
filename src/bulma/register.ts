```typescript
/**
 * Import the necessary modules and components.
 */
import App from '@liberu-ui/ui/src/core/app';
import Tasks from './components/navbar/Tasks.vue';

/**
 * Registers the tasks navbar item to the app.
 * 
 * @param {string} id - The unique identifier for the navbar item.
 * @param {Tasks} component - The Vue component to be rendered in the navbar.
 * @param {number} priority - The priority order of the navbar item.
 * @param {string} countProp - The property name in the navbar item component 
 *                             that provides the count value.
 */
App.registerNavbarItem = (
  id: string,
  component: typeof Tasks,
  priority: number,
  countProp: string
): void => {
  // Implementation logic here
};

export default App;
```
