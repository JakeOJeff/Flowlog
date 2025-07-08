document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalButton = document.getElementById('closeModal');
    const modalContent = document.getElementById("modal-content");
    const innerDivs = modalContent.querySelectorAll("div");


    const timersModalsButton = document.getElementById('viewMoreItems');
    const editNameModalButton = document.getElementById('editNameButton');


    // Modals & their Content
    const timerModal = document.getElementById('timerModal');


    const editNameModal = document.getElementById('editNameModal');
    const saveNameButton = document.getElementById('saveNameBtn');
    const editNameInput = document.getElementById('editNameInput');
    const editNameText = document.getElementById('editNameText');

    timersModalsButton.addEventListener('click', () => {
        loadTimers();
        modalOverlay.classList.add('show');
        modal.classList.add('show');

        timerModal.style.display = 'flex';
    });
    editNameModalButton.addEventListener('click', () => {
        //loadTimers();
        modalOverlay.classList.add('show');
        modal.classList.add('show');
        editNameModal.style.display = 'flex';
    });

    closeModalButton.addEventListener('click', () => {

        closeModal()
    });

    modalOverlay.addEventListener('click', (e) => {
        // Close the modal if the overlay is clicked
        if (e.target === modal) {
            closeModal()
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal()
        }
    });


    saveNameButton.addEventListener('click', () => {
        const newName = editNameInput.value.trim();
        if (newName) {
            chrome.storage.local.set({ savedName: newName }, () => {
                editNameText.textContent = `Name: ${newName}`;

            });
            editNameModal.style.display = 'none';
            closeModal();
            editNameInput.value = ''; // Clear the input field
        }
    });

    function closeModal() {
        modalOverlay.classList.remove('show');
        modal.classList.remove('show');
        innerDivs.forEach(div => {
            div.style.display = "none";
        });
    }

    function loadTimers() {
        // Function to load timers from storage and display them in the modal
        chrome.storage.local.get('timers', (data) => {
            const timers = data.timers || [];
            const timerList = document.getElementById('timerList');
            timerList.innerHTML = ''; // Clear existing timers

            if (timers.length === 0) {
                timerList.innerHTML = '<p>No timers recorded yet.</p>';
                return;
            }

            timers.forEach(timer => {
                const timerItem = document.createElement('p');
                timerItem.textContent = `${timer.date} - ${timer.duration} seconds`;
                timerList.appendChild(timerItem);
            });
        });
    }
});