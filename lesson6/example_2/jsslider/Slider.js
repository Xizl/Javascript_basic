class Slider {
    constructor(images) {
        this.images = images;
        this.currentImgIndex = 0;
        this.leftButton = null;
        this.slider = null;
        this.rightButton = null;
        this.sliderBox = null;
        this.sliderItems = null;
        this.slideImg = null;
    }

    createLeftButton() {
        let iLeft = document.createElement('i');
        iLeft.classList.add('fas');
        iLeft.classList.add('fa-angle-left');

        this.leftButton = document.createElement('button');
        this.leftButton.classList.add('button');
        this.leftButton.appendChild(iLeft);
    }

    createRightButton() {
        let iRight = document.createElement('i');
        iRight.classList.add('fas');
        iRight.classList.add('fa-angle-right');        

        this.rightButton = document.createElement('button');
        this.rightButton.classList.add('button');
        this.rightButton.appendChild(iRight);
    }

    createSlider() {
        this.slider = document.querySelector('.slider');
        this.slider.appendChild(this.leftButton);
        this.slider.appendChild(this.sliderBox);
        this.slider.appendChild(this.rightButton);        
    }

    createSliderBox() {
        this.sliderBox = document.createElement('div');
        this.sliderBox.classList.add('slider_box');
    }

    createSlideItems() {
        this.sliderItems = document.createElement('div');
        this.sliderItems.classList.add('slider_items');
        this.sliderBox.appendChild(this.sliderItems);
    }

    createImages() {
        this.images.forEach(image => {
            this.slideImg = document.createElement('img');
            this.slideImg.src = image;
            this.sliderItems.appendChild(this.slideImg);
        });        
    }

    toggleButtons() {
        switch (this.currentImgIndex) {
            case 0:
                this.leftButton.style.color = '#ccc';
                this.leftButton.classList.remove('button');
                break;
            case 2:
                this.rightButton.style.color = '#ccc';
                this.rightButton.classList.remove('button');
                break;
            default:
                this.leftButton.style.color = 'black';
                this.leftButton.classList.add('button');
                this.rightButton.style.color = 'black';  
                this.rightButton.classList.add('button');
        }
    }

    init() {
        this.createLeftButton();
        this.createSliderBox();
        this.createRightButton();
        this.createSlideItems();
        this.createSlider();        
        this.createImages();
        this.toggleButtons();

        this.leftButton.addEventListener('click', this.getPreviousSlide.bind(this));       

        this.rightButton.addEventListener('click', this.getNextSlide.bind(this));
        
    }

    translateImg(step) {
        this.sliderItems.style.transform = 'translateX(' + step * -100 + '%)';
    }

    getNextSlide() {
        this.currentImgIndex++;
        if (this.currentImgIndex > this.images.length - 1) {
            this.currentImgIndex--;
            return;
        }
        this.translateImg(this.currentImgIndex);
        this.toggleButtons();        
    }

    getPreviousSlide() {
        this.currentImgIndex--;
        if (this.currentImgIndex < 0) {
            this.currentImgIndex++;
            return;
        }
        this.translateImg(this.currentImgIndex);
        this.toggleButtons(); 
    }
}

'use strict';
let images = ['img/1657.png', 'img/1877.png', 'img/1937.png'];

let slider = new Slider(images);
slider.init();