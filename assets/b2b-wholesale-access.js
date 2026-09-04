(() => {
  const key = 'newent_wholesale_registered';
  const signupPath = '/pages/wholesale-signup';
  const loginPath = '/account/login';

  const isRegistered = () => {
    try {
      return localStorage.getItem(key) === 'true';
    } catch (e) {
      return false;
    }
  };

  const markRegistered = () => {
    try {
      localStorage.setItem(key, 'true');
      sessionStorage.setItem(key, 'true');
    } catch (e) {}
  };

  const updateLinks = () => {
    document.querySelectorAll('[data-wholesale-guest-link]').forEach((link) => {
      link.setAttribute('href', isRegistered() ? loginPath : signupPath);
    });
    document.querySelectorAll('[data-wholesale-guest-label]').forEach((label) => {
      label.textContent = isRegistered() ? 'Log in' : 'Apply for Wholesale Access';
    });
  };

  const registrationPage = () => window.location.pathname === signupPath;
  const hasSuccessState = () => {
    const bodyText = document.body ? document.body.innerText.toLowerCase() : '';
    return /registration (has been )?(submitted|successful)|application (has been )?(submitted|successful)|thank you for registering|successfully registered/.test(bodyText);
  };

  const bindRegistrationForm = () => {
    if (!registrationPage()) return;

    const mark = () => {
      markRegistered();
      setTimeout(updateLinks, 50);
    };

    document.addEventListener('submit', (event) => {
      const form = event.target;
      if (!form || !form.matches('form')) return;
      if (form.querySelector('[name="customer[email]"], [name="email"], input[type="email"]') || form.closest('.bss-b2b-registration-form')) {
        mark();
      }
    }, true);

    if (hasSuccessState()) mark();

    const observer = new MutationObserver(() => {
      if (hasSuccessState()) {
        mark();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  window.NewentWholesaleAccess = { isRegistered, markRegistered, updateLinks };

  document.addEventListener('DOMContentLoaded', () => {
    updateLinks();
    bindRegistrationForm();
  });
})();