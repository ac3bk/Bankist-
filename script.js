'use strict';
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/*for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);*/

//////////////////       opening modals on click    ///////////////////////////
/////////////////////////
btnsOpenModal.forEach((x) => {
  x.addEventListener('click', openModal)
})
///////////////////////////

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////
const doc = document.documentElement;
const body = document.body;
const header = document.head;

///creating and inserting elemetns
//////////////////////////////////

//.insertAdjacentHTML

/*const message = document.createElement('div')
message.classList.add('cookie-message');
message.innerHTML = 'we are using cookies to track everything you do! <button class="btn btn--close-cookie"> Awsome!</button>';
document.querySelector('header').prepend(message);

document.documentElement.style.setProperty('--color-primary', 'red');*/
//////////////////////////////


/////////////////////////       smooth scrolling  ////////////////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', (e) => {
  /*const s1cords = section1.getBoundingClientRect();
  //.getboundclient rect is an object of an elements size and relative position
  console.log(section1.getBoundingClientRect())
  window.scrollTo(s1cords.left + window.pageXOffset, s1cords.top + window.pageYOffset) // .left + .pagexoffset is where the x cordiante wher the element will always be.
  //what makes the page scroll
  window.scrollTo({
    left:s1cords.left + window.pageXOffset, 
    top: s1cords.top + window.pageYOffset,
    behavior: 'smooth',
  })
  */
  section1.scrollIntoView({behavior: 'smooth'});
})
///////////////////////////////

///////////////////////           SMOOTH SCROLLING 2    ///////////////////////////////////////

//event delegation 
//1. add event listener to a common parent of element
//2. determine what element the event originated from
//3. match what your looking for with what was retuend from the event target
//4. event operation

document.querySelector('.nav__links').addEventListener('click', function(e){ //add event listener to a common parent of element
  e.preventDefault();
  const link = e.target; //2. determine what element the event originated from
  if(link.classList.contains('nav__link')){ //3. match what your looking for with what was retuend from the event target
    const id = link.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'}) //4. event operation
  }
})
///////////////////////////////////////////////////////////

/////////////////////////////   BUILDING TABBED COMPONENT  ///////////////////////////////

  //how i attempted to do it
  ///////////////////////////
  // const showTab = function(tabNumber){
  //   const tabCont = document.querySelectorAll('.operations__content');
  //   const tab = document.querySelectorAll('.operations__tab');
  //   tabCont.forEach((x) => {
  //     x.classList.remove('operations__content--active');
  //   });
  //   tab.forEach((x) => {
  //     x.classList.remove('operations__tab--active');
  //   })
  //   tabCont[+tabNumber - 1].classList.add('operations__content--active');
  //   tab[+tabNumber - 1].classList.add('operations__tab--active');
  // }
  // 
  // const btnOperationTab = document.querySelector('.operations__tab-container');
  //   btnOperationTab.addEventListener('click', function(e){
  //   const tabs = e.target
  //   if(tabs.dataset.tab != undefined)showTab(tabs.dataset.tab)
  // })

  //course way of doing this
  //////////////////////////
  const tabs = document.querySelectorAll('.operations__tab');
  const tabContainer = document.querySelector('.operations__tab-container');
  const tabsContent = document.querySelectorAll('.operations__content');

  tabContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab');
    //guard clause
    if(!clicked) return
    //remove active
    tabs.forEach( t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(C => C.classList.remove('operations__content--active'))
    //active tab
    clicked.classList.add('operations__tab--active')
    //active content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

  })
///////////////////////////////////////////

///////////////////////////////               MENU FADE       ////////////////////////////////

// course way of doing it
const handelHover = function(e){ //these arguments will not be affected
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( el => {
      if(el !== link) el.style.opacity = this.a;   
     });
     logo.style.opacity = 1;
  }
}

nav.addEventListener('mouseover', handelHover.bind({a: 0.5,
b: 0.2, f:0.9,}))  //0.5 will be saved to the this keyword in the original function

