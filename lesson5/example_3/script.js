'use strict';

let showModelWindowButton = document.querySelector('button');
let hiddenWindow = document.querySelector('.modal-window');

showModelWindowButton.addEventListener('click', function (event) {
    hiddenWindow.style.display = 'flex';
    hiddenWindow.classList.add('scale-up-bl');
})