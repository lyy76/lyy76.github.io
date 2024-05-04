window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu__item'),
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

$(document).ready(function () {
    $('.promo__slider').slick({
        adaptiveHeight: true,
        speed: 1000,
        prevArrow: '<button type="button"class="slick-prev"><img src="icons/index/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/index/right.svg"></button>'
    });

    $('.reviews__slider').slick({
        speed: 1200,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button"class="slick-prev"><img src="icons/index/left_2.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/index/right_2.svg"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $('.clients__slider').slick({
        speed: 1200,
        adaptiveHeight: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        prevArrow: '<button type="button"class="slick-prev"><img src="icons/index/left_2.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/index/right_2.svg"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }
        ]
    });

});


$(".top__for-item, .our__block, .exhibitor__block, .speaker__block, .events__block").each(function () {
    let more = $(this).find(".top__for-btn, .our__btn, .exhibitor__btn, .speaker__btn, .events__btn");
    let hide = $(this).find(".top__for-content, .our__content, .exhibitor__content, .speaker__content, .events__content");
    hide.hide();
    more.click(function () {
        hide.slideToggle();
        more.text(more.text() == "Hide" ? "Learn more" : "Hide");
    });
});

/* var arVideos = document.getElementsByTagName('video');
for (var i = arVideos.length - 1; i >= 0; i--) {
  var elmVideo = arVideos[i];
  elmVideo.autoplay = false;
}
var v = document.getElementById("movie");
v.onclick = function () {
    if (v.paused) {
        v.play();
    } else {
        v.pause();
    }
}; */