nav.addEventListener('mouseout', handelHover.bind({a:1}));
//////////////////////////////


//////////////////////////////////////           STICKY NAV          ////////////////////////////////
//less effiecient way
//const initialCord = section1.getBoundingClientRect();
//window.addEventListener('scroll', function(e){
//  if(window.scrollY > initialCord.top){
//    nav.classList.add('sticky');
//  }
//  else{
//    nav.classList.remove('sticky')
//  }
//})
//////////
//better performance
const bound = nav.getBoundingClientRect() //used to get height of nav bar
const stickyNav = function(entries, observer){
  if(entries[0].isIntersecting){
    nav.classList.remove('sticky');
  }
  else{
    nav.classList.add('sticky');
  }

};

const options = {
  root: null, //null is the viewport
  threshold: 0, //what visibiliy of target to run callback
  rootMargin: `-${bound.height}px` 

}
let intersObserver = new IntersectionObserver(stickyNav, options).observe(document.querySelector('.header'));
////////////////////////////////


//////////////////////////////// REVEALING SECTIONS WHILE SCROLLING  ///////////////////////////
const sections = document.querySelectorAll(".section")

const option2 = {
  root: null,
  threshold: 0.15,
}

const reveal = function(entries){
  console.log(entries[0])
  if(entries[0].isIntersecting){
    entries[0].target.classList.remove('section--hidden');
    sectIntrObs.unobserve(entries[0].target)
  }
}

const sectIntrObs = new IntersectionObserver(reveal, option2)
sections.forEach(element => {
  element.classList.add('section--hidden');
  sectIntrObs.observe(element);
});
////////////////////////////


//////////////////// LAZY LOADING IMAGES //////////////////////////////

const images = document.querySelectorAll('.features__img') //selecting all images
const lazyImg = function(entries){
  if(!entries[0].isIntersecting) return //if not intersecting stop the callback
    //console.log(entries[0].target.src);
    entries[0].target.src = entries[0].target.dataset.src //swaping the lazy img for a higher quality img
    entries[0].target.addEventListener('load', e => {  // only remove the blur filter after the high quality img has been laoding
      entries[0].target.classList.remove('lazy-img')
    })
    imgObs.unobserve(entries[0].target) //removing the observer API from the target elemnt after callback for better performance
}

const imgObs = new IntersectionObserver(lazyImg, option2)

images.forEach( e => { //adding our Observer API to each img element
  imgObs.observe(e);
})
///////////////////////////////////////////

/////////////// slider component /////////////////////////////
const sliderr = function(){
  let currentSlide = 0;
  let maxslide = 3;
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots')

  
  const goToSlide = function(slide){
    slides.forEach( (s,i) => {
      s.style.transform = `translateX(${100*(i - slide)}%)`
    })
  }
  
  const nextSlide = function(){
    if(currentSlide === maxslide -1){
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }
  
  const prevSlide = function(){
    if(currentSlide === 0){
      currentSlide = maxslide - 1;
    }
    else{
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }
  
  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)
  
  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  })
  
  const createDots = function(){
    slides.forEach( (_,i) => {
      dotContainer.insertAdjacentHTML('beforeend',
      `<div class="dots__dot" data-slide=${i}></div>`)
    })
  }
  
  const activateDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active')
    })
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }
  
  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
      const slide = e.target.dataset.slide
      goToSlide(+slide);
      activateDot(slide);
    }
  })
  
  const init = function(){
    goToSlide(0);
    createDots();
  
  }
  init()
}
sliderr();

//////////////////////////////////////////////////////////////////


























//lecture
////////////////////////////

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', (e) => {
  alert
})
//

const randomInt = (min,max) => {
  Math.floor(Math.random()* (max - min + 1) + min);
}

const RandomColor = () => `rgb${randomInt(0,255),randomInt(0,255),randomInt(0,255)}`;

/*document.querySelector('.nav-link').addEventListener('click',(e) => {
  console.log('LINK')
})*/
document.addEventListener('DOMContentLoaded', function(e){
  console.log('loaded')
})









