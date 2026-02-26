//GENERAL
gsap.registerPlugin(
  CustomEase,
  ScrollTrigger,
  Flip,
);

gsap.defaults({
  ease: "power4.out",
  duration: 1,
});

let easeIn = "power4.in"
let easeInOut = "power4.inOut"

let mm = gsap.matchMedia();

gsap.set('[data-visibility]', {visibility: "visible"})


// LENIS SMOOTH SCROLL
let lenis;
  if (Webflow.env("editor") === undefined) {
    lenis = new Lenis({
      duration: 1.3,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
  $("[data-lenis-start]").on("click", function () {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

lenis.on("scroll", ScrollTrigger.update);

function initScrolllNav() {
  let navbar = document.querySelector('[data-navbar]')
  let showNav = gsap
    .from(navbar, {
      yPercent: -120,
      paused: true,
      ease: easeInOut,
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: "max",
    onUpdate: (self) => {
        self.direction === -1 ? showNav.play() : showNav.reverse();
    },
  });
}

function splitChars(word) {
  let splitType = new SplitType(word, {
    types: "chars",
    tagName: "span",
  });

  let wordChars = word.querySelectorAll(".char");

  return wordChars;
}

function splitLines(text) {
  let splitType = new SplitType(text, {
    types: "lines",
    tagName: "span",
  });

  // Wrap each line in a div with overflow hidden
  let textLines = text.querySelectorAll(".line");
  textLines.forEach(function (line) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("u-line-wrap");
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });
  return textLines;
}

function initBtnsHover() {
  let btns = document.querySelectorAll('[data-cta-main]')

  btns.forEach((btn) => {
    let text1 = btn.querySelector('[data-btn-text="1"]')
    let text2 = btn.querySelector('[data-btn-text="2"]')

    let splitedChars1 = splitChars(text1)
    let splitedChars2 = splitChars(text2)

    let tl = gsap.timeline({paused: true})

    tl.to(splitedChars1, {yPercent:-100, ease: easeIn, stagger: {amount: 0.3}, duration: 0.5})
    tl.to(splitedChars2, {yPercent:-100, stagger: {amount: 0.3}, duration: 0.5}, "<0.4")

    btn.addEventListener('mouseenter', () => {
      tl.play();
    })

    btn.addEventListener('mouseleave', () => {
      tl.reverse();
    })
  })
}

function initParagraph() {
  let paragraphs = document.querySelectorAll('[data-paragraph]')

  paragraphs.forEach((paragraph) => {
    let splitedParagraph = splitLines(paragraph)

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: paragraph,
        start: "top 80%",
        scrub: false,
      }
    })

    tl.from(splitedParagraph, {yPercent: 120, stagger: 0.06})
  })
}

function initTitles() {
  let paragraphs = document.querySelectorAll('[data-title]')

  paragraphs.forEach((paragraph) => {
    let splitedParagraph = splitLines(paragraph)

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: paragraph,
        start: "top 80%",
        scrub: false,
      }
    })

    tl.from(splitedParagraph, {yPercent: 120, stagger: 0.1})
  })
}

function initImgScale() {
  let imgs = document.querySelectorAll('[data-img]')

  imgs.forEach((img) => {

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: img,
        start: "top 80%",
        end: "top top",
        scrub: 1.1,
      }
    })

    tl.from(img, {scale: 1.05})
  })
}

function initDividers() {
  let dividers = document.querySelectorAll('[data-divider]')

  dividers.forEach((img) => {

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: img,
        start: "top 80%",
        scrub: false,
      }
    })

    tl.from(img, {scaleX: 0})
  })
}

