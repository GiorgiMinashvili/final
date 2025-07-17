const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeBtn');

    burger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });