let counter = 0;
let coins = 0;
let doubleClicks = false;
let passiveIncome = false;
const passiveIncomeTime = 15; // seconds
let passiveIncomeInterval;
let availableColors = ['white']; // White is available by default
let clickButtonColor = 'white';

document.getElementById('clickButton').style.backgroundColor = clickButtonColor;
document.getElementById('clickButton').style.color = 'black';

function incrementCounter() {
    if (doubleClicks) {
        counter += 2;
    } else {
        counter += 1;
    }
    document.getElementById('counter').textContent = `Клики: ${counter}`;
}

function toggleShop() {
    const shop = document.getElementById('shop');
    const shopButton = document.getElementById('shopButton');
    if (shop.style.display === 'none') {
        shop.style.display = 'block';
        shopButton.textContent = 'Закрыть Магазин';
    } else {
        shop.style.display = 'none';
        shopButton.textContent = 'Магазин';
    }
}

function toggleConversion() {
    const conversion = document.getElementById('conversion');
    const conversionButton = document.getElementById('conversionButton');
    if (conversion.style.display === 'none') {
        conversion.style.display = 'block';
        conversionButton.textContent = 'Закрыть Конвертацию';
    } else {
        conversion.style.display = 'none';
        conversionButton.textContent = 'Клики => Монеты';
    }
}

function toggleColorPurchase() {
    const colorPurchase = document.getElementById('colorPurchase');
    const colorPurchaseButton = document.getElementById('colorPurchaseButton');
    if (colorPurchase.style.display === 'none') {
        colorPurchase.style.display = 'block';
        colorPurchaseButton.textContent = 'Закрыть Покупку Цветов';
    } else {
        colorPurchase.style.display = 'none';
        colorPurchaseButton.textContent = 'Покупка цветов';
    }
}

function toggleColorSelection() {
    const colorSelection = document.getElementById('colorSelection');
    const colorSelectionButton = document.getElementById('colorSelectionButton');
    if (colorSelection.style.display === 'none') {
        colorSelection.style.display = 'block';
        colorSelectionButton.textContent = 'Закрыть Выбор Цвета';
    } else {
        colorSelection.style.display = 'none';
        colorSelectionButton.textContent = 'Выбор цвета';
    }
}

function exchangeClicks(clicksRequired, coinsReward) {
    if (counter >= clicksRequired) {
        counter -= clicksRequired;
        coins += coinsReward;
        document.getElementById('counter').textContent = `Клики: ${counter}`;
        document.getElementById('coins').textContent = `Монеты: ${coins}`;
    } else {
        alert('Недостаточно кликов для обмена.');
    }
}

function buyDoubleClicks() {
    if (coins >= 100) {
        coins -= 100;
        doubleClicks = true;
        document.getElementById('coins').textContent = `Монеты: ${coins}`;
        document.getElementById('doubleClickStatus').textContent = 'Х2 Клики: куплены';
        document.getElementById('doubleClickStatus').classList.remove('not-bought');
        document.getElementById('doubleClickStatus').classList.add('bought');
    } else {
        alert('Недостаточно монет для покупки Х2 Клики.');
    }
}

function buyPassiveIncome() {
    if (coins >= 500) {
        coins -= 500;
        passiveIncome = true;
        document.getElementById('coins').textContent = `Монеты: ${coins}`;
        document.getElementById('passiveIncomeStatus').textContent = 'Пассивный доход: куплен';
        document.getElementById('passiveIncomeStatus').classList.remove('not-bought');
        document.getElementById('passiveIncomeStatus').classList.add('bought');
        startPassiveIncome();
    } else {
        alert('Недостаточно монет для покупки Пассивного Дохода.');
    }
}

function buyColor(color) {
    if (coins >= 5) {
        coins -= 5;
        availableColors.push(color);
        document.getElementById('coins').textContent = `Монеты: ${coins}`;
        alert(`Вы купили цвет: ${color}`);
    } else {
        alert('Недостаточно монет для покупки цвета.');
    }
}

function selectColor(color) {
    if (availableColors.includes(color)) {
        clickButtonColor = color;
        document.getElementById('clickButton').style.backgroundColor = color;
        document.getElementById('clickButton').style.color = (color === 'black' || color === 'purple' || color === 'magenta' || color === 'brown' || color === 'violet' || color === 'turquoise') ? 'white' : 'black';
    } else {
        alert('Этот цвет не куплен.');
    }
}

function startPassiveIncome() {
    updatePassiveIncomeTimer();
    passiveIncomeInterval = setInterval(() => {
        if (passiveIncome) {
            coins += 10;
            document.getElementById('coins').textContent = `Монеты: ${coins}`;
            resetPassiveIncomeTimer();
        }
    }, passiveIncomeTime * 1000);
}

function updatePassiveIncomeTimer() {
    let timeRemaining = passiveIncomeTime;
    const timerElement = document.getElementById('passiveIncomeTimer');
    timerElement.textContent = `Время до следующей выплаты пассивного дохода: ${timeRemaining} сек`;
    timerElement.style.display = 'block';

    const timerInterval = setInterval(() => {
        if (!passiveIncome) {
            clearInterval(timerInterval);
            timerElement.style.display = 'none';
        } else if (timeRemaining <= 0) {
            clearInterval(timerInterval);
        } else {
            timeRemaining--;
            timerElement.textContent = `Время до следующей выплаты пассивного дохода: ${timeRemaining} сек`;
        }
    }, 1000);
}

function resetPassiveIncomeTimer() {
    updatePassiveIncomeTimer();
}
