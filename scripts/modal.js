document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('modal');
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
        //loadTimers();
        modal.classList.add('show');
        timerModal.style.display = 'flex';
    });
    editNameModalButton.addEventListener('click', () => {
        //loadTimers();
        modal.classList.add('show');
        editNameModal.style.display = 'flex';
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('show');
        innerDivs.forEach(div => {
            div.style.display = "none";
        });
    });


    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('show');
        }
    });


    saveNameButton.addEventListener('click', () => {
        const newName = editNameInput.value.trim();
        if (newName) {
            chrome.storage.local.set({ savedName: newName }, () => {
                editNameText.textContent = `Name: ${newName}`;

            });
            editNameModal.style.display = 'none';
            modal.classList.remove('show');
            editNameInput.value = ''; // Clear the input field
        }
    });



});