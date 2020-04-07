'use strict';

/*---------------------------------------------------common button class------------------------------------- */
class Button {

    constructor(code) {
            this.code = code;
            this.element = document.createElement('div');
            this.element.classList.add('button', 'keyboard__button');
            Button.shift = false;
            Button.capsLock = false;
            Button.lang = 'en';
            
            let handleKeyDownBind = this.handleKeyDown.bind(this);
            let handleKeyUpBind = this.handleKeyUp.bind(this);

            this.element.addEventListener('mousedown', handleKeyDownBind);
            this.element.addEventListener('mouseup', handleKeyUpBind);
            this.updateKeyNote();
    }

    static changeCapslockState() {
        if (Button.capsLock) {
            Button.capsLock = false;
        } else {
            Button.capsLock = true;
        }
    }

    static enableShift() {
        Button.shift = true;
    }

    static disableShift() {
        Button.shift = false;
    }


    static changeLanguage() {
        if (Button.lang == 'en') {
            Button.lang = 'rus';
        } else {
            Button.lang = 'en';
        }
    }

    static setKeyboard(keyboard) {
        Button.keyboard = keyboard;
        Button.keyboard.classList.add('keyboard');
    }

    static getKeyboard() {
        return Button.keyboard;
    }

    static setInput(input) {
        Button.input = input;
        Button.input.classList.add('input');
    }

    static getInput() {
        return Button.input;
    }

    static addToInput(key) {
        Button.input.value = Button.input.value + key;
    }

    static removeLastElement() {
        Button.input.value = Button.input.value.slice(0, Button.input.value.length - 1);
    }

    updateKeyNote() {
        this.element.innerHTML = this.getKeyName();
    }

    getCode() {
        return this.code;
    }

    getKeyName() {
        return this.getCode();
    }

    getElement() {
        return this.element;
    }

    handleKeyDown() {
        this.element.classList.add('button_active');
    }

    handleKeyUp() {
        this.element.classList.remove('button_active');
    }
}

/*---------------------------------------------------control button class------------------------------------- */
class ControlButton extends Button {

    constructor(code, symbol, type = 's') {
        super(code);
        if (type == 'l') {
            this.element.classList.add('button_long');
        } 
        this.symbol = symbol;
        this.element.innerHTML = this.getKeyName();
    }

    getKeyName() {
        return this.symbol;
    }
}

/*---------------------------------------------------Symbol button class------------------------------------- */
class SymbolButton extends Button {

    constructor(code, key, shiftKey, cyrillicKey, cyrillicShiftKey) {
        super(code);
        this.key = key;
        this.shiftKey = shiftKey;
        this.cyrillicKey = cyrillicKey;
        this.cyrillicShiftKey = cyrillicShiftKey;
        this.element.innerText = this.getKeyName();
        if (code == 'Space') {
            this.element.classList.add('button_space');
        }
    }

    getKeyName() {
        if (Button.lang == 'en') {
            if (!Button.capsLock) {
                if (Button.shift) {
                    return this.shiftKey;
                } else {
                    return this.key;
                }
            } else {
                if (Button.shift) {
                    return this.key;
                } else {
                    return this.shiftKey;
                }
            }
        } else if (Button.lang == 'rus') {
            if (!Button.capsLock) {
                if (Button.shift) {
                    return this.cyrillicShiftKey;
                } else {
                    return this.cyrillicKey;
                }
            } else {
                if (Button.shift) {
                    return this.cyrillicKey;
                } else {
                    return this.cyrillicShiftKey;
                }
            }
        }
    }

    getCode() {
        return this.code;
    }

    handleKeyDown() {
        super.handleKeyDown();
        Button.addToInput(this.getKeyName());
    }
}

