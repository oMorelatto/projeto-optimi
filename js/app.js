/* Theme Name: Glamium - Responsive Landing Page Template
   Author: Themesbrand
   Version: 1.0.0
   File Description: Main JS file of the template
*/

// ----- STICKY ----- //

$(window).scroll(function () {
  var scroll = $(window).scrollTop()

  if (scroll >= 50) {
    $('.navbar-sticky').addClass('small')
  } else {
    $('.navbar-sticky').removeClass('small')
  }
})

// ----- SMOOTH LINK ----- //

$('.navigation-menu a,.mouse_down a').on('click', function (event) {
  var $anchor = $(this)

  // Verifica se o link tem um hash (#)
  if ($anchor.attr('href').charAt(0) === '#') {
    // Impede a ação padrão do link
    event.preventDefault()

    // Verifica se o hash aponta para uma seção na mesma página
    if ($($anchor.attr('href')).length) {
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr('href')).offset().top - 0
          },
          1500,
          'easeInOutExpo'
        )
    }
  }
})

// ----- MAGNIFICPOPUP ----- //

$('.mfp-image').magnificPopup({
  type: 'image',
  closeOnContentClick: true,
  mainClass: 'mfp-fade',
  gallery: {
    enabled: true,
    navigateByImgClick: true,
    preload: [0, 1]
  }
})

// ----- PORTFOLIA FILTER ----- //
$(window).on('load', function () {
  var $container = $('.projects-wrapper')
  var $filter = $('#filter')

  $container.isotope({
    filter: '*',
    layoutMode: 'masonry',
    animationOptions: {
      duration: 750,
      easing: 'linear'
    }
  })
  // Filter items when filter link is clicked
  $filter.find('a').click(function () {
    var selector = $(this).attr('data-filter')
    $filter.find('a').removeClass('active')
    $(this).addClass('active')
    $container.isotope({
      filter: selector,
      animationOptions: {
        animationDuration: 750,
        easing: 'linear',
        queue: false
      }
    })
    return false
  })
})

// ----- TYPED ----- //

$('.element').each(function () {
  var $this = $(this)
  var additionalText = 'Mais econômico' // Novo texto a ser adicionado

  var strings = $this.attr('data-elements').split(',')
  strings.push(additionalText) // Adiciona o novo texto ao array de strings

  $this.typed({
    strings: strings,
    typeSpeed: 150, // velocidade de digitação
    backDelay: 1300 // pausa antes de apagar
  })
})

// ----- SCROLLSPY ----- //
$('.navbar-nav').scrollspy({
  offset: 20
})

// ----- SCROLLSPY ----- //
$('#navigation').scrollspy({
  offset: 50
})

// ----- COUNTER ----- //
var a = 0
$(window).scroll(function () {
  var oTop = $('#counter').offset().top - window.innerHeight
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function () {
      var $this = $(this),
        countTo = $this.attr('data-count')
      $({
        countNum: $this.text()
      }).animate(
        {
          countNum: countTo
        },

        {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum))
          },
          complete: function () {
            $this.text(this.countNum)
            //alert('finished');
          }
        }
      )
    })
    a = 1
  }
})

// ----- TOGGLE SCROLLTOP ----- //
$('.navbar-toggle').on('click', function (event) {
  $(this).toggleClass('open')
  $('#navigation').slideToggle(400)
})

$('.navigation-menu>li').slice(-2).addClass('last-elements')

$('.submenu-arrow').on('click', function (e) {
  if ($(window).width() < 992) {
    e.preventDefault()
    $(this)
      .parent('li')
      .toggleClass('open')
      .find('.submenu:first')
      .toggleClass('open')
  }
})

// ----- DROPDOWN MENU ----- //
$('.has-submenu').on('click', function () {
  if ($(window).width() >= 992) return // Desativa o dropdown para telas maiores que 992px

  $(this).toggleClass('open').find('.submenu:first').toggleClass('open')
})

// ----- SHOW HIDDEN MENU ON # SERVICE CLICK ----- //
$('.navigation-menu a').on('click', function (event) {
  var $anchor = $(this)

  // Verifica se o link tem um hash (#)
  if ($anchor.attr('href') === '#') {
    // Impede a ação padrão do link
    event.preventDefault()

    // Ativa o menu oculto
    $('.navbar-toggle').addClass('open')
    $('#navigation').slideDown(400)
  } else if ($anchor.attr('href').charAt(0) === '#') {
    // Verifica se o hash aponta para uma seção na mesma página
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr('href')).offset().top - 0
        },
        1500,
        'easeInOutExpo'
      )
  } else {
    // Código original de smooth scroll
    var $anchor = $(this)

    if ($anchor.attr('href').charAt(0) === '#') {
      event.preventDefault()

      if ($($anchor.attr('href')).length) {
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop: $($anchor.attr('href')).offset().top - 0
            },
            1500,
            'easeInOutExpo'
          )
      }
    }
  }
})

// ----- CONTECT ----- //

$('#contact-form').submit(function () {
  var action = $(this).attr('action')
  $('#message').slideUp(750, function () {
    $('#message').hide()

    $('#submit').before('').attr('disabled', 'disabled')

    $.post(
      action,
      {
        name: $('#name').val(),
        email: $('#email').val(),
        comments: $('#comments').val()
      },
      function (data) {
        document.getElementById('message').innerHTML = data
        $('#message').slideDown('slow')
        $('#cform img.contact-loader').fadeOut('slow', function () {
          $(this).remove()
        })
        $('#submit').removeAttr('disabled')
        if (data.match('success') != null) $('#cform').slideUp('slow')
      }
    )
  })

  return false
})