function initMenu() {
  let isOpen = false

  let btns = document.querySelectorAll('[data-menu-btn]')
  let overlay = document.querySelector('[data-menu-overlay]')
  let inner = document.querySelector('[data-menu-inner]')
  let linkTexts = document.querySelectorAll('.menu__link-text')
  let playlistBtn = document.querySelector('[data-menu-playlist]')
  let paragraph = document.querySelector('[data-menu-paragraph]')
  let courseBtn = document.querySelector('[data-menu-course]')

  let splitedParagraph = splitLines(paragraph)

  gsap.set(overlay, {autoAlpha: 0})
  gsap.set(inner, {clipPath: 'inset(0 0 0 100%)'})
  gsap.set([linkTexts, splitedParagraph], {yPercent: 120})
  gsap.set([playlistBtn, courseBtn], {opacity: 0})

  let tl = gsap.timeline({paused: true});

  tl.to(overlay, {autoAlpha: 0.4})
  tl.to(inner, {clipPath: 'inset(0 0 0 0%)', ease: easeInOut}, "< 0.2")
  tl.to(linkTexts, {yPercent: 0, stagger: 0.1}, "< 0.6")
  tl.to(playlistBtn, {opacity: 1}, "< 0.5")
  tl.to(splitedParagraph, {yPercent: 0, stagger: 0.05}, "<")
  tl.to(courseBtn, {opacity: 1}, "< 0.5")

  let closeTl = gsap.timeline({paused: true})

  closeTl.to(linkTexts, {yPercent: 120, stagger: 0.1, ease: easeIn})
  closeTl.to(playlistBtn, {opacity: 0}, "<")
  closeTl.to(splitedParagraph, {yPercent: 120, stagger: 0.05, ease: easeIn}, "<")
  closeTl.to(courseBtn, {opacity: 0}, "<")
  closeTl.to(overlay, {autoAlpha: 0}, "<0.2")
  closeTl.to(inner, {clipPath: 'inset(0 0 0 100%)', ease: easeInOut}, "<0.2")

  btns.forEach((btn) => {
    btn.addEventListener("click", function() {
      if(!isOpen){
        closeTl.pause(0)
        tl.restart()
      } else {
        // Fermeture du menu
        tl.pause()
        closeTl.progress(0).play()
      }
      isOpen = !isOpen
    })
  })

  overlay.addEventListener('click', () => {
    if(isOpen){
      btns[0].click();
    }
  })
}

function initPlaylist() {
  let isOpen = false
  let closeBtn = document.querySelector('[data-playlist-close]')
  let btns = document.querySelectorAll('.is--playlist')
  let overlay = document.querySelector('[data-playlist-overlay]')
  let inner = document.querySelector('[data-playlist-inner]')
  let texts = document.querySelectorAll('.playlist__text')
  let imgs = document.querySelectorAll('.playlist__img-w')
  let items = document.querySelectorAll('.playlist__item')

  gsap.set(overlay, {autoAlpha: 0})
  gsap.set(inner, {clipPath: 'inset(100% 0 0 0)'})
  gsap.set(texts, {yPercent: 120})

  let tl = gsap.timeline({paused: true});

  let itemsText = []
  items.forEach((item) => {
    itemsText.push(item.querySelectorAll('.playlist__text'))
  })

  tl.to(overlay, {autoAlpha: 0.4})
  tl.to(inner, {clipPath: 'inset(0% 0 0 0)', ease: easeInOut}, "< 0.2")
  tl.from(imgs, {clipPath: 'inset(50% 50% 50% 50%)', stagger: 0.1}, "< 1")
  tl.to(itemsText[0], {yPercent: 0}, "<0.2")
  tl.to(itemsText[1], {yPercent: 0}, "<0.1")
  tl.to(itemsText[2], {yPercent: 0}, "<0.1")
  tl.to(itemsText[3], {yPercent: 0}, "<0.1")
  tl.to(itemsText[4], {yPercent: 0}, "<0.1")
  tl.to(itemsText[5], {yPercent: 0}, "<0.1")
  tl.to(itemsText[6], {yPercent: 0}, "<0.1")

  let closeTl = gsap.timeline({paused: true})

  closeTl.to(imgs, {clipPath: 'inset(0 0 0 0)', stagger: 0.1})
  closeTl.to(itemsText[0], {yPercent: 120}, "<0.5")
  closeTl.to(itemsText[1], {yPercent: 120}, "<")
  closeTl.to(itemsText[2], {yPercent: 120}, "<")
  closeTl.to(itemsText[3], {yPercent: 120}, "<")
  closeTl.to(itemsText[4], {yPercent: 120}, "<")
  closeTl.to(itemsText[5], {yPercent: 120}, "<")
  closeTl.to(itemsText[6], {yPercent: 120}, "<")
  closeTl.to(inner, {clipPath: 'inset(0 0 100% 0)', ease: easeInOut}, "0.2")
  closeTl.to(overlay, {autoAlpha: 0}, "<")

  btns.forEach((btn) => {
    btn.addEventListener("click", function() {
      if(!isOpen){
        closeTl.pause()
        tl.restart()
        isOpen = !isOpen
      }
    })
  })

  closeBtn.addEventListener('click', function() {
    if(isOpen){
      tl.pause()
      closeTl.progress(0).play()  // Au lieu de restart()
      isOpen = !isOpen
    }
  })

  // Optionnel : ajouter le click sur l'overlay comme pour le menu
  overlay.addEventListener('click', () => {
    if(isOpen){
      closeBtn.click()
    }
  })
}

