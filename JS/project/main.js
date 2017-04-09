$(document).ready(function() {
  //Визови при старті
  triangleMoove(); //Переміщення стрілки-трикутника в блоці Person
  var progressbarIntervals = [];
  var dataArr = [
    [84,67,54,80,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'],
    [61,87,60,90,'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'],
    [74,78,70,60,'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'],
    [94,61,91,59,'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.']
  ];

  /*Обробрник зміни розміру вікна*/
  $(window).resize(function(e){
    var width = $( window ).width();
    var ul = $( ".navigation .container .row>ul" );
    if(width<=630){
      ul.hide();
    }else{
      ul.show();
    }

    triangleMoove();
  });

  /*Обробрник кнопки меню*/
  $(menuBtn).on('click',function () {
    $( ".navigation .container .row>ul" ).toggle('fast');
  });

  /*Обробрник слайдера*/
  var slides = $('#slider .slide');
  var currentSlide = 0;

  function changeSlide(cnt){
    if(!cnt){
      n = 1;
    }
    slides[currentSlide].classList.remove('isvisible');
    currentSlide = (currentSlide+n)%slides.length;
    slides[currentSlide].classList.add('isvisible');
    var currentText = $(slides[currentSlide]).find('span').html();
    $('.slider-caption span').html( currentText );
  }

  var sliderChangeInterval = setInterval(changeSlide, 3000);
  var sliderDelayTimeout;

  //Обробник кнопок слайдера
  $('.slider-button').on('click',function (e) {
    clearInterval(sliderChangeInterval);
    if(sliderDelayTimeout){clearTimeout(sliderDelayTimeout);}
    if(e.target.classList.contains('slider-button-left')){
      changeSlide(-1);
    } else{
      changeSlide();
    }
    sliderDelayTimeout = setTimeout(function(){
      changeSlide();
      sliderChangeInterval = setInterval(changeSlide, 3000);
    },5000);
  });

  /*Services*/
  $(".services-blok .zoom-image-container img").hover(function() {
    $(this).closest(".zoom-image-container").css("z-index", 1);
    $(this).animate({ height: "117", width: "117", left: "-=6", top: "-=6" }, "fast");
  },
  function() {
    $(this).closest(".zoom-image-container").css("z-index", 0);
    $(this).animate({ height: "106", width: "106", left: "+=6", top: "+=6" }, "fast");
  });

  //Portfolio image hover
  $(".hover-mask").hover(
    function(){$(this).stop().animate({"opacity": 1});},
    function(){$(this).stop().animate({"opacity": 0});}
  );

  //Portfolio filter
  $('.portfolio-filter li').on('click',function(e){
    var targetCategory = e.target.dataset.category;
    $('.portfolio-filter li').removeClass('active');
    $(this).addClass('active');
    $('.portfolio-photos li').each(function(i,el){
      var category = el.dataset.category;
      if(category == targetCategory || targetCategory == 'all'){
        el.style.display = 'flex';
      } else{
        el.style.display = 'none';
      }
    });
  });


//Portfolio numbers-block
function isVisible(elem) {
  var coords = elem.getBoundingClientRect();
  var windowHeight = document.documentElement.clientHeight;
  var topVisible = coords.top > 0 && coords.top < windowHeight;
  var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
  return topVisible || bottomVisible;
}

var el = $('#animated-numbers')[0];

function incrementNumbers(){
  if( !isVisible(el) ) return;
  if( +el.dataset.isanimateddone ) return;
  el.dataset.isanimateddone = 1;
  var seconds = 3;
  var currentFrame = 0 ;
  var targetFrames = seconds * 25;
  var elements = $('#animated-numbers h2');
  var targetValues = [];
  var realValues = [0,0,0,0];
  elements.each(function(el,i) {
    targetValues.push(this.dataset.targetnum);
  });
  function incrementer () {
    if(currentFrame<targetFrames){
      elements.each(function(i,el){
        realValues[i] += targetValues[i]/targetFrames;
        var value = (window.Intl && Intl.NumberFormat) ? (new Intl.NumberFormat('ru-RU').format(Math.round(realValues[i]))) : Math.round(realValues[i]);
        el.textContent = value;
      });
      currentFrame += 1;
      setTimeout(incrementer,40);
    }
  }
  incrementer();
  window.removeEventListener('scroll',incrementNumbers);
}
window.addEventListener('scroll',incrementNumbers);
incrementNumbers();


//About-us-top
$(".zoom-image-container.about-us-top-image img").hover(function() {
  $(this).closest(".zoom-image-container").css("z-index", 1);
  $(this).animate({ height: "77", width: "77", left: "-=3", top: "-=4" }, "fast");
},
function() {
  $(this).closest(".zoom-image-container").css("z-index", 0);
  $(this).animate({ height: "70", width: "70", left: "+=3", top: "+=4" }, "fast");
});


//Person-description cancel-btn
$('.cancel-btn').on('click',function(e) {
  e.preventDefault();
  $(this).closest('#person-description').fadeOut('fast');
  //$(this).closest('.person-description-item').addClass('hidden');
});

//Person click
$('.person a').on('click',function(e){
  e.preventDefault();
  var isSectionVisible = $('#person-description:visible').length;
  if(!isSectionVisible){
    $('#person-description').fadeIn('fast');
  }
  var targetPersonNum = this.dataset.person;
  $('.person-description-item.showing').removeClass('showing');
  $('[data-person="'+targetPersonNum+'"]').addClass('showing');

  triangleMoove(); //Переміщення стрілки
  showScills(targetPersonNum.slice(-1)-1,!(+this.dataset.isshowscills)); //Рендеринг progressbar
  this.dataset.isshowscills = 1;
  });

//Функція переміщення стрілки-трикутника
function triangleMoove() {
  var triangle = document.getElementById('triangle');
  var selectedPesonNum = document.querySelector('.person-description-item.showing').dataset.person;
  var selectedPersonElem = document.querySelector('[data-person="'+selectedPesonNum+'"]');
  var rect = selectedPersonElem.getBoundingClientRect();
  triangle.style.left = rect.left + (rect.right - rect.left)/2 - 25 + 'px';
}




//Функція анімації прогресбару
function drawCircle(canvasWrapper, proc, isAnimated) {
  var can = canvasWrapper.querySelector('canvas'),
    spanProcent = canvasWrapper.querySelector('.canvas-procent'),
    c = can.getContext('2d');
  var posX = can.width / 2,
    posY = can.height / 2,
    fps = 5,
    procent = 0,
    oneProcent = 360 / 100,
    result = oneProcent * proc;
  c.lineCap = 'round';
  arcMove();
  function arcMove() {
    var deegres = 0;
    var acrInterval = setInterval(function() {
      deegres += 1;
      c.clearRect(0, 0, can.width, can.height);
      procent = deegres / oneProcent;
      spanProcent.innerHTML = isAnimated ? procent.toFixed() : proc;
      c.beginPath();
      c.arc(posX, posY, 68, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
      c.strokeStyle = '#fff';
      c.lineWidth = '7';
      c.stroke();
      c.beginPath();
      c.strokeStyle = '#ffe600';
      c.lineWidth = '7';
      c.arc(posX, posY, 68, (Math.PI / 180) * 90, (Math.PI / 180) * (90 + (isAnimated ? deegres : proc*3.6)) );
      //(Math.PI / 180) * (90 + deegres)
      c.stroke();
      if (deegres >= result) clearInterval(acrInterval);
    }, fps);
    progressbarIntervals.push(acrInterval);
  }
}

//Анімація блока Scills
function showScills(employeId, isAnimated){
  progressbarIntervals.forEach(function(el){
    clearInterval(el);
  });
  var containers = $('.canvas-wrap');
  document.querySelector('#person-pregress .caption-block p').textContent = dataArr[employeId][4];
  for(var i=0;i<4;i++){
    drawCircle(containers[i], dataArr[employeId][i],isAnimated);
  }
}

function  scrollCanvasHandler(){
  if( isVisible(document.querySelector('#person-pregress')) ){
    showScills(0,true);
    window.removeEventListener('scroll',scrollCanvasHandler);
  }
}
window.addEventListener('scroll',scrollCanvasHandler);
scrollCanvasHandler();


//clients-slider-top
/*
function clientsSliderMoove() {
  var ul = $('.clients-slider-wrapper ul');
  ul.find('li').eq(0).clone().appendTo(ul);
  ul.css({transition: 'all 1s', marginLeft: '-195px'});
  setTimeout(function(){ul.css({transition: 'none'});ul.find('li').eq(0).remove(); ul.css({marginLeft:'0'})},2000);
}
*/
function clientsSliderMoove() {
  var ul = document.querySelector('.clients-slider-wrapper ul');
  ul.appendChild(ul.firstElementChild.cloneNode(true));
  var liStyle = getComputedStyle( ul.firstElementChild );
  var marginLeft = parseFloat(liStyle.width) + parseFloat(liStyle.marginRight);
  ul.style.transition = 'margin-left 1s';
  ul.style.marginLeft = '-'+marginLeft+'px';
  setTimeout(function(){
    ul.style.transition = 'none';
    ul.removeChild(ul.firstElementChild);
    ul.style.marginLeft = '0';
    setTimeout(clientsSliderMoove,1500);
  },1500);
}
clientsSliderMoove();


//Clients-slider-bottom
$('.slide-nav li').on('click', function(){
  var offset = this.dataset.offset;
  var slider = document.querySelector('.clients-bottom-slider');
  //slider.style.marginLeft = offset;
  $(slider).css({transition: 'all 1s', marginLeft: offset});
  $('.slide-nav li.active').removeClass('active');
  $(this).addClass('active');
});


//Contact us
function showNotification(elem,message){
  if( elem.parentNode.querySelector('.notification') ){
    return;
  }
  elem.parentNode.style.position = 'relative';
  var notificationElem = document.createElement('span');
  notificationElem.className = 'notification';
  notificationElem.innerHTML = message || 'Поле містить некоректні символи!';
  elem.parentNode.appendChild(notificationElem);
}

function hideNofitication(elem){
  var notification = elem.parentNode.querySelector('.notification');
  if( notification ){
    elem.parentNode.removeChild(notification);
  }
}

$('#clientName,#clientEmail,#clientSubject').on('keyup',function(e){
  var isValid = {
    clientName: function() {
      return $('#clientName').val().toLowerCase().split("").every(function(el,i){
        return	/[a-z]/.test(el);
      });
    },
    clientEmail: function() {
      if( !$('#clientEmail').val().length ){
        return true;
      }
      return /(^[a-zA-Z0-9_.+]+@[a-zA-Z0-9]+\.[a-zA-Z0-9.]+$)/g.test( $('#clientEmail').val() );
    },
    clientSubject: function() {
      return $('#clientSubject').val().toLowerCase().split("").every(function(el,i){
        return /[a-z0-9]/.test(el);
      });
    }
  };

  if( isValid[this.id]() ){
    hideNofitication(this);
    return;
  }
  showNotification(this, this.dataset.notification);
});

$('#sendMessage').on('click',function(e){
  e.preventDefault();
});


//Scroll navigation
$('.scroll-btn').click(function(e){
    e.preventDefault();
    var strollTo = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(strollTo).offset().top }, 'slow');
});

});
