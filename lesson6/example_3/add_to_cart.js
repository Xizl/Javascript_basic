'use strict';

class Card {
    constructor(card, cart) {
        this.cardTextName = card.querySelector('.card_text_name').innerText;       
        this.cardTextPrice = card.querySelector('.card_text_price').innerText;
        this.cardImg = card.querySelector('.card_img').style.backgroundImage.slice(4, -1).replace(/"/g, "");    
        this.addCartButton = card.querySelector('.add_cart');        
        this.addCartButton.addEventListener('click', () => { cart.addCartItem(this); });
    };
}

class Cart {
    constructor() {
        this.myAccountDropDownMenu = document.querySelector('.my_account_drop_down_menu');
        this.totalPrice = this.myAccountDropDownMenu.querySelector('.total_price');
        this.itemsContainer = this.myAccountDropDownMenu.querySelector('.items_container');
        this.cartItemsNumberSelector = document.querySelector('.cart_items_number');
        this.cartItemsNumber = +this.cartItemsNumberSelector.innerText;
        this.itemsArray = [];        
    }

    addCartItem(newItem) {
        
        let matchFound = false;
        let items = this.itemsContainer.querySelectorAll('.item');

        for (let i = 0; i < this.itemsArray.length; i++) {

            let itemImg = this.itemsArray[i].querySelector('img').getAttribute('src');
            //if this is the same cards
            //TODO: id should be used instead of img urls.
            if (itemImg === newItem.cardImg) {
                let itemCount = this.itemsArray[i].querySelector('.item_count').innerText;
                itemCount = parseInt(itemCount);
                itemCount++;
                this.itemsArray[i].querySelector('.item_count').innerText = itemCount + ' ';

                matchFound = true;
                break;
            }
        }

        if (!matchFound) {
            let item = this.createItem(newItem); //TODO: items should be a separate Class with method to get item's count and item's img.
            this.itemsContainer.appendChild(item);
            this.itemsArray.push(item); 
        }

        this.incrementCartItemsNumber();
        this.handleTotalSum();
    }

    removeCartItem(item) {

        let itemCount = item.querySelector('.item_count').innerText;
        itemCount = parseInt(itemCount); 

        for (let i = 0; i < itemCount; i++)
            this.decrementCartItemsNumber();

        let removeIndex = this.itemsArray.indexOf(item);
        this.itemsArray.splice(removeIndex, 1);

        this.itemsContainer.removeChild(item);
        

        this.handleTotalSum()
    }

    incrementCartItemsNumber() {
        this.cartItemsNumber++;
        this.cartItemsNumberSelector.innerText = this.cartItemsNumber;
    }

    decrementCartItemsNumber() {
        this.cartItemsNumber--;
        this.cartItemsNumberSelector.innerText = this.cartItemsNumber;
    }

    handleTotalSum() {

        let totalSum = 0;

        this.itemsArray.forEach(function (item) {
            let price = item.querySelector('.num_price').innerText;
            price = parseFloat(price.replace('$', ''));

            let itemCount = item.querySelector('.item_count').innerText;
            itemCount = parseInt(itemCount);
            totalSum += price * itemCount;
        });

        this.totalPrice.innerText = '$' + totalSum;

    }


    /*<div class="item">
        <a href="single.html"><img src="img/my_cart_good1.png" alt="item"></a>
        <div class="item_description">
            <h5>rebox zane</h5>
            <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                    class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i
                    class="far fa-star"></i>
            </span>
            <span class="item_count">1</span> <span class="x">x</span> <span
                class="num_price">$250</span>
        </div>
        <button class="close_item button"><i class="fas fa-times-circle"></i></button>
    </div>*/
    createItem(newItem) {

        let item = document.createElement('div');
        item.classList.add('item');

        let aRef = document.createElement('a');
        aRef.setAttribute('href', 'single.html');
        
        let imgRef = document.createElement('img');
        imgRef.setAttribute('src', newItem.cardImg);
        imgRef.setAttribute('alt', 'item');
        aRef.appendChild(imgRef);        

        let itemDescription = document.createElement('div');
        itemDescription.classList.add('item_description');

        let h5 = document.createElement('h5');
        h5.innerText = newItem.cardTextName;
        itemDescription.appendChild(h5);

        let spanStars = document.createElement('span');
        spanStars.classList.add('stars');

        for (let i = 0; i < 5; i++) {
            let star = document.createElement('i');
            star.classList.add('fas'); //or 'far'
            star.classList.add('fa-star'); //or 'fa-star-half-alt'
            spanStars.appendChild(star);
        }

        itemDescription.appendChild(spanStars);

        let itemCount = document.createElement('span');
        itemCount.classList.add('item_count');
        itemCount.innerText = '1 ';
        itemDescription.appendChild(itemCount);

        let spanX = document.createElement('span');
        spanX.classList.add('x');
        spanX.innerText = 'x ';
        itemDescription.appendChild(spanX);

        let numPrice = document.createElement('span');
        numPrice.classList.add('num_price');
        numPrice.innerText = newItem.cardTextPrice;
        itemDescription.appendChild(numPrice);        

        let button = document.createElement('button');
        button.classList.add('close_item');
        button.classList.add('button');

        let iClose = document.createElement('i');
        iClose.classList.add('fas');
        iClose.classList.add('fa-times-circle');
        button.appendChild(iClose);

        item.appendChild(aRef);
        item.appendChild(itemDescription);
        item.appendChild(button);

        button.addEventListener('click', () => { this.removeCartItem(item); });
        
        return item;
    }
}

let cart = new Cart();
let myAccountButton = document.querySelector('.my_account');
let cardsSelector = document.querySelectorAll('.card');
let cards = [];

cardsSelector.forEach(function (card) {
    cards.push(new Card(card, cart));
});

myAccountButton.addEventListener('click', function (event) {

    let myAccountDropDownMenu = document.querySelector('.my_account_drop_down_menu');
    let display = getComputedStyle(myAccountDropDownMenu).display;

    if (display === 'none') {
        myAccountDropDownMenu.style.display = 'block';
    } else {
        myAccountDropDownMenu.style.display = 'none';
    }

});

