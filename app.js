/* =========================================================
   ОТКРОЙ ДВЕРЬ
   SIMPLE OVERHAUL
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const bellButton =
    document.getElementById("bellButton");

const status =
    document.getElementById("status");

const eventPanel =
    document.getElementById("eventPanel");

const eventTitle =
    document.getElementById("eventTitle");

const eventDescription =
    document.getElementById("eventDescription");

const eventTime =
    document.getElementById("eventTime");

const lookButton =
    document.getElementById("lookButton");

const ignoreButton =
    document.getElementById("ignoreButton");

const inspect =
    document.getElementById("inspect");

const closeInspect =
    document.getElementById("closeInspect");

const igorImage =
    document.getElementById("igorImage");

const igorName =
    document.getElementById("igorName");

const igorType =
    document.getElementById("igorType");

const igorDescription =
    document.getElementById("igorDescription");

const igorAge =
    document.getElementById("igorAge");

const igorState =
    document.getElementById("igorState");

const igorReaction =
    document.getElementById("igorReaction");

const igorLore =
    document.getElementById("igorLore");

const openButton =
    document.getElementById("openButton");

const rejectButton =
    document.getElementById("rejectButton");

const message =
    document.getElementById("message");

const messageTitle =
    document.getElementById("messageTitle");

const messageText =
    document.getElementById("messageText");

const continueButton =
    document.getElementById("continueButton");


/* =========================================================
   GAME STATE
========================================================= */

let currentIgor = null;

let someoneAtDoor = false;

let gameOver = false;

let hour = 23;

let minute = 41;


/* =========================================================
   30 IGORS
========================================================= */

