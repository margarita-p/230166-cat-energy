'use strict';

(function () {

  var toggle = document.querySelector('.range__toggle');
  var scale = document.querySelector('.range__scale');
  var image = document.querySelector('.range__image-wrapper');
  var imageBefore = document.querySelector('.range__image--before');
  var imageAfter = document.querySelector('.range__image--after');
  var btn = document.querySelector('.range__btn');
  var btnBefore = document.querySelector('.range__btn--before');
  var btnAfter = document.querySelector('.range__btn--after');
  var tablet = window.matchMedia('(min-width: 768px)');
  var props = [
    {
      'left': '0',
      'right': 'auto',

      'widthBefore': '100%',
      'widthAfter': '0'
    },
    {
      'left': 'auto',
      'right': '0',
      'widthBefore': '0',
      'widthAfter': '100%'
    },
    {
      'left': 'calc(50% - 15px)',
      'right': 'auto',
      'widthBefore': '50%',
      'widthAfter': '50%'
    }
  ];

  var btnEvent = function (item) {
    toggle.style.left = item.left;
    toggle.style.right = item.right;
    imageBefore.style.width = item.widthBefore;
    imageAfter.style.width = item.widthAfter;
  };

  var onClickBtnBefore = function (evt) {
    evt.preventDefault();
    btnEvent(props[0]);
  };

  var onClickBtnAfter = function (evt) {
    evt.preventDefault();
    btnEvent(props[1]);
  };

  var onClickToggle = function (evt) {
    evt.preventDefault();
    btnEvent(props[2]);
  };

  var getWidthValue = function (item) {
    return parseInt(getComputedStyle(item).width, 10);
  };

  var onToggleMousedown = function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;
    var imageWidthValue = getWidthValue(image);
    var scaleWidthValue = getWidthValue(scale);
    var toggleWidthValue = getWidthValue(toggle);
    var distance = scaleWidthValue - toggleWidthValue;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;
      startCoords =  moveEvt.clientX;
      var currentCoords = toggle.offsetLeft - shift;
      var width = (100 / distance) * currentCoords;

      if (0 <= currentCoords && currentCoords <= distance) {
        toggle.style.left = currentCoords + 'px';
        imageBefore.style.width = 100 - width + '%';
        imageAfter.style.width = width + '%';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  btnBefore.addEventListener('click', onClickBtnBefore);
  btnAfter.addEventListener('click', onClickBtnAfter);
  toggle.addEventListener('dblclick', onClickToggle);

  if (tablet.matches) {
    toggle.addEventListener('mousedown', onToggleMousedown);
  }

})();
