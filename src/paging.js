function initPaging() {
  document.getElementById('button-start').addEventListener('click', function() {
    document.getElementById('page-1').scrollIntoView({behavior: 'smooth', block: 'end'});
  });
  document.getElementById('back-to-top').addEventListener('click', function() {
    document.getElementById('main').scrollIntoView({behavior: 'smooth', block: 'start'});
  });
}

window.addEventListener('load', initPaging);

(function() {
  let elements;
  let windowHeight;

  function init() {
    elements = document.querySelectorAll('.box-hidden');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= -100) {
        element.classList.remove('box-hidden');
      }
    }
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
})();
