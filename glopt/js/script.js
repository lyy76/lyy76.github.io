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

time_is_widget.init({ Kyiv_TV_Tower_z700: { template: "TIME<br>DATE", date_format: "dayname daynum.monthnum.yy" } });

$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.carousel__blog, .carousel__mini, .carousel__minick',
        prevArrow: '<button type="button"class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>'
    });
    $('.carousel__blog').slick({
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.carousel__inner',
        centerMode: false,
        focusOnSelect: true,
        arrows: false,
        autoplay: false,
        pauseOnHover: true
    });
    $('.carousel__mini').slick({
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.carousel__inner',
        centerMode: false,
        focusOnSelect: true,
        arrows: false,
        autoplay: false,
        pauseOnHover: true
    });
    $('.carousel__minick').slick({
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.carousel__inner',
        centerMode: false,
        focusOnSelect: true,
        arrows: false,
        autoplay: false,
        pauseOnHover: true
    });
});

//Modal

$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
});

$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});

$('.price__delivery-btn').each(function (i) {
    $(this).on('click', function () {
        $('#order .modal__descr').text($('.price__delivery-title').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    })
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

// Smooth scroll and pageup

$(window).scroll(function () {
    if ($(this).scrollTop() > 1400) {
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