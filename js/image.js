'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var ImageParams = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesContainer = document.querySelector('.ad-form__photo-container');
  var avatarChooser = document.querySelector('#avatar');
  var imageChooser = document.querySelector('#images');

  var filtrationByType = function (file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  };

  var changeAvatar = function (src) {
    avatarPreview.src = src;
  };

  var removeEmptyImg = function () {
    var emptyImg = document.querySelector('.ad-form__photo--empty');
    if (emptyImg) {
      emptyImg.remove();
    }
  };

  var addImages = function (src) {
    var newImage = document.createElement('div');
    var image = document.createElement('img');
    newImage.classList.add('ad-form__photo--added');
    image.src = src;
    image.style.width = ImageParams.WIDTH;
    image.style.height = ImageParams.HEIGHT;
    image.style.borderRadius = ImageParams.BORDER_RADIUS;
    newImage.appendChild(image);
    imagesContainer.appendChild(newImage);
    removeEmptyImg();
  };

  var addEmptyImg = function () {
    if (!document.querySelector('.ad-form__photo')) {
      var emptyImg = document.createElement('div');
      emptyImg.classList.add('ad-form__photo');
      emptyImg.classList.add('ad-form__photo--empty');
      imagesContainer.appendChild(emptyImg);
    } else {
      var emptyImgPhoto = document.querySelector('.ad-form__photo');
      emptyImgPhoto.classList.add('ad-form__photo--empty');
      imagesContainer.appendChild(emptyImgPhoto);
    }
  };

  var loadFile = function (chooser, func) {
    var files = Array.from(chooser.files).filter(filtrationByType);
    if (files) {
      files.forEach(function (file) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          func(evt.target.result);
        });
        reader.readAsDataURL(file);
      });
    }
  };

  var removeImages = function () {
    avatarPreview.src = DEFAULT_AVATAR;
    var addedImages = document.querySelectorAll('.ad-form__photo--added');
    if (addedImages) {
      addedImages.forEach(function (image) {
        image.remove();
      });
    }
    addEmptyImg();
  };

  var onAvatarChange = function (evt) {
    loadFile(evt.target, changeAvatar);
  };

  var onPhotoChange = function (evt) {
    loadFile(evt.target, addImages);
  };

  var activateImages = function () {
    avatarChooser.addEventListener('change', onAvatarChange);
    imageChooser.addEventListener('change', onPhotoChange);
  };

  var deactivateImages = function () {
    avatarChooser.removeEventListener('change', onAvatarChange);
    imageChooser.removeEventListener('change', onPhotoChange);
  };

  window.image = {
    remove: removeImages,
    activate: activateImages,
    deactivate: deactivateImages
  };
})();
