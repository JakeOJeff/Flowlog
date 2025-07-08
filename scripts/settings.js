document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('theme-selection');
    const root = document.documentElement.style;
    const editNameText = document.getElementById('editNameText');

    selector.addEventListener('change', () => {

        const root = document.documentElement;
        const theme = selector.value;

        const themeStyles = {
            diva: {
                '--button': '#c16460',
                '--button-hover': '#dc8f89',
                '--button-shadow': '#b85a56',
                '--main-bg': '#f9e4e4',
                '--container-bg': '#e79d9d',
                '--heading-big': '#9c4b44',
                '--heading-small': '#a85e59',
                '--paragraph': '#5d2e29',
                '--hyperlink': '#6e3b36',
                '--hyperlink-hover': '#8e534e',
                '--timer-text-color': '#ffffff',
                '--input-box': '#d37777',
                '--input-box-hover': '#dc8c8c',
                '--task-card-bg': '#e9b3b3',
                '--font': 'Quicksand',
                '--level-1': '#dec2c1',
                '--level-2': '#dea7a4',
                '--level-3': '#de9490',
                '--level-4': '#e07872',
                '--ico-color': 'hue-rotate(325deg) saturate(1.5) brightness(1.1)',
            },
            'amber-dusk': {
                '--button': '#7e8f5a',
                '--button-hover': '#94a368',
                '--button-shadow': '#6b7a4b',
                '--main-bg': '#fae7d4',
                '--container-bg': '#efd3a7',
                '--heading-big': '#9a5920',
                '--heading-small': '#c9915a',
                '--paragraph': '#8b6044',
                '--hyperlink': '#a56742',
                '--hyperlink-hover': '#c98d64',
                '--timer-text-color': '#7a3f26',
                '--input-box': '#ddb280',
                '--input-box-hover': '#f2c397',
                '--task-card-bg': '#f3d6b2',
                '--font': 'Quicksand',
                '--level-1': '#f7d7b4',
                '--level-2': '#e8b883',
                '--level-3': '#c48e5a',
                '--level-4': '#8a5a33',
                '--ico-color': 'hue-rotate(38deg) saturate(1.3)',
            },
            wooden: {
                '--button': '#7b5e3b',
                '--button-hover': '#8f6e48',
                '--button-shadow': '#6e5436',
                '--main-bg': '#f5e4cc',
                '--container-bg': '#e2c9a3',
                '--heading-big': '#5a3c1f',
                '--heading-small': '#b88b5a',
                '--paragraph': '#8b6f55',
                '--hyperlink': '#a97450',
                '--hyperlink-hover': '#c89d77',
                '--timer-text-color': '#5a3c1f',
                '--input-box': '#d8b892',
                '--input-box-hover': '#e6c8a4',
                '--task-card-bg': '#e8caa6',
                '--font': 'Quicksand',
                '--level-1': '#dbc1ac',
                '--level-2': '#c8a87e',
                '--level-3': '#a7794a',
                '--level-4': '#7b4a2b',
                '--ico-color': 'hue-rotate(25deg) saturate(1.2)',
            },
            forest: {
                '--button': '#4d774e',
                '--button-hover': '#5f8f62',
                '--button-shadow': '#3a5f3c',
                '--main-bg': '#e8f5e9',
                '--container-bg': '#c8e6c9',
                '--heading-big': '#2e7d32',
                '--heading-small': '#66bb6a',
                '--paragraph': '#4e674f',
                '--hyperlink': '#558b2f',
                '--hyperlink-hover': '#7cb342',
                '--timer-text-color': '#1b5e20',
                '--input-box': '#a5d6a7',
                '--input-box-hover': '#b9e4bb',
                '--task-card-bg': '#dcedc8',
                '--font': 'Segoe UI',
                '--level-1': '#d0f0c0',
                '--level-2': '#9ccc65',
                '--level-3': '#66bb6a',
                '--level-4': '#2e7d32',
                '--ico-color': 'hue-rotate(90deg) saturate(1.4)',
            },
            night: {
                '--button': '#4a4e69',
                '--button-hover': '#5c5f7a',
                '--button-shadow': '#343654',
                '--main-bg': '#1a1a2e',
                '--container-bg': '#25294a',
                '--heading-big': '#f8f8ff',
                '--heading-small': '#b0b4d8',
                '--paragraph': '#c7c9e2',
                '--hyperlink': '#a0b0ff',
                '--hyperlink-hover': '#ccd4ff',
                '--timer-text-color': '#ffffff',
                '--input-box': '#343a58',
                '--input-box-hover': '#3f4565',
                '--task-card-bg': '#2b2f4a',
                '--font': 'Montserrat',
                '--level-1': '#3f3f74',
                '--level-2': '#5051a4',
                '--level-3': '#7a80ff',
                '--level-4': '#c3c6ff',
                '--ico-color': 'hue-rotate(220deg) saturate(1.6)',
            },
            dark: {
                '--button': '#333333',
                '--button-hover': '#4d4d4d',
                '--button-shadow': '#1f1f1f',
                '--main-bg': '#121212',
                '--container-bg': '#1e1e1e',
                '--heading-big': '#f5f5f5',
                '--heading-small': '#aaaaaa',
                '--paragraph': '#cccccc',
                '--hyperlink': '#82aaff',
                '--hyperlink-hover': '#a0cfff',
                '--timer-text-color': '#ffffff',
                '--input-box': '#2a2a2a',
                '--input-box-hover': '#3a3a3a',
                '--task-card-bg': '#1c1c1c',
                '--font': 'Inter',
                '--level-1': '#cccccc',
                '--level-2': '#999999',
                '--level-3': '#666666',
                '--level-4': '#444444',
                '--ico-color': 'hue-rotate(0deg) saturate(0.5) brightness(1.1)',
            },
            ocean: {
                '--button': '#007b8a',              // deep sea teal
                '--button-hover': '#00a0b0',        // lighter tropical blue
                '--button-shadow': '#005f66',       // deeper ocean

                '--main-bg': '#fef9f0',             // warm sand-tinted white
                '--container-bg': '#e5f6f8',        // soft aqua with beach tint

                '--heading-big': '#004d40',         // ocean navy green
                '--heading-small': '#00796b',       // tropical surf green
                '--paragraph': '#5b4736',           // driftwood brown
                '--hyperlink': '#007b8a',           // ocean link
                '--hyperlink-hover': '#00bdd6',     // wave shimmer

                '--timer-text-color': '#004851',    // deep sea text

                '--input-box': '#e2c79d',           // darker sandy tan
                '--input-box-hover': '#f0d5aa',     // warm golden hover (lighter but still visible)

                '--task-card-bg': '#e0f2f1',        // soft seafoam

                '--font': 'Poppins',

                '--level-1': '#fff7e6',             // light sand
                '--level-2': '#ffe3b3',             // warm tan
                '--level-3': '#00acc1',             // aqua blue
                '--level-4': '#006064',             // deep ocean

                '--ico-color': 'hue-rotate(170deg) saturate(1.3) brightness(1)',
            },


        };

        if (themeStyles[theme]) {
            Object.entries(themeStyles[theme]).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
            localStorage.setItem('selected-theme', theme);
        }

    });

    chrome.storage.local.get('savedName', (data) => {
        const name = data.savedName || 'User';
        editNameText.textContent = `Name: ${name}`;
    });

    editNameText.addEventListener('click', () => {
        const newName = prompt('Enter your name:');
        if (newName) {
            // Save the new name to localStorage or wherever you store it

            // Optionally update the UI immediately
            editNameText.textContent = `Name: ${newName}`;

            chrome.storage.local.set({ savedName: newName });

        }
    });
    // Restore theme on load
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
        selector.value = savedTheme;
        selector.dispatchEvent(new Event('change'));
    }
});