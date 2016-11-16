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

  xhr.open('GET', '//o0.github.io/assets/json/pictures.json', true);

  xhr.timeout = 2000;

  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
    picturesBlock.classList.remove('pictures-loading');
  };

  xhr.ontimeout = function() {
    picturesBlock.classList.add('pictures-failure');
    xhr.abort();
  };

  xhr.onerror = function() {
    picturesBlock.classList.add('pictures-failure');
  };

  xhr.send();
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

// Работаем с фильтрами

var filterPopular = document.getElementById('filter-popular');
var filterNew = document.getElementById('filter-new');
var filterDiscussed = document.getElementById('filter-discussed');

function compareComments(valA, valB) {
  if (valA.comments < valB.comments) {
    return 1;
  } else if (valA.comments === valB.comments) {
    return 0;
  } else {
    return -1;
  }
}

filterPopular.onclick = function() {
  console.log(pictures);

};

filterNew.onclick = function() {
  console.log('new');
};

filterDiscussed.onclick = function() {
  var picture = picturesBlock.querySelectorAll('.picture');
  pictures.sort(compareComments);
  pictures.removeChild(picture[0]);
  // for (var i = 0; i < pictures.length; i++) {
  //   pictures.removeChild(picture[i]);
  //   console.log(pictures.length);
  // }
  console.log(pictures.length);
  console.log(picture);
  console.log(pictures);
  // return pictures;
};