const igors = [

    {
        name: "Игорь Старый",
        age: 67,
        type: "СОСЕД",
        image: "assets/igors/igor01.png",
        good: true,

        description:
            "Старый мужик в старой куртке. Выглядит уставшим.",

        state:
            "Нормальный",

        reaction:
            "Спокойный",

        lore:
            "Говорит, что живёт здесь с 1991 года."
    },


    {
        name: "Игорь Курьер",
        age: 24,
        type: "КУРЬЕР",
        image: "assets/igors/igor02.png",
        good: true,

        description:
            "Держит небольшую коробку.",

        state:
            "Нормальный",

        reaction:
            "Обычная",

        lore:
            "Ты ничего не заказывал. Но коробка действительно на твоё имя."
    },


    {
        name: "Игорь Врач",
        age: 42,
        type: "ВРАЧ",
        image: "assets/igors/igor03.png",
        good: true,

        description:
            "Белый халат и медицинская сумка.",

        state:
            "Нормальный",

        reaction:
            "Спокойный",

        lore:
            "Он говорит, что пришёл проверить соседа."
    },


    {
        name: "Игорь Сосед",
        age: 35,
        type: "СОСЕД",
        image: "assets/igors/igor04.png",
        good: true,

        description:
            "Обычный сосед с третьего этажа.",

        state:
            "Нормальный",

        reaction:
            "Обычная",

        lore:
            "Просит немного соли."
    },


    {
        name: "Игорь Рабочий",
        age: 48,
        type: "РАБОЧИЙ",
        image: "assets/igors/igor05.png",
        good: true,

        description:
            "Рабочая одежда, грязные руки.",

        state:
            "Уставший",

        reaction:
            "Спокойный",

        lore:
            "В доме сегодня ремонт."
    },


    {
        name: "Игорь Полицейский",
        age: 39,
        type: "ПОЛИЦИЯ",
        image: "assets/igors/igor06.png",
        good: true,

        description:
            "Показывает удостоверение.",

        state:
            "Нормальный",

        reaction:
            "Серьёзный",

        lore:
            "Спрашивает, не слышал ли ты странных звуков."
    },


    {
        name: "Игорь Пьяный",
        age: 51,
        type: "ПЬЯНЫЙ",
        image: "assets/igors/igor07.png",
        good: true,

        description:
            "Еле стоит на ногах.",

        state:
            "Пьяный",

        reaction:
            "Странная",

        lore:
            "Он перепутал квартиру."
    },


    {
        name: "Игорь Отец",
        age: 44,
        type: "ОТЕЦ",
        image: "assets/igors/igor08.png",
        good: true,

        description:
            "Мужчина с детским рюкзаком.",

        state:
            "Нормальный",

        reaction:
            "Спокойный",

        lore:
            "Ищет сына."
    },


    {
        name: "Игорь Студент",
        age: 21,
        type: "СТУДЕНТ",
        image: "assets/igors/igor09.png",
        good: true,

        description:
            "Молодой парень с рюкзаком.",

        state:
            "Уставший",

        reaction:
            "Обычная",

        lore:
            "Похоже, он просто ошибся этажом."
    },


    {
        name: "Игорь Дед",
        age: 82,
        type: "НЕИЗВЕСТНО",
        image: "assets/igors/igor10.png",
        good: true,

        description:
            "Очень старый человек.",

        state:
            "Слабый",

        reaction:
            "Спокойный",

        lore:
            "Называет тебя чужим именем."
    },


    {
        name: "Игорь В Костюме",
        age: 45,
        type: "НЕИЗВЕСТНО",
        image: "assets/igors/igor11.png",
        good: false,

        description:
            "Чёрный костюм. Не двигается.",

        state:
            "Непонятное",

        reaction:
            "Не моргает",

        lore:
            "Стоит у двери уже несколько минут."
    },


    {
        name: "Игорь Улыбка",
        age: 40,
        type: "НЕИЗВЕСТНО",
        image: "assets/igors/igor12.png",
        good: false,

        description:
            "Улыбается слишком широко.",

        state:
            "Странное",

        reaction:
            "Улыбается",

        lore:
            "Ты не видел его раньше."
    },


    {
        name: "Игорь Без Лица",
        age: "?",
        type: "НЕЧТО",
        image: "assets/igors/igor13.png",
        good: false,

        description:
            "На месте лица ничего нет.",

        state:
            "Невозможно",

        reaction:
            "Неизвестно",

        lore:
            "Он смотрит прямо в глазок."
    },


    {
        name: "Игорь Высокий",
        age: "?",
        type: "СУЩНОСТЬ",
        image: "assets/igors/igor14.png",
        good: false,

        description:
            "Слишком высокий для этого подъезда.",

        state:
            "Странное",

        reaction:
            "Не двигается",

        lore:
            "Его голова почти касается потолка."
    },


    {
        name: "Игорь Неправильный",
        age: 33,
        type: "ОШИБКА",
        image: "assets/igors/igor15.png",
        good: false,

        description:
            "Выглядит почти нормально.",

        state:
            "Непонятное",

        reaction:
            "Дёрганая",

        lore:
            "Что-то в нём неправильно."
    },


    {
        name: "Игорь Мёртвый",
        age: 71,
        type: "МЁРТВЫЙ",
        image: "assets/igors/igor16.png",
        good: false,

        description:
            "Выглядит как человек из старой фотографии.",

        state:
            "Мёртв",

        reaction:
            "Нет",

        lore:
            "Такой человек умер десять лет назад."
    },


    {
        name: "Игорь В Маске",
        age: "?",
        type: "НЕИЗВЕСТНО",
        image: "assets/igors/igor17.png",
        good: false,

        description:
            "Белая маска. Чёрная одежда.",

        state:
            "Неизвестно",

        reaction:
            "Неизвестная",

        lore:
            "На вопрос «кто вы?» он молчит."
    },


    {
        name: "Игорь Мокрый",
        age: 31,
        type: "ЧЕЛОВЕК",
        image: "assets/igors/igor18.png",
        good: false,

        description:
            "Полностью мокрый, хотя на улице сухо.",

        state:
            "Странное",

        reaction:
            "Спокойный",

        lore:
            "С его одежды капает вода."
    },


    {
        name: "Игорь Чёрный",
        age: "?",
        type: "НЕИЗВЕСТНО",
        image: "assets/igors/igor19.png",
        good: false,

        description:
            "Слишком тёмная одежда. Почти ничего не видно.",

        state:
            "Неизвестно",

        reaction:
            "Не двигается",

        lore:
            "Он стоит там, где свет не должен пропадать."
    },


    {
        name: "Игорь Ребёнок",
        age: 9,
        type: "РЕБЁНОК",
        image: "assets/igors/igor20.png",
        good: true,

        description:
            "Маленький мальчик с игрушкой.",

        state:
            "Нормальный",

        reaction:
            "Испуганный",

        lore:
            "Просит позвать маму."
    },


    {
        name: "Игорь Старый 2",
        age: 73,
        type: "СОСЕД",
        image: "assets/igors/igor21.png",
        good: true,

        description:
            "Похож на Игоря Старого.",

        state:
            "Нормальный",

        reaction:
            "Спокойный",

        lore:
            "Утверждает, что вы знакомы."
    },


    {
        name: "Игорь Слишком Близко",
        age: 29,
        type: "ЧЕЛОВЕК",
        image: "assets/igors/igor22.png",
        good: false,

        description:
            "Стоит прямо перед глазком.",

        state:
            "Странное",

        reaction:
            "Смотрит",

        lore:
            "Он знает, где находится глазок."
    },


    {
        name: "Игорь Молчун",
        age: 36,
        type: "ЧЕЛОВЕК",
        image: "assets/igors/igor23.png",
        good: true,

        description:
            "Ничего не говорит.",

        state:
            "Нормальный",

        reaction:
            "Спокойная",

        lore:
            "Показывает записку с адресом."
    },


    {
        name: "Игорь Почтальон",
        age: 55,
        type: "ПОЧТА",
        image: "assets/igors/igor24.png",
        good: true,

        description:
            "Держит несколько конвертов.",

        state:
            "Нормальный",

        reaction:
            "Обычная",

        lore:
            "Один конверт адресован тебе."
    },


    {
        name: "Игорь Сломанный",
        age: "?",
        type: "СУЩНОСТЬ",
        image: "assets/igors/igor25.png",
        good: false,

        description:
            "Его тело выглядит неправильным.",

        state:
            "Невозможно",

        reaction:
            "Дёрганая",

        lore:
            "Он пытается повторять движения человека."
    },


    {
        name: "Игорь Больной",
        age: 61,
        type: "ЧЕЛОВЕК",
        image: "assets/igors/igor26.png",
        good: true,

        description:
            "Выглядит очень плохо.",

        state:
            "Больной",

        reaction:
            "Слабая",

        lore:
            "Просит вызвать скорую."
    },


    {
        name: "Игорь Пустой",
        age: "?",
        type: "НЕЧТО",
        image: "assets/igors/igor27.png",
        good: false,

        description:
            "Выглядит как человек, но слишком пустой.",

        state:
            "Неизвестно",

        reaction:
            "Неизвестно",

        lore:
            "Он не отражается в металлической двери."
    },


    {
        name: "Игорь Друг",
        age: 28,
        type: "ЗНАКОМЫЙ",
        image: "assets/igors/igor28.png",
        good: true,

        description:
            "Говорит, что знает тебя.",

        state:
            "Нормальный",

        reaction:
            "Дружелюбный",

        lore:
            "Ты почему-то действительно узнаёшь его."
    },


    {
        name: "Игорь Ночной",
        age: "?",
        type: "НЕИЗВЕСТНО",
        image: "assets/igors/igor29.png",
        good: false,

        description:
            "Пришёл глубокой ночью.",

        state:
            "Странное",

        reaction:
            "Неизвестная",

        lore:
            "Он говорит, что уже был здесь вчера."
    },


    {
        name: "Игорь Последний",
        age: "?",
        type: "???",
        image: "assets/igors/igor30.png",
        good: false,

        description:
            "Ты не уверен, что это человек.",

        state:
            "???",

        reaction:
            "???",

        lore:
            "На вопрос «что тебе нужно?» он отвечает: «ты сам позвонил»."
    }

];


