import { supabase } from './supabase';

// Store the current user session
let currentUser = null;
let sessionListener = null;

// Initialize session management
export function initSessionManagement() {
  // Check for existing session on load
  checkSession();
  
  // Listen for auth state changes
  sessionListener = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      currentUser = session?.user || null;
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
    }
    
    // Notify any listeners of the change
    document.dispatchEvent(new CustomEvent('sessionChanged'));
  });
}

// Check if there's a valid session
async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error checking session:', error);
    return;
  }
  
  currentUser = data.session?.user || null;
}

// Get current user
export function getCurrentUser() {
  return currentUser;
}

// Check if user is authenticated
export function isAuthenticated() {
  return currentUser !== null;
}

// Sign out user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    return false;
  }
  
  currentUser = null;
  document.dispatchEvent(new CustomEvent('sessionChanged'));
  return true;
}

// Clean up listener
export function cleanupSessionManagement() {
  if (sessionListener) {
    sessionListener.data.subscription.unsubscribe();
  }
}