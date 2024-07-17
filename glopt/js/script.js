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

time_is_widget.init({ Odesa_z713: { template: "TIME<br>DATE", date_format: "dayname daynum.monthnum.yy" } });

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

$('[data-modal=calculation]').on('click', function () {
    $('.overlay, #calculation').fadeIn('slow');
});

$('[data-modal=exchanger]').on('click', function () {
    $('.overlay, #exchanger').fadeIn('slow');
});

$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #calculation, #thanks, #order, #exchanger').fadeOut('slow');
});

$('.price__delivery-btn').each(function (i) {
    $(this).on('click', function () {
        $('#order .modal__descr').text($('.price__delivery-title').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    })
});

/* конвертор валют */
document.addEventListener("DOMContentLoaded", () => {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const convertBtn = document.getElementById("convertBtn");
    const amount = document.getElementById("amount");
    const result = document.getElementById("result");
    const loader = document.getElementById("loader");

    // Fetch currency data and populate select options
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then((response) => response.json())
        .then((data) => {
            const currencies = Object.keys(data.rates);
            currencies.forEach((currency) => {
                const option1 = document.createElement("option");
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        });

    // Convert currency
    convertBtn.addEventListener("click", () => {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amountValue = amount.value;

        loader.style.display = "block";
        result.style.display = "none";

        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then((response) => response.json())
            .then((data) => {
                const rate = data.rates[to];
                const convertedAmount = (amountValue * rate).toFixed(2);

                setTimeout(() => {
                    loader.style.display = "none";
                    result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
                    result.style.display = "block";
                }, 1000);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
                loader.style.display = "none";
                result.textContent = "Error fetching data";
                result.style.display = "block";
            });
    });
});

function validateForms(form) {
    $(form).validate({
        rules: {
            services: "required",
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            },
            text: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            services: "сделайте выбор",
            name: {
                required: "введите свое имя",
                minlength: jQuery.validator.format("Введите {0} символа!")
            },
            phone: "введите свой номер",
            email: {
                required: "введите свою почту",
                email: "email в формате name@domain.com"
            },
            text: {
                required: "введите Ваше сообщение",
                minlength: jQuery.validator.format("Enter {0} character!")
            }
        }
    });
};

/* validateForms('#consultation-form');
validateForms('#write-form'); */
validateForms('#consultation form');
validateForms('#calculation form');
validateForms('#order form');
validateForms('#consultation-form');
validateForms('#write-form');

$('input[name=phone]').mask("+38 (999) 999-99-99");

$('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function () {
        $(this).find("input").val("");
        $('#consultation, #calculation, #order').fadeOut();
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