/* =========================================================
   RANDOM IGOR
========================================================= */

function getRandomIgor() {

    const index =
        Math.floor(
            Math.random() * igors.length
        );

    return igors[index];

}


/* =========================================================
   TIME
========================================================= */

function updateTime() {

    eventTime.textContent =
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

}


function advanceTime() {

    minute +=
        Math.floor(
            Math.random() * 4
        ) + 1;

    if (minute >= 60) {

        minute -= 60;

        hour++;

    }

    if (hour >= 24)
        hour = 0;

}


/* =========================================================
   BELL
========================================================= */

bellButton.addEventListener(
    "click",
    () => {

        if (gameOver)
            return;

        if (someoneAtDoor)
            return;

        someoneAtDoor = true;

        currentIgor =
            getRandomIgor();

        advanceTime();

        updateTime();

        status.textContent =
            "Кто-то у двери.";

        eventTitle.textContent =
            "Кто-то стучит.";

        eventDescription.textContent =
            "За дверью кто-то стоит.";

        eventPanel.classList.remove(
            "hidden"
        );

    }
);


/* =========================================================
   LOOK
========================================================= */

lookButton.addEventListener(
    "click",
    () => {

        if (!currentIgor)
            return;

        showIgor();

    }
);


/* =========================================================
   SHOW IGOR
========================================================= */

