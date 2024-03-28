// const { default: Swiper } = require("swiper")
gsap.registerPlugin(ScrollTrigger)

const header = document.getElementById('header') 
const banner = document.querySelector('.banner1')
const footer = document.getElementById('footer')

let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
)

const locoScroll = new LocomotiveScroll({
    el: document.querySelector('.locomotive-scroll'),
    smooth: true,
    getDirection: true,  
    tablet: {
        smooth: false,
        breakpoint: 0,
        getDirection: true,
    }     
})
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(".locomotive-scroll", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector(".locomotive-scroll").style.transform ? "transform" : "fixed"
});
locoScroll.on('scroll',(instance)=>{  
    const header = document.getElementById('header');
    let headerHeight = header.getBoundingClientRect().height;        
    if(instance.direction === 'down'){
        header.classList.add('down')
    } else{
        header.classList.remove('down')
    } 

    var scrTop = scrollHeight - window.innerHeight - footer.offsetHeight  
    if(scrTop<0){
        document.querySelector('.qAside').classList.add('hv')
    } else{
        document.querySelector('.qAside').classList.remove('hv') 
    }
    console.log(scrTop)
})



function headerHide(){
    if(document.documentElement.scrollTop>0){
        header.style.transform= `translateY(-100px)`
    }
}
function headerMove(e){
    if(e.deltaY>0){
        header.style.transform= `translateY(-100px)` 
    }else{
        header.style.transform= `translateY(0)` 
    }
}







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


function modelSlide(){
    let swiperSlides = document.querySelectorAll('swiper2 .swiper-slide')

    let swiper = new Swiper('.swiper2',{
        slidePerView:1,
        loop: false,
	    effect: "coverflow",
	    centeredSlides: true,
	    spaceBetween: 500,
	    coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 400,
		modifier: 1,
		slideShadows: false
	    },
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


function communitySlide(){
    var option = {
        slidesPerView: "auto",
        spaceBetween: 20,
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },    
    }
    var communitySwiper = new Swiper(".swiper3", option);
   
}

function communityMo(){
    const horizontalSections = gsap.utils.toArray('.horizontalDty');   
    horizontalSections.forEach(function (sec, i) {	
        var thisPinWrap = sec.querySelector('.staticw');
        var thisAnimWrap = thisPinWrap.querySelector('.swiper-wrapper');      
        var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth + staticWht);
        var staticWht = (window.innerWidth - thisPinWrap.clientWidth);
        gsap.fromTo(thisAnimWrap, { 
            x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()}, { 
            x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0, 
            ease: "none",
            scrollTrigger: {
                trigger: sec,	
                scroller:".locomotive-scroll",	
                start: "top top",
                end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth + staticWht),                
                pin: thisPinWrap,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                scrub: true,                
            }
        });
    });
}   

function banner1Act(){
    ScrollTrigger.create({        
        start: 'top -100',
        trigger:'.banner',
        end: '+=50%',
        scroller:".locomotive-scroll",
        pin: '.banner1',
        pinSpacing: false,
        pinType: 'transform',        
    })
    gsap.to('.banner1__pin',{
        duration:2,
        opacity:0,
        scrollTrigger:{
            //pin:true,
            scroller:".locomotive-scroll",
            trigger:'.banner2',
            pinType: 'transform',
            start: 'top 55%',
            end: 'top top',
            scrub:true,
            //markers: true,
        }
    })
    gsap.to('.banner1__left',{
        duration:2,
        paddingBottom:'100px',
        scrollTrigger:{
            //pin:true,
            scroller:".locomotive-scroll",
            trigger:'.banner2',
            pinType: 'transform',
            start: 'top 55%',
            end: 'top top',
            scrub:true,
            //markers: true,
        }
    })
}
function eventHandler(){
    headerHide()
    banner1Act()
    mainSlide()
    modelSlide()
    communitySlide()
    communityMo()

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());      
    ScrollTrigger.refresh();
}
window.addEventListener('load',eventHandler)
window.addEventListener('wheel',headerMove)