document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('theme-selection');
  const root = document.documentElement.style;

  selector.addEventListener('change', () => {
    const theme = selector.value;
    if (theme === 'diva') {
      root.setProperty('--button', '#4b6043');
      root.setProperty('--button-hover', '#5a7251');
      root.setProperty('--button-shadow', '#5a7251');
      root.setProperty('--main-bg', '#dce5d0');
      root.setProperty('--container-bg', '#c4d6a4');
      root.setProperty('--heading-big', '#314a2e');
      root.setProperty('--heading-small', '#6b8e6e');
      root.setProperty('--paragraph', '#7a9c78');
      root.setProperty('--timer-text-color', '#314a2e');
    }
    if (theme === 'forest') {
      root.setProperty('--button', '#8c966d');
      root.setProperty('--button-hover', '#9aa27e');
      root.setProperty('--button-shadow', '#9aa27e');
      root.setProperty('--main-bg', '#fbe9d2');
      root.setProperty('--container-bg', '#efd0a8');
      root.setProperty('--heading-big', '#ac682d');
      root.setProperty('--heading-small', '#DEAC80');
      root.setProperty('--paragraph', '#B99470');
      root.setProperty('--timer-text-color', '#ac682d');
    }

    

    // Optionally persist in localStorage
    localStorage.setItem('selected-theme', theme);
  });

  // Restore theme on load
  const savedTheme = localStorage.getItem('selected-theme');
  if (savedTheme) {
    selector.value = savedTheme;
    selector.dispatchEvent(new Event('change'));
  }
});