function initSound() {
  const backgroundMusic = new Howl({
    src: "https://cdn.jsdelivr.net/gh/anil-studio/bounce-13@main/lunatictypebeat-by-nathan.mp3",
    html5: true,
    loop: true,
    autoplay: false,
  });

  const playBtns = document.querySelectorAll('[data-play-btn]')
  
  let text1 = document.querySelectorAll('[data-play-btn-text="1"]') 
  let text2 = document.querySelectorAll('[data-play-btn-text="2"]') 

  let tl = gsap.timeline({paused: true})

    tl.to(text1, {yPercent: -120, ease: easeIn, duration: 0.5})
    tl.to(text2, {yPercent: -120, duration: 0.5}, "<0.5")

  playBtns.forEach(function (audioButton) {
    audioButton.addEventListener("click", function () {
      if (backgroundMusic.playing()) {
        backgroundMusic.pause();
        tl.reverse()
      } else {
        backgroundMusic.play();
        tl.play()
      }
      console.log("play")
    });
  });
}
initSound();

let heroTl = gsap.timeline({paused: true})

function initHero() {
  let title = document.querySelector('[data-hero-title]')
  let canvas = document.querySelector('[data-canvas-w]')
  let paragraph = document.querySelector('[data-hero-paragraph]')
  let elts = document.querySelectorAll('[data-load-opacity]')
  let bg = document.querySelector('[data-hero-bg]')

  let splitedTitle = splitLines(title)
  let splitedParagraph = splitLines(paragraph)

  gsap.set(splitedTitle, {yPercent: 120})
  gsap.set(canvas, {yPercent: 30, scale : 0})
  gsap.set(splitedParagraph, {yPercent: 120})
  gsap.set(elts, {opacity: 0})

  heroTl.from(bg, {opacity: 0})
  heroTl.to(splitedTitle, {yPercent: 0},"<")
  heroTl.to(canvas, {yPercent: 0, scale: 1, duration: 1}, "<0.2")
  heroTl.to(splitedParagraph, {yPercent: 0, stagger: 0.1}, "< 0.2")
  heroTl.to(elts, {opacity : 1}, "<0.2")
  
}


function initLoader() {
  lenis.stop();
  let wrap = document.querySelector('[data-loader]')
  let brandText = document.querySelector('[data-loader-text]')
  let imgWrap = document.querySelector('[data-loader-imgs]')
  let imgs = document.querySelectorAll('.loader__img')
  let text = document.querySelector('[data-hero-loader-text]')

  let splitedText = splitLines(text)

  let tl = gsap.timeline({
    onComplete: () => {heroTl.play(); lenis.start()}
  })

  tl.from(brandText, {yPercent: 120}, 0.2)
  tl.to(brandText, {yPercent: -100})
  tl.from(imgWrap, {clipPath: "inset(50% 50% 50% 50%)", duration: 1}, "<")
  tl.from(imgs, {clipPath: "inset(50% 50% 50% 50%)", stagger: {each: 0.25, from: "start"}})
  tl.to(imgWrap, {clipPath: "inset(50% 50% 50% 50%)", duration: 1})
  tl.from(splitedText, {yPercent: 120, stagger: 0.1})
  tl.to(splitedText, {yPercent: -120, stagger: 0.05, ease: easeIn})
  tl.to(wrap, {autoAlpha: 0, duration: 0.5}, ">")
}

