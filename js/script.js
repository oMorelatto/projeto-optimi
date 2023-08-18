$(document).ready(function () {
  // Função para mostrar e esconder o menu oculto
  function toggleMenu() {
    $('.navigation-menu').toggleClass('menu-outros');
  }

  // Clique no botão do menu mobile
  $('.navbar-toggle').on('click', function () {
    toggleMenu();
  });

  // Clique fora do menu mobile para fechá-lo
  $(document).on('click', function (event) {
    const target = $(event.target);
    if (!target.closest('.menu').length && $('.navigation-menu').hasClass('menu-outros')) {
      toggleMenu();
    }
  });

  // Código para tratar o clique no item "Serviços" no menu oculto
  $('.navigation-menu.menu-outros .has-submenu.servicos > a').on('click', function (event) {
    event.preventDefault();
    $('.navigation-menu.menu-outros .has-submenu').removeClass('open');
    $(this).parent('.has-submenu').toggleClass('open');
  });

  // Código para tratar o clique nos outros itens do menu
  $('.navigation-menu.menu-outros .has-submenu').not('.servicos').on('click', function (event) {
    $('.navigation-menu.menu-outros .has-submenu').removeClass('open');
  });
});