function showIgor() {

    const igor =
        currentIgor;

    igorImage.src =
        igor.image;

    igorName.textContent =
        igor.name;

    igorType.textContent =
        igor.type;

    igorDescription.textContent =
        igor.description;

    igorAge.textContent =
        igor.age;

    igorState.textContent =
        igor.state;

    igorReaction.textContent =
        igor.reaction;

    igorLore.textContent =
        igor.lore;

    eventPanel.classList.add(
        "hidden"
    );

    inspect.classList.remove(
        "hidden"
    );

}


/* =========================================================
   CLOSE INSPECTION
========================================================= */

closeInspect.addEventListener(
    "click",
    () => {

        inspect.classList.add(
            "hidden"
        );

        eventPanel.classList.remove(
            "hidden"
        );

    }
);


/* =========================================================
   IGNORE
========================================================= */

ignoreButton.addEventListener(
    "click",
    () => {

        leaveVisitor(
            "Ты решил не открывать."
        );

    }
);


/* =========================================================
   REJECT
========================================================= */

rejectButton.addEventListener(
    "click",
    () => {

        if (!currentIgor)
            return;

        const igor =
            currentIgor;

        if (!igor.good) {

            leaveVisitor(
                `${igor.name} медленно отошёл от двери.`
            );

            return;

        }

        leaveVisitor(
            `${igor.name} ушёл.\n\nНаверное, зря ты его послал.`
        );

    }
);


/* =========================================================
   OPEN
========================================================= */

openButton.addEventListener(
    "click",
    () => {

        if (!currentIgor)
            return;

        const igor =
            currentIgor;

        if (igor.good) {

            leaveVisitor(
                `${igor.name} вошёл.\n\nОн поблагодарил тебя.`
            );

            return;

        }

        /*
            BAD VISITOR
        */

        gameOver = true;

        inspect.classList.add(
            "hidden"
        );

        status.textContent =
            "Дверь открыта.";

        setTimeout(() => {

            showMessage(
                "Ты открыл дверь.",
                `${igor.name} вошёл.\n\n\nТеперь он внутри.`
            );

        }, 600);

    }
);


/* =========================================================
   VISITOR LEAVES
========================================================= */

function leaveVisitor(text) {

    someoneAtDoor = false;

    currentIgor = null;

    inspect.classList.add(
        "hidden"
    );

    eventPanel.classList.add(
        "hidden"
    );

    status.textContent =
        "Снова тихо.";

    showMessage(
        "Тишина.",
        text
    );

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    title,
    text
) {

    messageTitle.textContent =
        title;

    messageText.textContent =
        text;

    message.classList.remove(
        "hidden"
    );

}


/* =========================================================
   CONTINUE
========================================================= */

continueButton.addEventListener(
    "click",
    () => {

        message.classList.add(
            "hidden"
        );

        if (gameOver) {

            gameOver = false;

            status.textContent =
                "В квартире тихо.";

        }

    }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key.toLowerCase() === "e"
        ) {

            if (
                someoneAtDoor &&
                !inspect.classList.contains(
                    "hidden"
                )
            ) {

                openButton.click();

            }

        }

        if (
            event.key.toLowerCase() === "q"
        ) {

            if (
                someoneAtDoor &&
                !inspect.classList.contains(
                    "hidden"
                )
            ) {

                rejectButton.click();

            }

        }

    }
);


/* =========================================================
   START
========================================================= */

updateTime();

status.textContent =
    "В квартире тихо.";