function aboutScroll() {
  let panel = document.querySelector('[data-scroll-panel]')
  let bg = document.querySelector('[data-scroll-background]')
  let img = document.querySelectorAll('[data-scroll-img]')
  let btn = document.querySelector('[data-scroll-btn]')

  let canvas = document.querySelector('[data-canvas]');
  let scrollCanvas = document.querySelector('[data-scroll-canvas-w]');
  let originalParent = document.querySelector('[data-canvas-w]');

  let trigger1 = document.querySelector('[data-scroll-trigger="1"]')
  let titleLines1 = document.querySelectorAll('[data-scroll-title-line="1"]')
  let number1 = document.querySelector('[data-scroll-number="1"]')
  let paragraph1 = document.querySelector('[data-scroll-paragraph="1"]')
  let letters1 = document.querySelectorAll('[data-scroll-letter="1"]')
  let texts1 = document.querySelectorAll('[data-scroll-text="1"]')

  let trigger2 = document.querySelector('[data-scroll-trigger="2"]')
  let titleLines2 = document.querySelectorAll('[data-scroll-title-line="2"]')
  let number2 = document.querySelector('[data-scroll-number="2"]')
  let paragraph2 = document.querySelector('[data-scroll-paragraph="2"]')
  let texts2 = document.querySelectorAll('[data-scroll-text="2"]')

  let trigger3 = document.querySelector('[data-scroll-trigger="3"]')
  let titleLines3 = document.querySelectorAll('[data-scroll-title-line="3"]')
  let number3 = document.querySelector('[data-scroll-number="3"]')
  let paragraph3 = document.querySelector('[data-scroll-paragraph="3"]')
  let texts3 = document.querySelectorAll('[data-scroll-text="3"]')
  

  gsap.set(panel, {xPercent: -100})
  gsap.set(bg, {scaleX: 0})

  let splitedParagraph1 = splitLines(paragraph1)
  let splitedParagraph2 = splitLines(paragraph2)
  let splitedParagraph3 = splitLines(paragraph3)

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: trigger1,
      start: "top bottom",
      end: "bottom 90%",
      scrub: false,
      toggleActions: "play none reverse none",
      onEnter: () => moveCanvas(scrollCanvas),
      onLeaveBack: () => moveCanvas(originalParent)
    }
  });

  function moveCanvas(target) {
    let state = Flip.getState(canvas);
    target.appendChild(canvas);
    Flip.from(state, {
      duration: 0,
      absolute: true,
    });
  }

  tl1.to(panel, {xPercent: 0})
  tl1.to(bg, {scaleX: 1, transformOrigin: "0% 50%", ease: easeInOut, duration: 2}, '<')
  tl1.to(img, {clipPath: "inset(50% 50% 50% 50%)", duration: 2, ease: easeInOut}, "<")
  tl1.from(titleLines1, {yPercent: 120, stagger: 0.1}, "<1")
  tl1.from(number1, {yPercent: 120}, "<0.2")
  tl1.from(splitedParagraph1, {yPercent: 120, stagger: 0.05}, "<0.2")
  tl1.from(letters1, {yPercent: 120, stagger: 0.05}, "<0.1")
  tl1.from(texts1, {yPercent: 120, stagger: 0.05}, "<0.1")
  tl1.from(btn, {opacity: 0}, "<0.2")

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: trigger2,
      top: "top bottom",
      end: "bottom 90%",
      scrub: false,
      toggleActions: "play none reverse none"
    }
  })

  tl2.to(titleLines1, {yPercent: -120, stagger: 0.1, ease: easeIn})
  tl2.to(titleLines2, {yPercent: -120, stagger: 0.1})
  tl2.to(number1, {yPercent: -120, ease: easeIn}, "<-0.8")
  tl2.to(number2, {yPercent: -120}, ">-0.2")
  tl2.to(splitedParagraph1, {yPercent: -120, ease: easeIn, stagger: 0.1}, "<-1.1")
  tl2.from(splitedParagraph2, {yPercent: 120, stagger: 0.1}, ">")
  tl2.to(texts1, {yPercent: -120, ease: easeIn, stagger: 0.05}, "<-1")
  tl2.to(texts2, {yPercent: -120, stagger: 0.05}, ">-0.2")

  let tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: trigger3,
      top: "top bottom",
      end: "bottom 90%",
      scrub: false,
      toggleActions: "play none reverse none"
    }
  })

  tl3.to(titleLines2, {yPercent: -240, stagger: 0.1, ease: easeIn})
  tl3.to(titleLines3, {yPercent: -120, stagger: 0.1})
  tl3.to(number2, {yPercent: -240, ease: easeIn}, "<-0.8")
  tl3.to(number3, {yPercent: -120}, ">-0.2")
  tl3.to(splitedParagraph2, {yPercent: -240, ease: easeIn, stagger: 0.1}, "<-1.1")
  tl3.from(splitedParagraph3, {yPercent: 120, stagger: 0.1}, ">")
  tl3.to(texts2, {yPercent: -240, ease: easeIn, stagger: 0.05}, "<-1")
  tl3.to(texts3, {yPercent: -120, stagger: 0.05}, ">-0.2")
}

