// Reset authentication state
console.log('🔄 Resetting authentication state...');

// Clear all possible authentication related items from localStorage
const keysToRemove = [
  'cuddlepur_token',
  'cuddlepur_user', 
  'token',
  'user',
  'authToken',
  'auth_token'
];

keysToRemove.forEach(key => {
  if (localStorage.getItem(key)) {
    console.log(`🗑️  Removing ${key} from localStorage`);
    localStorage.removeItem(key);
  }
});

// Clear all sessionStorage as well
sessionStorage.clear();

console.log('✅ Authentication state reset complete!');
console.log('🔄 Reloading page...');

// Reload the page
location.reload();