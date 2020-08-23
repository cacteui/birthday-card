/********************** ELEMENTS LIBRARY **********************/
const elements = {
    frontpage: document.querySelector('.frontpage'),
    frontpageBtn: document.querySelector('.frontpage__btn'),
    frontpageText: document.querySelector('.frontpage__text'),
    letter: document.querySelector('.letter'),
    letterBtn: document.querySelector('.letter__btn'),
    present: document.querySelector('.present'),
    presentClose: document.querySelector('.present__close'),
    presentImageContainer: document.querySelector('.present-gallery__image-container'),
    presentThumbBtns: document.querySelectorAll('.present-gallery__thumbnail'),
    arrowPrevious: document.querySelector('.present-gallery__arrow--previous'),
    arrowNext: document.querySelector('.present-gallery__arrow--next')
}

const classNames = {
    letterBtnAnimation: 'letter__btn-background--animation',
    presentCloseAnimation: 'present__close-background--animation'
}




/********************** CHANGING SLIDES **********************/
/* Clicking on Open Letter */
elements.frontpageBtn.addEventListener('click', () => {
    elements.frontpage.classList.add('frontpage--hide');
    elements.letter.classList.add('letter--show');
    elements.letterBtn.parentElement.classList.add(classNames.letterBtnAnimation);

    setTimeout(() => {
        elements.frontpage.classList.add('display-none');
    }, 2000);
});


/* Clicking on Open Present */
elements.letterBtn.addEventListener('click', () => {
    elements.letter.classList.add('letter--hide');
    elements.presentClose.parentElement.classList.add(classNames.presentCloseAnimation);
    elements.present.classList.remove('display-none');

    setTimeout(() => {
        elements.present.classList.add('present--show');
    }, 100);

    setTimeout(() => {
        elements.letter.classList.add('display-none');
    }, 1500);
});


/* Clicking on close button on present */
elements.presentClose.addEventListener('click', () => {
    elements.present.classList.remove('present--show');
    elements.letter.classList.remove('display-none');
    
    setTimeout(() => {
        elements.letter.classList.remove('letter--hide');
    }, 100);

    setTimeout(() => {
        elements.present.classList.add('display-none');
    }, 1500);
});




/********************** BUTTONS **********************/
const btnHover = (className, event) => {
    if (event.type === 'mouseover') {
        event.target.parentElement.classList.remove(className);
    }
    
    if (event.type === 'mouseout') {
        event.target.parentElement.classList.add(className);
    }
};

elements.letterBtn.addEventListener('mouseover', event => btnHover(classNames.letterBtnAnimation, event));
elements.letterBtn.addEventListener('mouseout', event => btnHover(classNames.letterBtnAnimation, event));

elements.presentClose.addEventListener('mouseover', event => btnHover(classNames.presentCloseAnimation, event));
elements.presentClose.addEventListener('mouseout', event => btnHover(classNames.presentCloseAnimation, event));





/********************** GALLERY **********************/
const presentThumbBtns = Array.from(elements.presentThumbBtns);

/* THUMBNAILS */
for (let btn in presentThumbBtns) {
    presentThumbBtns[btn].addEventListener('click', () => {

        let presentImage = document.querySelector('.present-gallery__image');
        const thumbValue = presentThumbBtns[btn].attributes['data-id'].value;
        
        insertNewImage(presentImage, thumbValue);
    });
}

const insertNewImage = (presentImage, imageId) => {
    const imgElement = '<img src="../img/vaegholder_' + imageId + '.jpg" alt="Zone Ume Vægholder" class="present-gallery__image" data-id="' + imageId + '">'
    presentImage.parentElement.removeChild(presentImage);
    elements.presentImageContainer.firstElementChild.insertAdjacentHTML('afterend', imgElement);
};


/* ARROWS */
const arrowClick = direction => {
    let presentImage = document.querySelector('.present-gallery__image');
    const currentId = parseInt(presentImage.attributes['data-id'].value);

    let imageId;

    if (direction === 'left') {
        if (currentId === 1) {
            imageId = 3;
        } else {
            imageId = currentId - 1;
        }
    } else {
        if (currentId === 3) {
            imageId = 1;
        } else {
            imageId = currentId + 1;
        }
    }

    insertNewImage(presentImage, imageId);
}

elements.arrowPrevious.addEventListener('click', () => arrowClick('left'));
elements.arrowNext.addEventListener('click', () => arrowClick('right'));






/********************** ANIMATE LETTERS **********************/
const spanText = text => {
	let words = text.textContent.split(' ');
	let spannedText = '';
	
	for (let string in words) {
		for (let letter in words[string]) {
			spannedText += `<span>${words[string][letter]}</span>`;
		}
		
		spannedText += ' ';
	}
	
	text.innerHTML = spannedText;
}

const animateLetters = letters => {
	if (!Array.isArray(letters)) letters = Array.from(letters);
	
	let delay = 0;
	
	for (let l in letters) {
		window.setTimeout(() => {
			letters[l].classList.add('frontpage__text--animated')
		}, delay);
		delay += 100;
	}
}

spanText(elements.frontpageText);

const textSpans = elements.frontpageText.querySelectorAll('span');
animateLetters(textSpans);