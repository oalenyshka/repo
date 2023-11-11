//кнопка скролла наверх
$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } 
        else {
            $('#toTop').fadeOut();
        }
    }); 
    $('#toTop').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
});

//изменение хедера при скролле
$(window).scroll(function() {
    if(window.scrollY>100){
        $('.header').addClass('header_scroll');
        $('.header_logo img').attr('src','images/lotus-yoga-scroll.svg');
        $('.header_nav').css('color','#000');
        $('.header_tasks').css('color','#000');
        $('.header_tasks').css('border','1px solid #000');
        $('.mobile_nav_button_icon').addClass('bg_black')
        $('.mobile_nav_wrapper').addClass('mobile_nav_wrapper_scroll');
    }
    else{
        $('.header').removeClass('header_scroll');
        $('.header_logo img').attr('src','images/lotus-yoga-svgrepo-com 1.svg');
        $('.header_nav').css('color','#C9F2D4');
        $('.header_tasks').css('color','#C9F2D4');
        $('.header_tasks').css('border','1px solid #C9F2D4');
        $('.mobile_nav_button_icon').removeClass('bg_black')
        $('.mobile_nav_wrapper').removeClass('mobile_nav_wrapper_scroll');
    }
});

//плавный скролл до якорей
$("a[href^='#']").on("click", function () {
    let href = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(href).offset().top
    });
    return false;
});

//нажатие на меню-бургер, и появление меню
const mobileNavButton = $('.mobile_nav_button');
const mobileNavIcon = $('.mobile_nav_button_icon');
mobileNavButton.on("click", function(){
    if (mobileNavIcon.hasClass('active')){
        mobileNavIcon.removeClass('active');
        $('body').removeClass('no_scroll');
        $('.mobile_nav_wrapper').css('display','none');
        $('.header').css('opacity','');
    }
    else{
        mobileNavIcon.addClass('active');
        $('body').addClass('no_scroll');
        $('.header').css('opacity','.9');
        $('.mobile_nav_wrapper').css('display','flex');
    }
});

$('.m_nav_link').on('click', function(){
    mobileNavIcon.removeClass('active');
    $('body').removeClass('no_scroll');
    $('.mobile_nav_wrapper').css('display','none');
    $('.header').css('opacity','');
});

