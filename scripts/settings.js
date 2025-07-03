document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('theme-selection');
    const root = document.documentElement.style;

    selector.addEventListener('change', () => {

        const theme = selector.value;
        if (theme === 'diva') {

        }
        if (theme === 'amber-dusk') {
            root.setProperty('--button', '#87986a');              // muted sage green
            root.setProperty('--button-hover', '#9ca97d');        // softened lift
            root.setProperty('--button-shadow', '#6d7b52');       // grounding tone

            root.setProperty('--main-bg', '#f9e3cb');             // parchment base
            root.setProperty('--container-bg', '#edd0a2');        // golden tan

            root.setProperty('--heading-big', '#5a3c1f');         // deep amber brown
            root.setProperty('--heading-small', '#d69f6b');       // warm light wood
            root.setProperty('--paragraph', '#a67855');           // soft brown for text
            root.setProperty('--hyperlink', '#b07555');           // natural wood accent
            root.setProperty('--hyperlink-hover', '#d8a179');     // lively glow

            root.setProperty('--timer-text-color', '#944e2d');    // bold amber

            root.setProperty('--input-box', '#e3bb8f');           // light wood grain
            root.setProperty('--input-box-hover', '#f1cba3');     // lightened hover

            root.setProperty('--task-card-bg', '#f0d0ac');        // creamy warmth

            root.setProperty('--font', 'Quicksand');

            // Stat Levels – warm gradient from light amber to burnt wood
            root.setProperty('--level-1', '#f7d7b4');
            root.setProperty('--level-2', '#e8b883');
            root.setProperty('--level-3', '#c48e5a');
            root.setProperty('--level-4', '#8a5a33');
        }

        if (theme === 'wooden') {
            root.setProperty('--button', '#7b5e3b');              // rich wood brown
            root.setProperty('--button-hover', '#8f6e48');        // warmer highlight
            root.setProperty('--button-shadow', '#6e5436');       // deeper shadow tone

            root.setProperty('--main-bg', '#f5e4cc');             // parchment-like background
            root.setProperty('--container-bg', '#e2c9a3');        // soft tan container

            root.setProperty('--heading-big', '#5a3c1f');         // dark walnut for headings
            root.setProperty('--heading-small', '#b88b5a');       // golden wood highlight
            root.setProperty('--paragraph', '#8b6f55');           // soft, warm brown
            root.setProperty('--hyperlink', '#a97450');           // chestnut tone
            root.setProperty('--hyperlink-hover', '#c89d77');     // warm hover

            root.setProperty('--timer-text-color', '#5a3c1f');    // strong dark for contrast

            root.setProperty('--input-box', '#d8b892');           // soft beige input
            root.setProperty('--input-box-hover', '#e6c8a4');     // slightly lighter

            root.setProperty('--task-card-bg', '#e8caa6');        // card matches wood vibe

            root.setProperty('--font', 'Quicksand');

            // Stat level indicators - warm golden gradient
            root.setProperty('--level-1', '#dbc1ac');  // lightest (level 1)
            root.setProperty('--level-2', '#c8a87e');  // level 2
            root.setProperty('--level-3', '#a7794a');  // level 3
            root.setProperty('--level-4', '#7b4a2b');  // darkest, strongest (level 4)
        }

        if (theme === 'forest') {
            root.setProperty('--button', '#4d774e');
            root.setProperty('--button-hover', '#5f8f62');
            root.setProperty('--button-shadow', '#3a5f3c');

            root.setProperty('--main-bg', '#e8f5e9');
            root.setProperty('--container-bg', '#c8e6c9');

            root.setProperty('--heading-big', '#2e7d32');
            root.setProperty('--heading-small', '#66bb6a');
            root.setProperty('--paragraph', '#4e674f');
            root.setProperty('--hyperlink', '#558b2f');
            root.setProperty('--hyperlink-hover', '#7cb342');

            root.setProperty('--timer-text-color', '#1b5e20');

            root.setProperty('--input-box', '#a5d6a7');
            root.setProperty('--input-box-hover', '#b9e4bb');

            root.setProperty('--task-card-bg', '#dcedc8');

            root.setProperty('--font', 'Segoe UI');

            // Stat level indicators - lush green gradient
            root.setProperty('--level-1', '#d0f0c0');  // soft mint/moss (level 1)
            root.setProperty('--level-2', '#9ccc65');  // leaf green
            root.setProperty('--level-3', '#66bb6a');  // vibrant plant green
            root.setProperty('--level-4', '#2e7d32');  // deep forest/jungle green
        }

        if (theme === 'night') {
            root.setProperty('--button', '#4a4e69');
            root.setProperty('--button-hover', '#5c5f7a');
            root.setProperty('--button-shadow', '#343654');

            root.setProperty('--main-bg', '#1a1a2e');
            root.setProperty('--container-bg', '#25294a');

            root.setProperty('--heading-big', '#f8f8ff');           // ghost white
            root.setProperty('--heading-small', '#b0b4d8');
            root.setProperty('--paragraph', '#c7c9e2');
            root.setProperty('--hyperlink', '#a0b0ff');
            root.setProperty('--hyperlink-hover', '#ccd4ff');

            root.setProperty('--timer-text-color', '#ffffff');

            root.setProperty('--input-box', '#343a58');
            root.setProperty('--input-box-hover', '#3f4565');

            root.setProperty('--task-card-bg', '#2b2f4a');

            root.setProperty('--font', 'Montserrat');

            // Stat Levels - cool blue glow
            root.setProperty('--level-1', '#3f3f74');
            root.setProperty('--level-2', '#5051a4');
            root.setProperty('--level-3', '#7a80ff');
            root.setProperty('--level-4', '#c3c6ff');
        }

        if (theme === 'dark') {
            root.setProperty('--button', '#333333');
            root.setProperty('--button-hover', '#4d4d4d');
            root.setProperty('--button-shadow', '#1f1f1f');

            root.setProperty('--main-bg', '#121212');
            root.setProperty('--container-bg', '#1e1e1e');

            root.setProperty('--heading-big', '#f5f5f5');
            root.setProperty('--heading-small', '#aaaaaa');
            root.setProperty('--paragraph', '#cccccc');
            root.setProperty('--hyperlink', '#82aaff');
            root.setProperty('--hyperlink-hover', '#a0cfff');

            root.setProperty('--timer-text-color', '#ffffff');

            root.setProperty('--input-box', '#2a2a2a');
            root.setProperty('--input-box-hover', '#3a3a3a');

            root.setProperty('--task-card-bg', '#1c1c1c');

            root.setProperty('--font', 'Inter');

            // Stat Levels - grayscale brightness
            root.setProperty('--level-1', '#444444');
            root.setProperty('--level-2', '#666666');
            root.setProperty('--level-3', '#999999');
            root.setProperty('--level-4', '#ffffff');
        }


        if (theme === 'ocean') {
            root.setProperty('--button', '#007b8a');              // deep sea teal
            root.setProperty('--button-hover', '#0097a7');        // brighter aqua
            root.setProperty('--button-shadow', '#006064');       // shadowy water

            root.setProperty('--main-bg', '#e0f7fa');             // seafoam background
            root.setProperty('--container-bg', '#b2ebf2');

            root.setProperty('--heading-big', '#004d40');         // deep ocean green
            root.setProperty('--heading-small', '#00796b');
            root.setProperty('--paragraph', '#336e6e');
            root.setProperty('--hyperlink', '#00acc1');
            root.setProperty('--hyperlink-hover', '#4dd0e1');

            root.setProperty('--timer-text-color', '#003c3c');

            root.setProperty('--input-box', '#a7ffeb');
            root.setProperty('--input-box-hover', '#b9fff6');

            root.setProperty('--task-card-bg', '#ccf2f4');

            root.setProperty('--font', 'Poppins');

            // Stat Levels - waves of color
            root.setProperty('--level-1', '#a7ffeb');
            root.setProperty('--level-2', '#4dd0e1');
            root.setProperty('--level-3', '#00acc1');
            root.setProperty('--level-4', '#006064');
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