function initGallery() {
  let titleLeft = document.querySelector('[data-gallery-title="left"]')
  let titleRight = document.querySelector('[data-gallery-title="right"]')
  let listItems = document.querySelectorAll('.gallery__item')
  let imgs = document.querySelectorAll('.gallery__img')
  let numbers = document.querySelectorAll('.gallery__number')
  let descriptions = document.querySelectorAll('.gallery__description')

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: titleLeft,
      start: "top center",
      scrub: false
    }
  })

  tl.from(titleLeft, {xPercent: 60, ease: easeInOut})
  tl.from(titleRight, {xPercent: -40, ease: easeInOut}, "<")
  tl.from(listItems, {clipPath: "inset(50% 50% 50% 50%)", stagger: 0.1}, "<0.5")

  let previousActiveItem = null;
  let previousActiveImg = null;
  let previousActiveNumber = null;
  let previousActiveDescription = null;

  function removeActiveClass() {
    listItems.forEach(item => {
      if (item.classList.contains('is--active')) {
        previousActiveItem = item;
      }
      item.classList.remove('is--active');
    });
  
    imgs.forEach(img => {
      if (img.classList.contains('is--active')) {
        previousActiveImg = img;
      }
      img.classList.remove('is--active');
      img.style.zIndex = "0"
      previousActiveImg.style.zIndex = "1"

    });
  
    numbers.forEach(number => {
      if (number.classList.contains('is--active')) {
        previousActiveNumber = number;
        gsap.fromTo(number, {yPercent: -120}, {yPercent: -240, ease: easeIn, duration: 0.5})
      }
      number.classList.remove('is--active');
    });
  
    descriptions.forEach(title => {
      if (title.classList.contains('is--active')) {
        previousActiveDescription = title;
        gsap.fromTo(title, {yPercent: -120}, {yPercent: -240, ease: easeIn, duration: 0.5})
      }
      title.classList.remove('is--active');
    });
  }

  listItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('is--active')) {
      return
    }
    removeActiveClass();
    
    // Ajouter la classe 'is--active' aux éléments correspondants
    imgs[index].classList.add('is--active');
    gsap.from(imgs[index], {clipPath: "inset(50% 50% 50% 50%)", ease: easeInOut, duration: 1.5})

    numbers[index].classList.add('is--active');
    gsap.set(numbers[index], {yPercent: 120, duration: 0.5})
    setTimeout(() => {
      gsap.to(numbers[index], {yPercent: 0})
    }, 800)

    descriptions[index].classList.add('is--active');
    gsap.set(descriptions[index], {yPercent: 120, duration: 0.5})
    setTimeout(() => {
      gsap.to(descriptions[index], {yPercent: 0})
    }, 800)

    item.classList.add('is--active');
  });

  })
}