$(document).ready(function () {

    var play_pause = $('.video__playButton'),
        container = $('.video__wrapper'),
        playIcon = $('.video__playButton .video__playPause'),
        video = $('video'),
        play = $('.play'),
        volume = $('.video__volume .video__icon'),
        volumeIntesity = $('.video__volume .video__intensityBar'),
        intensity = $('.video__intensity'),
        progressBar = $('.video__progressBar'),
        progress = $('.video__progressBar .video__progress'),
        timer = $('.video__intialTime'),
        vidDuration = $('.video__fullTime'),
        expandButton = $('.video__scale .video__icons'),
        overlayScreen = $('.video__overlay'),
        timeState = $('.video__time'),
        overlayButton = $('.video__overlay .video__button');


    $(window).resize(function () { resizeVid(); });

    resizeVid();

    updateplayer();

    play_pause.add(video).click(function () { playVid(); });

    progressBar.click(function () { skip(); });

    progressBar.mousemove(function () { timeState.text(getTimeState()); });

    volume.click(function () { toggleMute(); });

    volumeIntesity.click(function () { changeVolume(); });

    expandButton.click(function () { fullScreen(); });

    overlayButton.click(function () { playVid(); });

    vidDuration.text(getFormatedFullTime());


    function playVid() {
        if (video.get(0).paused) {
            video.get(0).play();
            playIcon.css({
                'background': 'url(../icons/index/pause.svg)',
                'background-size': '100% 100%'
            });
            overlayScreen.hide();
            update = setInterval(updateplayer, 1);

        } else {
            video.get(0).pause();
            playIcon.css({
                'background': 'url(../icons/index/play.svg)',
                'background-size': '100% 100%'
            });
            overlayScreen.show();
            clearInterval(update);
        }
    }

    function updateplayer() {
        var percentage = (video[0].currentTime / video[0].duration) * 100;
        progress.css({ 'width': percentage + '%' });
        timer.text(getFormatedTime());
        vidDuration.text(getFormatedFullTime());

        if (video[0].ended) {
            playIcon.css({
                'background': 'url(../icons/index/play.svg)',
                'background-size': '100% 100%'
            });
            overlayScreen.show();
            overlayButton.css({
                'background': 'url(../icons/index/replay-button.svg)',
                'background-size': '100% 100%'
            });
        } else if (video[0].paused) {
            overlayButton.css({
                'background': 'url(../icons/index/btnplay.svg)',
                'background-size': '100% 100%'
            });
        }
    }

    function getTimeState() {

        var mouseX = event.pageX - progressBar.offset().left,
            width = progressBar.outerWidth();

        var currentSeconeds = Math.round((mouseX / width) * video[0].duration);
        var currentMinutes = Math.floor(currentSeconeds / 60);

        if (currentMinutes > 0) {
            currentSeconeds -= currentMinutes * 60;
        }
        if (currentSeconeds.toString().length === 1) {
            currentSeconeds = "0" + currentSeconeds;
        }
        if (currentMinutes.toString().length === 1) {
            currentMinutes = "0" + currentMinutes;
        }

        timeState.css('left', (mouseX / width) * progressBar.width() + 18 + 'px');

        return currentMinutes + ':' + currentSeconeds;

    }

    function skip() {
        var mouseX = event.pageX - progressBar.offset().left,
            width = progressBar.outerWidth();
        video[0].currentTime = (mouseX / width) * video[0].duration;
        updateplayer();
    }

    function getFormatedFullTime() {

        var totalSeconeds = Math.round(video[0].duration);
        var totalMinutes = Math.floor(totalSeconeds / 60);
        if (totalMinutes > 0) {
            totalSeconeds -= totalMinutes * 60;
        }
        if (totalSeconeds.toString().length === 1) {
            totalSeconeds = "0" + totalSeconeds;
        }
        if (totalMinutes.toString().length === 1) {
            totalMinutes = "0" + totalMinutes;
        }
        return totalMinutes + ':' + totalSeconeds;
    }

    function getFormatedTime() {
        var seconeds = Math.round(video[0].currentTime);
        var minutes = Math.floor(seconeds / 60);

        if (minutes > 0) {
            seconeds -= minutes * 60;
        }
        if (seconeds.toString().length === 1) {
            seconeds = "0" + seconeds;
        }
        if (minutes.toString().length === 1) {
            minutes = "0" + minutes;
        }
        return minutes + ':' + seconeds;
    }

    function toggleMute() {
        if (!video[0].muted) {
            video[0].muted = true;
            volume.css({
                'background': 'url(../icons/index/mute.svg)',
                'background-size': '100% 100%'
            });
            intensity.hide();
        } else {
            video[0].muted = false;
            volume.css({
                'background': 'url(../icons/index/volume.svg)',
                'background-size': '100% 100%'
            });
            intensity.show();
        }
    }

    function changeVolume() {
        var mouseX = event.pageX - volumeIntesity.offset().left,
            width = volumeIntesity.outerWidth();

        video[0].volume = (mouseX / width);
        intensity.css('width', (mouseX / width) * width + 'px');
        video[0].muted = false;
        volume.css({
            'background': 'url(../icons/index/volume.svg)',
            'background-size': '100% 100%'
        });
        intensity.show();
    }

    function fullScreen() {
        if (video[0].requestFullscreen) {
            video[0].requestFullscreen();
        } else if (video[0].webkitRequestFullscreen) {
            video[0].webkitRequestFullscreen();
        } else if (video[0].mozRequestFullscreen) {
            video[0].mozRequestFullscreen();
        } else if (video[0].msRequestFullscreen) {
            video[0].msRequestFullscreen();
        } else {
            video.dblclick(function () { fullScreen(); });
        }

    }

    function resizeVid() {
        if (container.width() < 600) {
            container.addClass('small');
        } else {
            container.removeClass('small');
        }
    }

    $(window).keypress(function (e) {
        if (e.keyCode === 0 || e.keyCode === 32) {
            e.preventDefault()
            playVid();
        }
    });

    for (var i = 0, l = videos.length; i < l; i++) {
        var video = videos[i];
        var src = video.src || (function () {
            var sources = video.querySelectorAll("source");
            for (var j = 0, sl = sources.length; j < sl; j++) {
                var source = sources[j];
                var type = source.type;
                var isMp4 = type.indexOf("mp4") != -1;
                if (isMp4) return source.src;
            }
            return null;
        })();
        if (src) {
            var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
            if (isYoutube) {
                var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
                id = (id.length > 1) ? id.splice(1) : id;
                id = id.toString();
                var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
                video.src = mp4url + id;
            }
        }
    }

});


