document.addEventListener('DOMContentLoaded', () => {

    const timerModal = document.getElementById('timers-modal');
    const openModalButton = document.getElementById('viewMoreItems');
    const closeModalButton = document.getElementById('closeModal');

    openModalButton.addEventListener('click', () => {
        //loadTimers();
        timerModal.classList.add('show');
    });

    closeModalButton.addEventListener('click', () => {
        timerModal.classList.remove('show');
    });


    window.addEventListener('click', (e) => {
        if (e.target === timerModal) {
            timerModal.classList.remove('show');
        }
    })

});