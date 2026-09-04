(() => {
  const key = 'newent_wholesale_registered';
  const signupPath = '/pages/wholesale-signup';
  const loginPath = '/account/login';

  const isRegistered = () => {
    try { return localStorage.getItem(key) === 'true'; } catch (e) { return false; }
  };

  window.NewentWholesaleAccess = {
    isRegistered,
    markRegistered() {
      try { localStorage.setItem(key, 'true'); } catch (e) {}
    }
  };

  const updateLinks = () => {
    const destination = isRegistered() ? loginPath : signupPath;
    document.querySelectorAll('[data-wholesale-guest-link]').forEach((link) => link.setAttribute('href', destination));
    document.querySelectorAll('[data-wholesale-guest-label]').forEach((label) => {
      label.textContent = isRegistered() ? 'Log in' : 'Apply for Wholesale Access';
    });
  };

  document.addEventListener('DOMContentLoaded', updateLinks);
})();