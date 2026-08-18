/*
    ==========================================
            ОТКРОЙ ДВЕРЬ
            SIMPLE OVERHAUL
    ==========================================

    Mechanic:

    1. Someone rings.
    2. Look through the peephole.
    3. Inspect them.
    4. Decide.
    5. Open or tell them to fuck off.

    30 Igors.
*/


/* ==========================================
   ELEMENTS
========================================== */

const roomText =
    document.getElementById("roomText");

const bellButton =
    document.getElementById("bellButton");

const visitorPanel =
    document.getElementById("visitorPanel");

const igorImage =
    document.getElementById("igorImage");

const igorName =
    document.getElementById("igorName");

const igorType =
    document.getElementById("igorType");

const igorDescription =
    document.getElementById("igorDescription");

const igorCounter =
    document.getElementById("igorCounter");

const inspectText =
    document.getElementById("inspectText");

const inspectButton =
    document.getElementById("inspectButton");

const openButton =
    document.getElementById("openButton");

const leaveButton =
    document.getElementById("leaveButton");

const message =
    document.getElementById("message");

const messageText =
    document.getElementById("messageText");


/* ==========================================
   30 IGORS
========================================== */

const igors = [

    {
        name: "Игорь Старый",
        type: "СОСЕД",
        description: "Старый мужик с пакетом.",
        image: "assets/igors/igor01.png",
        good: true,
        inspect: "Обычный старик. Дышит. Моргает."
    },

    {
        name: "Игорь Курьер",
        type: "КУРЬЕР",
        description: "Держит большую коробку.",
        image: "assets/igors/igor02.png",
        good: true,
        inspect: "На коробке твоё имя."
    },

    {
        name: "Игорь Врач",
        type: "ВРАЧ",
        description: "Белый халат и медицинская сумка.",
        image: "assets/igors/igor03.png",
        good: true,
        inspect: "Выглядит уставшим. Ничего странного."
    },

    {
        name: "Игорь Сосед",
        type: "СОСЕД",
        description: "Просит открыть дверь.",
        image: "assets/igors/igor04.png",
        good: true,
        inspect: "Ты видел его раньше."
    },

    {
        name: "Игорь Рабочий",
        type: "РАБОЧИЙ",
        description: "В руках инструменты.",
        image: "assets/igors/igor05.png",
        good: true,
        inspect: "Обычный ремонтник."
    },

    {
        name: "Игорь Полицейский",
        type: "ПОЛИЦИЯ",
        description: "Показывает удостоверение.",
        image: "assets/igors/igor06.png",
        good: true,
        inspect: "Удостоверение настоящее."
    },

    {
        name: "Игорь Пьяный",
        type: "ПЬЯНЫЙ",
        description: "Еле стоит.",
        image: "assets/igors/igor07.png",
        good: true,
        inspect: "Пьяный в мясо. Но человек."
    },

    {
        name: "Игорь В Костюме",
        type: "НЕИЗВЕСТНО",
        description: "Просто стоит.",
        image: "assets/igors/igor08.png",
        good: false,
        inspect: "Он не моргает."
    },

    {
        name: "Игорь Ребёнок",
        type: "РЕБЁНОК",
        description: "Маленький мальчик.",
        image: "assets/igors/igor09.png",
        good: true,
        inspect: "Он выглядит напуганным."
    },

    {
        name: "Игорь Женщина",
        type: "ЖЕНЩИНА",
        description: "Держит пакет продуктов.",
        image: "assets/igors/igor10.png",
        good: true,
        inspect: "Похоже, она действительно соседка."
    },

    {
        name: "Игорь Без Лица",
        type: "НЕЧТО",
        description: "На лице ничего нет.",
        image: "assets/igors/igor11.png",
        good: false,
        inspect: "Ты смотришь на него. Он смотрит обратно."
    },

    {
        name: "Игорь Высокий",
        type: "НЕИЗВЕСТНО",
        description: "Слишком высокий.",
        image: "assets/igors/igor12.png",
        good: false,
        inspect: "Его голова выше дверного глазка."
    },

    {
        name: "Игорь Улыбка",
        type: "НЕИЗВЕСТНО",
        description: "Улыбается.",
        image: "assets/igors/igor13.png",
        good: false,
        inspect: "Улыбка не меняется."
    },

    {
        name: "Игорь В Маске",
        type: "НЕИЗВЕСТНО",
        description: "Белая маска.",
        image: "assets/igors/igor14.png",
        good: false,
        inspect: "Под маской ничего не видно."
    },

    {
        name: "Игорь Мёртвый",
        type: "МЁРТВЫЙ",
        description: "Похож на старую фотографию.",
        image: "assets/igors/igor15.png",
        good: false,
        inspect: "Он не дышит."
    },

    {
        name: "Игорь Мокрый",
        type: "НЕИЗВЕСТНО",
        description: "Весь мокрый.",
        image: "assets/igors/igor16.png",
        good: false,
        inspect: "Под дверью появляется вода."
    },

    {
        name: "Игорь Бледный",
        type: "ЧЕЛОВЕК",
        description: "Очень бледный парень.",
        image: "assets/igors/igor17.png",
        good: true,
        inspect: "Выглядит больным."
    },

    {
        name: "Игорь Доктор",
        type: "ВРАЧ",
        description: "Говорит, что пришёл проверить тебя.",
        image: "assets/igors/igor18.png",
        good: true,
        inspect: "Он нервничает."
    },

    {
        name: "Игорь Пустой",
        type: "НЕИЗВЕСТНО",
        description: "Просто стоит у двери.",
        image: "assets/igors/igor19.png",
        good: false,
        inspect: "Он смотрит прямо в глазок."
    },

    {
        name: "Игорь Смешной",
        type: "СОСЕД",
        description: "Почему-то смеётся.",
        image: "assets/igors/igor20.png",
        good: true,
        inspect: "Да, он просто странный."
    },

    {
        name: "Игорь Старший",
        type: "СОСЕД",
        description: "Говорит, что забыл ключ.",
        image: "assets/igors/igor21.png",
        good: true,
        inspect: "Нормальный человек."
    },

    {
        name: "Игорь Ночной",
        type: "НЕИЗВЕСТНО",
        description: "Пришёл слишком поздно.",
        image: "assets/igors/igor22.png",
        good: false,
        inspect: "За ним нет тени."
    },

    {
        name: "Игорь С Другой Стороны",
        type: "НЕИЗВЕСТНО",
        description: "Стоит неподвижно.",
        image: "assets/igors/igor23.png",
        good: false,
        inspect: "Ты уверен, что он стоит снаружи?"
    },

    {
        name: "Игорь Дед",
        type: "СОСЕД",
        description: "Просит воды.",
        image: "assets/igors/igor24.png",
        good: true,
        inspect: "Обычный дед."
    },

    {
        name: "Игорь Почтальон",
        type: "ПОЧТА",
        description: "Принёс письмо.",
        image: "assets/igors/igor25.png",
        good: true,
        inspect: "Письмо настоящее."
    },

    {
        name: "Игорь В Чёрном",
        type: "НЕИЗВЕСТНО",
        description: "Чёрная одежда.",
        image: "assets/igors/igor26.png",
        good: false,
        inspect: "У него слишком длинные пальцы."
    },

    {
        name: "Игорь Тихий",
        type: "НЕИЗВЕСТНО",
        description: "Не говорит ни слова.",
        image: "assets/igors/igor27.png",
        good: false,
        inspect: "Он шепчет твоё имя."
    },

    {
        name: "Игорь Нормальный",
        type: "ЧЕЛОВЕК",
        description: "Выглядит абсолютно обычно.",
        image: "assets/igors/igor28.png",
        good: true,
        inspect: "Ничего подозрительного."
    },

    {
        name: "Игорь Странный",
        type: "НЕИЗВЕСТНО",
        description: "Что-то с ним не так.",
        image: "assets/igors/igor29.png",
        good: false,
        inspect: "Его глаза смотрят не туда."
    },

    {
        name: "Игорь Последний",
        type: "???",
        description: "Он знает, что ты смотришь.",
        image: "assets/igors/igor30.png",
        good: false,
        inspect: "Он улыбается прямо в глазок."
    }

];