function initSpecs() {

  let specsList = document.querySelectorAll('[data-specs-list="1"]')
  let specsWrap = document.querySelectorAll('[data-specs]')
  let menu = document.querySelector('[data-menu-inner]')
  let boxWrap = document.querySelectorAll('[data-box]')
  
  let colorTl = gsap.timeline({
    scrollTrigger: {
      trigger: specsWrap,
      top: "top center%",
      end: "top bottom",
      scrub: false,
      toggleActions: "play none reverse none"
    }
  })

  colorTl.from([boxWrap, specsWrap], {...colorThemes[1], ease: "none", duration: 0.4})
  colorTl.from(menu, {...colorThemes[2], ease: "none", duration: 0.4}, "<")

  let numbers1 = document.querySelectorAll('.specs__item-content.is--1 .specs__item-number')
  let numbers2 = document.querySelectorAll('.specs__item-content.is--2 .specs__item-number')
  let numbers3 = document.querySelectorAll('.specs__item-content.is--3 .specs__item-number')

  let titles1 = document.querySelectorAll('.specs__item-content.is--1 .specs__item-title')
  let titles2 = document.querySelectorAll('.specs__item-content.is--2 .specs__item-title')
  let titles3 = document.querySelectorAll('.specs__item-content.is--3 .specs__item-title')

  let paragraphs1 = document.querySelectorAll('.specs__item-content.is--1 .specs__item-paragraph')
  let paragraphs2 = document.querySelectorAll('.specs__item-content.is--2 .specs__item-paragraph')
  let paragraphs3 = document.querySelectorAll('.specs__item-content.is--3 .specs__item-paragraph')
  
  let dividers1 = document.querySelectorAll('.specs__item-content.is--1 .specs__item-divider')
  let dividers2 = document.querySelectorAll('.specs__item-content.is--2 .specs__item-divider')
  let dividers3 = document.querySelectorAll('.specs__item-content.is--3 .specs__item-divider')


  let imgs = document.querySelectorAll('.specs__img')

  let btns = document.querySelectorAll('.specs__categories-btn')
  let itemsInner1 = document.querySelectorAll('.specs__item-content.is--1')
  let itemsInner2 = document.querySelectorAll('.specs__item-content.is--2')
  let itemsInner3 = document.querySelectorAll('.specs__item-content.is--3')


  let splitParagraphs1 = [] 
  paragraphs1.forEach((paragraph) => {
    splitParagraphs1.push(splitLines(paragraph))
  })

  let splitParagraphs2 = [] 
  paragraphs2.forEach((paragraph) => {
    splitParagraphs2.push(splitLines(paragraph))
  })

  let splitParagraphs3 = [] 
  paragraphs3.forEach((paragraph) => {
    splitParagraphs3.push(splitLines(paragraph))
  })
  
  gsap.set([itemsInner2, itemsInner3, imgs[1], imgs[2]], {autoAlpha: 0})
  
  btns[0].addEventListener('click', () => {
    btns.forEach((btn) => {
      btn.classList.remove('is--active')
    })
    btns[0].classList.add('is--active')

    let btnTl = gsap.timeline()
    
    btnTl.to([itemsInner2, itemsInner3, imgs[1], imgs[2]], {autoAlpha : 0, duration: 0.5})
    btnTl.set(itemsInner1, {autoAlpha: 1})
    btnTl.to(imgs[0], {autoAlpha: 1, ease: 'none'}, "<")
    
    btnTl.from([numbers1, titles1], {yPercent : 120, duration: 0.5}, "<")
    btnTl.from(dividers1, {scaleX : 0, duration: 0.5}, "<0.2")
    .from(splitParagraphs1[0], {yPercent: 120, stagger: 0.1}, "<0.2")  
    .from(splitParagraphs1[1], {yPercent: 120, stagger: 0.1}, "<")    
    .from(splitParagraphs1[2], {yPercent: 120, stagger: 0.1}, "<")
    .from(splitParagraphs1[3], {yPercent: 120, stagger: 0.1}, "<")
  })

  btns[1].addEventListener('click', () => {
    btns.forEach((btn) => {
      btn.classList.remove('is--active')
    })
    btns[1].classList.add('is--active')
    
    let btnTl = gsap.timeline()
    
    btnTl.to([itemsInner1, itemsInner3, imgs[0], imgs[2]], {autoAlpha : 0, duration: 0.5})
    btnTl.set(itemsInner2, {autoAlpha: 1})
    btnTl.to(imgs[1], {autoAlpha: 1, ease: 'none'}, "<")
    
    btnTl.from([numbers2, titles2], {yPercent : 120, duration: 0.5}, "<")
    btnTl.from(dividers2, {scaleX : 0, duration: 0.5}, "<0.2")
    .from(splitParagraphs2[0], {yPercent: 120, stagger: 0.1}, "<0.2")  
    .from(splitParagraphs2[1], {yPercent: 120, stagger: 0.1}, "<")    
    .from(splitParagraphs2[2], {yPercent: 120, stagger: 0.1}, "<")
  })

  btns[2].addEventListener('click', () => {
    btns.forEach((btn) => {
      btn.classList.remove('is--active')
    })
    btns[2].classList.add('is--active')
    
    let btnTl = gsap.timeline()
    
    btnTl.to([itemsInner1, itemsInner2, imgs[0], imgs[1]], {autoAlpha : 0, duration: 0.5})
    btnTl.set(itemsInner3, {autoAlpha: 1})
    btnTl.to(imgs[2], {autoAlpha: 1, ease: 'none'}, "<")
    
    btnTl.from([numbers3, titles3], {yPercent : 120, duration: 0.5}, "<")
    btnTl.from(dividers3, {scaleX : 0, duration: 0.5}, "<0.2")
    .from(splitParagraphs3[0], {yPercent: 120, stagger: 0.1}, "<0.2")  
    .from(splitParagraphs3[1], {yPercent: 120, stagger: 0.1}, "<")    
    .from(splitParagraphs3[2], {yPercent: 120, stagger: 0.1}, "<")
  })

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: specsList,
      start: "top 80%",
      scrub: false,
    }
  })

  tl.from(numbers1, {yPercent: 120})
  .from(titles1, {yPercent: 120}, "<")
  .from(dividers1, {scaleX: 0}, "<0.2")
  .from(imgs[0], {opacity: 0}, "<") 
  .from(splitParagraphs1[0], {yPercent: 120, stagger: 0.1}, "<0.2")  
  .from(splitParagraphs1[1], {yPercent: 120, stagger: 0.1}, "<")    
  .from(splitParagraphs1[2], {yPercent: 120, stagger: 0.1}, "<")
  .from(splitParagraphs1[3], {yPercent: 120, stagger: 0.1}, "<")   
}

function initFooter() {
  let wrap = document.querySelector('[data-footer]')
  let texts = document.querySelectorAll('.footer__text')
  let splitedTexts = []

  texts.forEach((text) => {
    let splited = splitChars(text)
    splitedTexts.push(splited)
  })

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrap,
      start: "top 10%",
      defaults : {
        duration: 1.5
      }
    }
  })
  tl.from(splitedTexts[0], {yPercent: 120, stagger: 0.1})
  tl.from(splitedTexts[1], {yPercent: 120, stagger: 0.1}, "< 0.3")
  tl.from(splitedTexts[2], {yPercent: 120, stagger: 0.1}, "< 0.3")
}

function init() {
  initHero();
  initLoader();
  document.fonts.ready.then(() => {
    initScrolllNav();
    initBtnsHover();
    initParagraph();
    initTitles();
    initImgScale();
    initDividers();
    initMenu();
    initPlaylist();
    aboutScroll();
    initGallery();
    initSpecs();
    initFooter();
  });
}
init();