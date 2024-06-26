window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu_item'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
})

//Modal

$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
});

$('[data-modal=order]').on('click', function () {
    $('.overlay, #order').fadeIn('slow');
});

$('.modal_close').on('click', function () {
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