function showSingleDiv(selector) {
    const prevBlockEl = document.querySelector('.our__blocks.our__blocks_active'),
        currBlockEl = document.querySelector(selector);
    if (!currBlockEl || prevBlockEl === currBlockEl) return;
    prevBlockEl && prevBlockEl.classList.remove('our__blocks_active');
    currBlockEl.classList.add('our__blocks_active');
};

function openSponsor(evt, sponsorName) {
    var i, our__tabcontent, tablink;
    our__tabcontent = document.getElementsByClassName("our__tabcontent");
    for (i = 0; i < our__tabcontent.length; i++) {
        our__tabcontent[i].style.display = "none";
    }
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }
    document.getElementById(sponsorName).style.display = "block";
    evt.currentTarget.className += "our__tabcontent_active";
};

function openForums(evt, forumsName) {
    var i, exhibitor__tabcontent, tablink;
    exhibitor__tabcontent = document.getElementsByClassName("exhibitor__tabcontent");
    for (i = 0; i < exhibitor__tabcontent.length; i++) {
        exhibitor__tabcontent[i].style.display = "none";
    }
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }
    document.getElementById(forumsName).style.display = "block";
    evt.currentTarget.className += "exhibitor__tabcontent_active";
};

function openForum(evt, forumName) {
    var i, speaker__tabcontent, tablink;
    speaker__tabcontent = document.getElementsByClassName("speaker__tabcontent");
    for (i = 0; i < speaker__tabcontent.length; i++) {
        speaker__tabcontent[i].style.display = "none";
    }
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }
    document.getElementById(forumName).style.display = "block";
    evt.currentTarget.className += "speaker__tabcontent_active";
};


$('[data-modal=order]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
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
            text: {
                required: true,
                minlength: 10
            },
            name_surname: {
                required: true,
                minlength: 6
            },
            your_name: {
                required: true,
                minlength: 2
            },
            name: {
                required: true,
                minlength: 2
            },
            surname: {
                required: true,
                minlength: 2
            },
            company_name: {
                required: true,
                minlength: 2
            },
            company: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            },
            email_contacts: {
                required: true,
                email: true
            },
            email_organizers: {
                required: true,
                email: true
            },
            email_sponsors: {
                required: true,
                email: true
            },
            position: {
                required: true,
                minlength: 2
            },
            country: {
                required: true,
                minlength: 2
            },
            web: {
                required: true,
                url: true
            },
            policy: "required"
        },
        messages: {
            name_surname: {
                required: "enter your first and last name",
                minlength: jQuery.validator.format("Enter {0} character!")
            },
            your_name: {
                required: "enter your name",
                minlength: jQuery.validator.format("Enter {0} character!")
            },
            name: {
                required: "enter your name",
                minlength: jQuery.validator.format("Enter {0} character!")
            },
            surname: {
                required: "enter your surname",
                minlength: jQuery.validator.format("Enter {0} character!")
            },
            phone: "enter your number",
            email: {
                required: "enter your email",
                email: "email in the format name@domain.com"
            },
            email_contacts: {
                required: "enter your email",
                email: "email in the format name@domain.com"
            },
            email_organizers: {
                required: "enter your email",
                email: "email in the format name@domain.com"
            },
            email_sponsors: {
                required: "enter your email",
                email: "email in the format name@domain.com"
            },
            company_name: {
                required: "enter your company name",
                minlength: jQuery.validator.format("Enter {0} character!")
            },
            company: {
                required: "enter your company name",
                minlength: jQuery.validator.format("Enter {0} character!")
            },
            text: {
                required: "your message",
                minlength: jQuery.validator.format("Enter {0} character!")
            },
            position: {
                required: "fill in position",
                minlength: jQuery.validator.format("Enter {0} character!")
            },
            country: {
                required: "indicate the country",
                minlength: jQuery.validator.format("Enter {0} character!")
            },
            web: {
                required: "enter url address",
                url: "url in the format https://"
            },
            policy: "condition is required"
        }
    });
};

validateForms('#consultation form');
validateForms('#contacts-form');
validateForms('#registers-form');

$('input[name=phone]').mask("+42 (999) 999-99-99");


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
        $('#consultation, #contacts-form, #registers-form').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
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