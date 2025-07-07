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

    timersModalsButton.addEventListener('click', () => {
        //loadTimers();
        modal.classList.add('show');
        timerModal.style.display = 'block';
    });
    editNameModalButton.addEventListener('click', () => {
        //loadTimers();
        modal.classList.add('show');
        editNameModal.style.display = 'block';
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





});