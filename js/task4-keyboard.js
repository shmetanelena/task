const alphabets = [
    {
        name: 'ENG',
        letters: 'ABCDEFGHJIKLMNOPRSTUVWXYZ',
    },
    {
        name: 'РУС',
        letters: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
    },
    {
        name: 'УКР',
        letters: 'АБВГҐДЕЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЭЮЯ',
    },
];
let alphabetIndex = 0;
const fixedLetters = "_0123456789!?'";

const cursor = String.fromCharCode(182);

const textEl = document.querySelector('#text');
const keyboard = document.querySelector('#keyboard');
const keyboardFixed = document.querySelector('#keyboard-fixed');
const keyboardService = document.querySelector('#keyboard-service');

function createButton(textContent, dataId, onClick) {
    const button = document.createElement('button');
    button.setAttribute('data-id', dataId);
    button.textContent = textContent;
    button.addEventListener('click', onClick);
    button.addEventListener('click', logButtonClick);
    return button;
}

function typeLetter(event) {
    const letter = event.currentTarget.dataset.id;
    const [l, r] = textEl.textContent.split(cursor);
    textEl.textContent = l + letter + cursor + r;
}

function logButtonClick(event) {
    console.log('Clicked ' + event.currentTarget.dataset.id);
}

const buttonDel = createButton('DEL', 'DELETE', event => {
    const [l, r] = textEl.textContent.split(cursor);
    if (l.length > 0) {
        textEl.textContent = l.slice(0, l.length - 1) + cursor + r;
    }
});

function setCurrentLang() {
    keyboard.querySelectorAll('button').forEach(elem => elem.remove());
    const buttons = [...alphabets[alphabetIndex].letters].map(letter => createButton(letter, letter, typeLetter));
    keyboard.append(...buttons);
    buttonLang.textContent = alphabets[alphabetIndex].name;
}

const buttonLang = createButton('', 'LANG', event => {
    alphabetIndex += 1;
    alphabetIndex %= alphabets.length;
    setCurrentLang();
});

const buttonLeft = createButton('<', 'LEFT', event => {
    const [l, r] = textEl.textContent.split(cursor);
    if (l.length > 0) {
        textEl.textContent = l.slice(0, l.length - 1) + cursor + l.slice(l.length - 1) + r;
    }
});

const buttonRight = createButton('>', 'RIGHT', event => {
    const [l, r] = textEl.textContent.split(cursor);
    if (r.length > 0) {
        textEl.textContent = l + r.slice(0, 1) + cursor + r.slice(1);
    }
});

const buttonsFixed = [...fixedLetters].map(letter => createButton(letter, letter, typeLetter));
keyboardFixed.append(...buttonsFixed);
keyboardService.append(buttonLang, buttonLeft, buttonRight, buttonDel);
setCurrentLang();
textEl.textContent = cursor;

//console.log(buttonLang);
