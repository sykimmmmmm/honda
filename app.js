// const { default: Swiper } = require("swiper")

const header = document.getElementById('header') 
const banner = document.querySelector('.banner1')





















function bannerHide(elem){
    let distanceToTop = window.pageYOffset+elem.getBoundingClientRect().top
    let elemHeight = elem.offsetHeight
    let scrollTop = document.documentElement.scrollTop
    let opacity = 1
    // console.log(distanceToTop, elemHeight,scrollTop)

    if(scrollTop>distanceToTop){
        opacity = 1-(scrollTop-distanceToTop)/elemHeight
        // console.log(opacity)
    }
    if(opacity>=0){
        banner.style.opacity=opacity
    }
    
}

function headerMove(e){
    // console.log(e.deltaY)
    if(e.deltaY>0){
        header.style.transform= `translateY(-100px)` 
    }else{
        header.style.transform= `translateY(0)` 
    }
}


function scrollHandler(){
    bannerHide(banner)
}






window.addEventListener('wheel',headerMove)
window.addEventListener('scroll',scrollHandler)




//swipe.js
function mainSlide(){
    var swiperSlides = document.querySelectorAll('.swiper .swiper-slide')
    var swiperPagination = document.querySelector('.swiper .swiper-pagination')
    var swiperNextButton = document.querySelector('.swiper .swiper-button-next')
    var swiperPrevButton = document.querySelector('.swiper .swiper-button-prev')
    let options={}
    var timeout=null;
    function next() {
                swiper.slideNext()
            }
    function runNext() {
                timeout = setTimeout(function () {
                    next()
                }, 3000)
    }
    if (swiperSlides.length == 1) {
        options = {
            slidePerView:1,
            spaceBetween: 0,
            centeredSlides: true,
            effect: "fade",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                init: function () {
                    var currentVideo = document.querySelector("[data-swiper-slide-index='" + this.realIndex + "'] video")
                    var currentImg = document.querySelector("[data-swiper-slide-index='" + this.realIndex + "'] img")
                    if(currentVideo.currentTime===currentVideo.duration){
                        swiper.slideNext()
                    }
                    if(currentImg)
                        runNext()
                }
            }
        }
    }
    else{
        options = {
            slidePerView:1,
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            effect: "fade",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                init: function () {
                    var currentVideo = document.querySelector("[data-swiper-slide-index='" + this.realIndex + "'] video")
                    var currentImg = document.querySelector("[data-swiper-slide-index='" + this.realIndex + "'] img")
                    console.dir(currentVideo)
                    if(currentVideo.currentTime===currentVideo.duration){
                        swiper.slideNext()
                    }
                    if(currentImg)
                        runNext()
                }
            }
        }
    }
    var swiper = new Swiper(".swiper", options)
    
    var sliderVideos = document.querySelectorAll(".swiper-slide video")
    swiper.on('slideChangeTransitionEnd', function () {
        // Stop all videos
        sliderVideos.forEach(function (video) {
            video.currentTime = 0
        })
        // Get current and previous slide and video inside
        var prevVideo = document.querySelector("[data-swiper-slide-index='" + this.previousIndex + "'] video")
        var currentVideo = document.querySelector("[data-swiper-slide-index='" + this.realIndex + "'] video")
        if (prevVideo) {
            prevVideo.dispatchEvent(new Event('stop'))
        }
        if (currentVideo) {
            currentVideo.play()
        }
        var index = swiper.activeIndex
        var currentSlide = swiper.slides[index]
        var currentSlideType = currentSlide.querySelector('.swiper-bg').dataset.slideType
        clearTimeout(timeout)
        switch (currentSlideType) {
            case 'img':
                runNext()
                break
            case 'vdo':
                if (currentVideo) {
                    currentVideo.currentTime = 0
                    currentVideo.play()
                }
                break
            default:
                // throw new Error('invalid slide type')
        }
        if (currentVideo) {
            currentVideo.addEventListener('ended', function () {
                swiper.slideNext()
            })
        }
    })
}
mainSlide()

function modelSlide(){
    let swiperSlides = document.querySelectorAll('swiper2 .swiper-slide')

    let swiper = new Swiper('.swiper2',{
        slidePerView:1,
        spaceBetween: -50,
        centeredSlides: true,
        loop: true,
        autoplay:false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }

    })
}
modelSlide()