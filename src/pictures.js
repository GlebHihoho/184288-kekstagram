'use strict';

var pictures = [];

var filters = document.querySelector('.filters');
filters.classList.add('hidden');

var picturesBlock = document.querySelector('.pictures');
picturesBlock.classList.add('pictures-loading');

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

/** @param {function} callback */

var getPictures = function(callback) {
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} */

  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
    picturesBlock.classList.remove('pictures-loading');
  };
  xhr.open('GET', '//o0.github.io/assets/json/pictures.json', true);
  xhr.send();

  // xhr.timeout = 500;
  // xhr.ontimeout = function() {
  //
  //   picturesBlock.classList.add('pictures-failure');
  // };


  xhr.onerror = function() {
    picturesBlock.classList.add('pictures-failure');
  };

};

/** @param {Array.<Object>} pictures */
var renderPictures = function(picturess) {
  picturess.forEach(function(picture) {
    getPictureElement(picture, picturesBlock);
  });
};

getPictures(function(loadPictures) {
  pictures = loadPictures;
  renderPictures(pictures);
});