/* ==========================================
   GAME STATE
========================================== */

let currentIgor = null;

let currentIndex = 0;

let gameStarted = false;


/* ==========================================
   RANDOM IGOR
========================================== */

function chooseIgor() {

    if (currentIndex >= 30) {

        endGame();

        return;

    }

    currentIgor =
        igors[currentIndex];

    currentIndex++;

    showIgor();

}


/* ==========================================
   SHOW IGOR
========================================== */

function showIgor() {

    igorImage.src =
        currentIgor.image;

    igorName.textContent =
        currentIgor.name;

    igorType.textContent =
        currentIgor.type;

    igorDescription.textContent =
        currentIgor.description;

    inspectText.textContent =
        "Посмотри внимательнее.";

    igorCounter.textContent =
        `${currentIndex} / 30`;

    visitorPanel.classList.remove(
        "hidden"
    );

    roomText.textContent =
        "Кто-то у двери.";

}


/* ==========================================
   BELL
========================================== */

bellButton.onclick = () => {

    if (!gameStarted) {

        gameStarted = true;

    }

    if (currentIgor)
        return;

    chooseIgor();

};


/* ==========================================
   INSPECT
========================================== */

inspectButton.onclick = () => {

    if (!currentIgor)
        return;

    inspectText.textContent =
        currentIgor.inspect;

};


/* ==========================================
   OPEN
========================================== */

openButton.onclick = () => {

    if (!currentIgor)
        return;

    if (currentIgor.good) {

        closeVisitor();

        showMessage(
            `${currentIgor.name} вошёл.\n\n` +
            `Через пару секунд он ушёл.`
        );

    } else {

        closeVisitor();

        showMessage(
            "Дверь открылась.\n\n" +
            "Он вошёл.\n\n" +
            "Тебе стоило посмотреть внимательнее."
        );

    }

};


/* ==========================================
   LEAVE
========================================== */

leaveButton.onclick = () => {

    if (!currentIgor)
        return;

    const name =
        currentIgor.name;

    closeVisitor();

    showMessage(
        `${name}\n\n` +
        `ушёл нахуй.`
    );

};


/* ==========================================
   CLOSE VISITOR
========================================== */

function closeVisitor() {

    visitorPanel.classList.add(
        "hidden"
    );

    roomText.textContent =
        "Тишина...";

    currentIgor = null;

}


/* ==========================================
   MESSAGE
========================================== */

function showMessage(text) {

    messageText.textContent =
        text;

    message.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        message.classList.add(
            "hidden"
        );

    }, 2200);

}


/* ==========================================
   END
========================================== */

function endGame() {

    gameStarted = false;

    roomText.textContent =
        "Все 30 Игорей пришли.";

    showMessage(
        "30 ИГОРЕЙ\n\n" +
        "Ночь закончена.\n\n" +
        "Или нет."
    );

    currentIndex = 0;

}
