/* global pictures */
'use strict';

var filters = document.querySelector('.filters');

filters.classList.add('hidden');

var picturesBlock = document.querySelector('.pictures');
var templateElement = document.getElementById('picture-template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

var getPictureElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  container.appendChild(element);

  var backgroundImage = new Image();

  backgroundImage.src = data.url;
  element.appendChild(backgroundImage);

  backgroundImage.onload = function() {
    backgroundImage.setAttribute('width', '182');
    backgroundImage.setAttribute('height', '182');
  };

  backgroundImage.onerror = function() {
    backgroundImage.classList.add('picture-load-failure');
  };

  filters.classList.remove('hidden');

  return element;
};

pictures.forEach(function(picture) {
  getPictureElement(picture, picturesBlock);
});
