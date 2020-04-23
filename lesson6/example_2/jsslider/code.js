'use strict';

let images = ['img/1657.png', 'img/1877.png', 'img/1937.png'];
let currentImgIndex = 0;

let leftButton = document.querySelector('.button_left');
let rightButton = document.querySelector('.button_right');
let slider = document.querySelector('.slider');

let imgCenter = document.createElement('img');
imgCenter.src = images[currentImgIndex];
imgCenter.classList.add('slide_center');
slider.appendChild(imgCenter);

leftButton.addEventListener('click', function (event) {
    imgCenter.classList.add('slide-left');
});

rightButton.addEventListener('click', function (event) {
    imgCenter.classList.add('slide-right');
});

