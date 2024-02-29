const hamburger = document.querySelector('.promo__hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    list = document.querySelector('.menu__list');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

list.addEventListener('click', () => {
    menu.classList.remove('active');
});

$(document).ready(function () {
    $('.yuo__inner').slick({
        dots: true,
        infinite: false,
        arrows: false,
        speed: 1000
    });
    $('.my__inner').slick({
        infinite: false,
        speed: 1000,
        prevArrow: '<button type="button"class="slick-prev"><img src="icons/arrow_1.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_2.svg"></button>'
    });
    $('.services__inner').slick({
        dots: true,
        infinite: false,
        arrows: false,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.reviews__inner').slick({
        dots: true,
        infinite: false,
        arrows: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

$('.services__button').each(function (i) {
    $(this).on('click', function () {

        $('.overlay-blog, #catalog').fadeIn('slow');
    })
});

$('.catalog__close').on('click', function () {
    $('.overlay-blog, #catalog').fadeOut('slow');
});

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.catalog').find('div.catalog-item').removeClass('catalog-item_active').eq($(this).index()).addClass('catalog-item_active');
});
var tabIndex = window.location.hash.replace('#tab', '') - 1;
if (tabIndex != -1) $('ul.catalog__tabs li').eq(tabIndex).click();

$('a[href*=#tab]').click(function () {
    var tabIndex = $(this).attr('href').replace(/(.*)#tab/, '') - 1;
    $('ul.catalog__tabs li').eq(tabIndex).click();
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

$('.reviews__button').each(function (i) {
    $(this).on('click', function () {

        $('.overlay-reviews, #blog').fadeIn('slow');
    })
});

$('.heading__item').each(function (i) {
    $(this).on('click', function () {

        $('.overlay-tab, #blogs').fadeIn('slow');
    })
});

$('.blogs__close').on('click', function () {
    $('.overlay-tab, #blogs').fadeOut('slow');
});

$('.blogs__item').on('click', function () {
    $('.overlay-tab, #blogs').fadeOut('slow');
});

$('ul.blogs__tabs').on('click', 'li:not(.blogs__tab_active)', function () {
    $(this)
        .addClass('blogs__tab_active').siblings().removeClass('blogs__tab_active')
        .closest('div.blogs').find('div.blogs-item').removeClass('blogs-item_active').eq($(this).index()).addClass('blogs-item_active');
});
var tabIndex = window.location.hash.replace('#tab', '') - 1;
if (tabIndex != -1) $('ul.blogs__tabs li').eq(tabIndex).click();

$('a[href*=#tab]').click(function () {
    var tabIndex = $(this).attr('href').replace(/(.*)#tab/, '') - 1;
    $('ul.blogs__tabs li').eq(tabIndex).click();
});

$('.blog__close').on('click', function () {
    $('.overlay-reviews, #blog').fadeOut('slow');
});

$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
});

$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks').fadeOut('slow');
});

function validateForms(form) {
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "enter your name",
                minlength: jQuery.validator.format("Введите {0} символа!")
            },
            phone: "enter your number",
            email: {
                required: "enter your email",
                email: "email in the format name@domain.com"
            }
        }
    });
};

/* validateForms('#consultation-form');
validateForms('#write-form'); */
validateForms('#consultation form');
validateForms('#contacts-form');

$('input[name=phone]').mask("+38 (999) 999-99-99");

$('form').submit(function (e) {
    e.preventDefault();

    /*  if (!$(this).valid()) {
        return;
     } */

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function () {
        $(this).find("input").val("");
        $('#consultation').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.groups').fadeIn();
    } else {
        $('.groups').fadeOut();
    }
});

$("a[href=#blogs]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.group').fadeIn();
    } else {
        $('.group').fadeOut();
    }
});

$("a[href=#catalog]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 1000) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});

$("a[href=#up]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
});

new WOW().init();
