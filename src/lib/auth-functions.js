import { signOut } from './session';

// Global signOut function for use in HTML onclick attributes
window.signOut = async function() {
  const success = await signOut();
  if (success) {
    window.location.href = '/';
  }
};