/*---------------------------------------------------Creating an array of rows of buttons using class constructors------------------------------------- */
let keys = [
    [
        new SymbolButton('Backquote', '`', '~', 'ё', 'Ё'),
        new SymbolButton('Digit1', '1', '!', '1', '!'),
        new SymbolButton('Digit2', '2', '@', '2', '"'),
        new SymbolButton('Digit3', '3', '#', '3', '№'),
        new SymbolButton('Digit4', '4', '$', '4', ';'),
        new SymbolButton('Digit5', '5', '%', '5', '%'),
        new SymbolButton('Digit6', '6', '^', '6', ':'),
        new SymbolButton('Digit7', '7', '&', '7', '?'),
        new SymbolButton('Digit8', '8', '*', '8', '*'),
        new SymbolButton('Digit9', '9', '(', '9', '('),
        new SymbolButton('Digit0', '0', ')', '0', ')'),
        new SymbolButton('Minus', '-', '_', '-', '_'),
        new SymbolButton('Equal', '=', '+', '=', '+'),
        new ControlButton('Backspace', '⟽', 'l')
    ],

    [
        new ControlButton('Tab', 'Tab'),
        new SymbolButton('KeyQ', 'q', 'Q', 'й', 'Й'),
        new SymbolButton('KeyW', 'w', 'W', 'ц', 'Ц'),
        new SymbolButton('KeyE', 'e', 'E', 'у', 'У'),
        new SymbolButton('KeyR', 'r', 'R', 'к', 'К'),
        new SymbolButton('KeyT', 't', 'T', 'е', 'Е'),
        new SymbolButton('KeyY', 'y', 'Y', 'н', 'Н'),
        new SymbolButton('KeyU', 'u', 'U', 'г', 'Г'),
        new SymbolButton('KeyI', 'i', 'I', 'ш', 'Ш'),
        new SymbolButton('KeyO', 'o', 'O', 'щ', 'Щ'),
        new SymbolButton('KeyP', 'p', 'P', 'з', 'З'),
        new SymbolButton('BracketLeft', '[', '{', 'х', 'Х'),
        new SymbolButton('BracketRight', ']', '}', 'ъ', 'Ъ'),
        new SymbolButton('Backslash', '/', '|', '\\', '/'),
        new ControlButton('Delete', 'Del')
    ],

    [
        new ControlButton('capslock', 'CapsLock', 'l'),
        new SymbolButton('KeyA', 'a', 'A', 'ф', 'Ф'),
        new SymbolButton('KeyS', 's', 'S', 'ы', 'Ы'),
        new SymbolButton('KeyD', 'd', 'D', 'в', 'В'),
        new SymbolButton('KeyF', 'f', 'F', 'а', 'А'),
        new SymbolButton('KeyG', 'g', 'G', 'п', 'П'),
        new SymbolButton('KeyH', 'h', 'H', 'р', 'Р'),
        new SymbolButton('KeyJ', 'j', 'J', 'о', 'О'),
        new SymbolButton('KeyK', 'k', 'K', 'л', 'Л'),
        new SymbolButton('KeyL', 'l', 'L', 'д', 'Д'),
        new SymbolButton('Semicolon', ';', ':', 'ж', 'Ж'),
        new SymbolButton('Quote', '\'', '"', 'э', 'Э'),
        new ControlButton('Enter', 'Enter', 'l')
    ],

    [
        new ControlButton('ShiftLeft', 'Shift', 'l'),
        new SymbolButton('KeyZ', 'z', 'Z', 'я', 'Я'),
        new SymbolButton('KeyX', 'x', 'X', 'ч', 'Ч'),
        new SymbolButton('KeyC', 'c', 'C', 'с', 'С'),
        new SymbolButton('KeyV', 'v', 'V', 'м', 'М'),
        new SymbolButton('KeyB', 'b', 'B', 'и', 'И'),
        new SymbolButton('KeyN', 'n', 'N', 'т', 'Т'),
        new SymbolButton('KeyM', 'm', 'M', 'ь', 'Ь'),
        new SymbolButton('Comma', ',', '<', 'б', 'Б'),
        new SymbolButton('Period', '.', '>', 'ю', 'Ю'),
        new SymbolButton('Slash', '/', '?', '.', ','),
        new ControlButton('ArrowUp', '↑'),
        new ControlButton('ShiftRight', 'Shift','l')
    ],
    
    [
        new ControlButton('ControlLeft', 'Ctrl'),
        new ControlButton('MetaLeft', 'win'),
        new ControlButton('AltLeft', 'Alt'),
        new SymbolButton('Space', ' ', ' ', ' ', ' '),
        new ControlButton('AltRight', 'Alt'),
        new ControlButton('ArrowLeft', '←'),
        new ControlButton('ArrowDown', '↓'),
        new ControlButton('ArrowRight', '→'),
        new ControlButton('ControlRight', 'Ctrl')
    ]
]

/*---------------------------------------------Input initialization------------------------------------------- */
Button.setInput(document.createElement('textarea'));
let input = Button.getInput();

/*--------------------------------------------Keyboard-------------------------------------------- */
Button.setKeyboard(document.createElement('div'));
let keyboard = Button.getKeyboard();

/*-----------------------------------------Page creation----------------------------------------------- */
document.body.classList.add('body');
document.body.append(input);
document.body.append(keyboard);

keys.forEach(array => {
    array.forEach(button => {
        keyboard.append(button.getElement());
    });
});

/*Notes*/
let descriptionOS = document.createElement('p');
let descriptionLanguageSwitch = document.createElement('p');

descriptionOS.innerHTML = 'The keyboard made in Windows';
descriptionLanguageSwitch.innerHTML = 'To change language press CTRL + ALT';

descriptionOS.classList.add('description');
descriptionLanguageSwitch.classList.add('description');

document.body.append(descriptionOS, descriptionLanguageSwitch);


/*------------------------------------------Events---------------------------------------------- */
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keydown', changeLanguage);
document.addEventListener('keydown', enableShift);
document.addEventListener('keydown', handleEnter);
document.addEventListener('keydown', handleBackspace);
document.addEventListener('keydown', handleCapsLock);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('keyup', disableShift);

function updateKeyValues() {
    keys.forEach( array => {
        array.forEach( button => {
            button.updateKeyNote();
        })
    });
}



/*-----------------------------------------Listeners for them----------------------------------------------- */
function handleKeyDown(event) {
    event.preventDefault();
    keys.forEach( array => {
        array.forEach( button => {
            if (event.code == button.getCode()) {
                button.handleKeyDown();
            }
        });
    });
}

function handleKeyUp(event) {
    event.preventDefault();
    keys.forEach( array => {
        array.forEach( button => {
            if (event.code == button.getCode()) {
                button.handleKeyUp();
            }
        });
    });
}

function changeLanguage(event) {
    if ((event.code == 'AltLeft' || event.code == 'AltRight') && event.ctrlKey) {
        Button.changeLanguage();
        keys.forEach( array => {
            array.forEach( button => {
                button.updateKeyNote();
            });
        });
    }
}

function enableShift(event) {
    if (event.shiftKey) {
        Button.enableShift();
        keys.forEach( array => {
            array.forEach( button => {
                button.updateKeyNote();
            })
        });
    }
}

function disableShift(event) {
    if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
        Button.disableShift();
        keys.forEach( array => {
            array.forEach( button => {
                button.updateKeyNote();
            })
        });
    }
}

function handleCapsLock(event) {
    if (event.code == 'CapsLock') {
        Button.changeCapslockState();
        updateKeyValues();
    }
}

function handleEnter(event) {
    if (event.code == 'Enter') {
        Button.addToInput('\n');
    }
}

function handleBackspace(event) {
    if (event.code == 'Backspace') {
        Button.removeLastElement();
    }
}