const hamburger = document.querySelector('.hamburger'),
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
    $('.carousel').slick({
        speed: 1200,
        prevArrow: '<button type="button"class="slick-prev"><img src="icons/left_mini.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right_mini.svg"></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('.slider__header').slick({
        speed: 1200,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button"class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 576,
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
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $('.solutions__slider').slick({
        speed: 1200,
        prevArrow: '<button type="button"class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.solutions__tabs').on('click', 'li:not(.solutions__tab_active)', function () {
        $(this)
            .addClass('solutions__tab_active').siblings().removeClass('solutions__tab_active')
            .closest('div.container').find('div.solutions__content').removeClass('solutions__content_active').eq($(this).index()).addClass('solutions__content_active');
    });
});

//Modal

$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
});

$('[data-modal=order]').on('click', function () {
    $('.overlay, #order').fadeIn('slow');
});

$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
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
                required: "введите свое имя",
                minlength: jQuery.validator.format("Введите {0} символа!")
            },
            phone: "введите свой номер",
            email: {
                required: "введите свою почту",
                email: "email в формате name@domain.com"
            }
        }
    });
};

/* validateForms('#consultation-form');
validateForms('#write-form'); */
validateForms('#consultation form');
validateForms('#order form');

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
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
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
