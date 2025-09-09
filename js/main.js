
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        var frontPage = document.querySelector('.front-page');
        if (frontPage) frontPage.style.display = 'none';
    }, 6000);

    var menuBtn = document.querySelector('.menu.haburguer');
    var nav = document.querySelector('header nav ul');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function () {
            nav.classList.toggle('menu-ativo');
        });
    }

    var carrinhoBtn = document.querySelector('.button-carrinho button');
    var modal = document.getElementById('modal-1');
    var fecharBtns = modal ? modal.querySelectorAll('[data-micromodal-close], .fechar') : [];

    function abrirModal() {
        if (modal) {
            modal.setAttribute('aria-hidden', 'false');
            modal.classList.add('is-open');
        }
    }
    function fecharModal() {
        if (modal) {
            modal.setAttribute('aria-hidden', 'true');
            modal.classList.remove('is-open');
        }
    }
    if (carrinhoBtn) {
        carrinhoBtn.addEventListener('click', abrirModal);
    }
    fecharBtns.forEach(function (btn) {
        btn.addEventListener('click', fecharModal);
    });  
    
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) fecharModal();
        });
    }
});
