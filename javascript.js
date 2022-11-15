var NavButCall = $(".nav-bar-header-button");
var NavContainer = $(".nav-bar-con"); 
var NavConJS = document.querySelector('.nav-bar-con');
var HTMLSel = document.body.parentNode;
var NavBC = document.querySelector('.nav-bar-header-button');


var OpenNav = true;

HTMLSel.addEventListener('click', function(event){
        if(!NavBC.contains(event.target) && !OpenNav){
            console.log('out');
            NavConJS.style.transform =  "translateX(-100%)";
            document.body.style.overflow = "scroll";
            document.body.style.paddingRight = '0px';
            OpenNav = true;
        }
})


NavButCall.click( function(){
    NavPanel();
})

function NavPanel() {
    if(OpenNav){
        NavContainer.css("transform", "translateX(0px)");
        OpenNav = false;
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + "px";
        document.body.style.overflowY = "hidden";
    }else{
        NavContainer.css("transform", "translateX(-100%)");
        OpenNav = true;
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = '0px';
    }
}

$(window).resize(function(){
    NavContainer.css("transform", "translateX(-100%)");
    OpenNav = true;
    if(window.innerWidth > 900){
        NavContainer.css("transform", "translateX(0px)");
        OpenNav = true;
    }
    

    slideMarginRight = slideItems.currentStyle || window.getComputedStyle(slideItems);
    slideWidth = slideItems.getBoundingClientRect().width + parseFloat(slideMarginRight.marginRight);
    SlideX = 0;
    slidePos = 0;
    NPPointer();
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
    slideCon.style.transform = "translateX(" + slidePos + "px)";

})

window.addEventListener('load', function(){
    NPPointer();
})


const slideDis = document.querySelector(".new-product-slide-con");
const slideCon = document.querySelector(".slide-con-inner");
const slideItems = document.querySelector('.new-product-slide');
const slideItemLength = Array.from(document.querySelectorAll('.new-product-slide')).length;
const slideItemSelect = Array.from(document.querySelectorAll('.new-product-slide'));

slideDis.addEventListener("dragstart", (e) => e.preventDefault())

let isClicking = false;

// display //
slideDis.addEventListener("mousedown", touchStart);
slideDis.addEventListener("mouseup", touchEnd);
slideDis.addEventListener("mouseleave", touchEnd);
slideDis.addEventListener("mousemove", touchMove);

// mobile //

slideDis.addEventListener("touchstart", touchStart);
slideDis.addEventListener("touchend", touchEnd);
slideDis.addEventListener("touchmove", touchMove);

let slidePos = 0;
let startX;
let nextX;
var SlideX = 0;
var isPrevent = false


var slideMarginRight = slideItems.currentStyle || window.getComputedStyle(slideItems);
var slideWidth = slideItems.getBoundingClientRect().width + parseFloat(slideMarginRight.marginRight);



function touchStart(e) {
    startX = getPositionX(e);
    isClicking = true;
    slideCon.style.transition = "0s";

}

function touchMove(e){
    nextX = getPositionX(e);
    if(Math.abs(nextX - startX) > 3){
        isPrevent = true;

        if(isClicking){
            slidePos = SlideX + nextX - startX;
            minSliding();
            maxSliding();
            slideCon.style.transform = "translateX(" + slidePos + "px)";
        }
        
    }
    if(isPrevent){
        PreventOff(e);
    }


}

function touchEnd(){
    slidePos = Math.round(slidePos / slideWidth) * slideWidth;
    SlideX = slidePos;
    isClicking = false;

    if(slidePos > 0){
        SlideX = 0;
        slidePos = 0;
    }
    slideCon.style.transition = "0.2s ease-out";
    slideCon.style.transform = "translateX(" + slidePos + "px)";
    NPPointer();
    SlideSteps();

    isPrevent = false;
    

}


function getPositionX(e) {
    return e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  
}

function PreventOff(e){
    if(e.cancelable){
        return e.preventDefault() , e.stopPropagation();
    }
}

window.addEventListener('scroll', function(){
    isClicking = false;
})

function maxSliding(){
    if( - slidePos > (slideItemLength * slideWidth) - slideDis.clientWidth - parseFloat(slideMarginRight.marginRight) + 50){

        slidePos = - (slideItemLength * slideWidth) + slideDis.clientWidth + parseFloat(slideMarginRight.marginRight) - 50;

        SlideX = slidePos;

    }

}

function minSliding(){
    if(slidePos > 50){
        SlideX = 50;
        slidePos = 50;
    }

}

function SlideSteps() {
    if((slideItemLength * slideWidth) - slideDis.clientWidth - parseFloat(slideMarginRight.marginRight) + slidePos <= 0 ){
        slidePos = - ((slideItemLength * slideWidth) - slideDis.clientWidth - parseFloat(slideMarginRight.marginRight));
        SlideX = slidePos;
    }
}

var ProductName = $(".new-product-link");

ProductName.mouseover(function(){
  $(this).attr('title', $(this).text());

})

var NPLeft = document.querySelector('.NP-left');
var NPRight = document.querySelector('.NP-right');

NPLeft.addEventListener('click', function(){
    slidePos += slideWidth;
    if(slidePos >= 0){
        slidePos = 0;
    }
    NPPointer();
    SlideX = slidePos;
    slideCon.style.transform = "translateX(" + slidePos + "px)";
})

NPRight.addEventListener('click', function(){
    slidePos -= slideWidth;
    SlideX = slidePos;
    NPPointer();
    SlideSteps();
    slideCon.style.transform = "translateX(" + slidePos + "px)";
})

function NPPointer(){
    if(slidePos >= 0){
        NPLeft.style.pointerEvents = "none";
        NPLeft.style.color = "#d4d4d4";
    }else{
        NPLeft.style.pointerEvents = "all";
        NPLeft.style.color = "#1e1f29";
    }

    if((slideItemLength * slideWidth) - slideDis.clientWidth - parseFloat(slideMarginRight.marginRight) + slidePos <= 0){
        NPRight.style.pointerEvents = "none";
        NPRight.style.color = "#d4d4d4";
    }else{
        NPRight.style.pointerEvents = "all";
        NPRight.style.color = "#1e1f29";

    }

}
