// public/js/auth-ui.js
// Simple auth UI for Sangeet Hub (vanilla JS).
// Replace localStorage usage with your real auth method (cookies/session) if needed.

(function () {
  function isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  function updateAuthUI() {
    var loginBtn = document.getElementById('loginBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    var auth = isAuthenticated();
    if (loginBtn) loginBtn.style.display = auth ? 'none' : 'inline-block';
    if (logoutBtn) logoutBtn.style.display = auth ? 'inline-block' : 'none';
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateAuthUI();

    var loginBtn = document.getElementById('loginBtn');
    var logoutBtn = document.getElementById('logoutBtn');

    if (loginBtn) {
      loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        // Demo login: set a token. Replace with actual login redirect/modal.
        localStorage.setItem('authToken', 'sangeet-demo-token');
        updateAuthUI();
        // optionally: window.location.href = '/dashboard';
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        // If you have a server logout endpoint, call it here, for example:
        // fetch('/api/logout', { method: 'POST', credentials: 'include' }).finally(function(){ ... });

        // Clear local auth state (or rely on server to clear cookie/session)
        localStorage.removeItem('authToken');
        updateAuthUI();
        // Redirect after logout
        window.location.href = '/';
      });
    }
  });
})();
