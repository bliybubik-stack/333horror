/* =========================================================
   ОТКРОЙ ДВЕРЬ
   10 ИГОРОВ / 30 ОПИСАНИЙ / 1 JUMPSCARE
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const bellButton = document.getElementById("bellButton");
const status = document.getElementById("status");

const eventPanel = document.getElementById("eventPanel");
const eventTitle = document.getElementById("eventTitle");
const eventDescription = document.getElementById("eventDescription");
const eventTime = document.getElementById("eventTime");

const lookButton = document.getElementById("lookButton");
const ignoreButton = document.getElementById("ignoreButton");

const inspect = document.getElementById("inspect");
const closeInspect = document.getElementById("closeInspect");

const igorImage = document.getElementById("igorImage");
const igorName = document.getElementById("igorName");
const igorType = document.getElementById("igorType");
const igorDescription = document.getElementById("igorDescription");
const igorAge = document.getElementById("igorAge");
const igorState = document.getElementById("igorState");
const igorReaction = document.getElementById("igorReaction");
const igorLore = document.getElementById("igorLore");

const openButton = document.getElementById("openButton");
const rejectButton = document.getElementById("rejectButton");

const message = document.getElementById("message");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const continueButton = document.getElementById("continueButton");


/* =========================================================
   GAME STATE
========================================================= */

let currentIgor = null;
let someoneAtDoor = false;
let gameOver = false;

let hour = 23;
let minute = 41;


/* =========================================================
   JUMPSCARE IMAGE
=========================================================

   PUT YOUR IMAGE HERE:

   assets/jumpscare.png

   You only need ONE image.
========================================================= */

const JUMPSCARE_IMAGE =
    "assets/jumpscare.png";


/* =========================================================
   10 IGORS
========================================================= */

const igors = [

    {
        name: "Игорь Старый",
        age: "67",
        type: "СОСЕД",
        image: "assets/igors/igor01.png",
        good: true,

        descriptions: [
            "Старый мужик в потёртой куртке.",
            "Стоит с руками в карманах и смотрит на дверь.",
            "Выглядит уставшим, но вроде нормально."
        ],

        states: [
            "Нормальный",
            "Уставший",
            "Спокойный"
        ],

        reactions: [
            "Спокойный",
            "Обычная",
            "Уставший"
        ],

        lore:
            "Говорит, что живёт в этом доме дольше, чем ты."
    },


    {
        name: "Игорь Курьер",
        age: "24",
        type: "КУРЬЕР",
        image: "assets/igors/igor02.png",
        good: true,

        descriptions: [
            "Держит небольшую коробку.",
            "В одной руке посылка, в другой телефон.",
            "Похоже, он просто доставляет заказ."
        ],

        states: [
            "Нормальный",
            "Уставший",
            "Спокойный"
        ],

        reactions: [
            "Обычная",
            "Спокойный",
            "Немного нервный"
        ],

        lore:
            "Ты ничего не заказывал. Но коробка почему-то на твоё имя."
    },


    {
        name: "Игорь Врач",
        age: "42",
        type: "ВРАЧ",
        image: "assets/igors/igor03.png",
        good: true,

        descriptions: [
            "Мужчина в белом халате.",
            "Держит медицинскую сумку.",
            "Выглядит так, будто торопится."
        ],

        states: [
            "Нормальный",
            "Уставший",
            "Нервный"
        ],

        reactions: [
            "Серьёзный",
            "Спокойный",
            "Нервный"
        ],

        lore:
            "Говорит, что пришёл проверить одного из жильцов."
    },


    {
        name: "Игорь Пьяный",
        age: "51",
        type: "ПЬЯНЫЙ",
        image: "assets/igors/igor04.png",
        good: true,

        descriptions: [
            "Еле стоит на ногах.",
            "От него явно пахнет алкоголем.",
            "Он явно перепутал квартиру."
        ],

        states: [
            "Пьяный",
            "Уставший",
            "Вроде нормальный"
        ],

        reactions: [
            "Странная",
            "Смешная",
            "Нервная"
        ],

        lore:
            "Он три раза спросил, где находится квартира 42."
    },


    {
        name: "Игорь В Маске",
        age: "?",
        type: "НЕИЗВЕСТНО",
        image: "assets/igors/igor05.png",
        good: false,

        descriptions: [
            "На лице белая маска.",
            "Стоит абсолютно неподвижно.",
            "Маска смотрит прямо в глазок."
        ],

        states: [
            "Неизвестно",
            "Странное",
            "Невозможно определить"
        ],

        reactions: [
            "Не двигается",
            "Неизвестная",
            "Смотрит прямо на тебя"
        ],

        lore:
            "На вопрос «кто ты?» он ничего не отвечает."
    },


    {
        name: "Игорь Улыбка",
        age: "?",
        type: "НЕЧТО",
        image: "assets/igors/igor06.png",
        good: false,

        descriptions: [
            "Улыбается слишком широко.",
            "Его улыбка выглядит ненормально.",
            "Он улыбается уже несколько минут."
        ],

        states: [
            "Странное",
            "Неизвестно",
            "Невозможно"
        ],

        reactions: [
            "Улыбается",
            "Не моргает",
            "Смотрит"
        ],

        lore:
            "Ты уверен, что раньше видел это лицо. Но не можешь вспомнить где."
    },


    {
        name: "Игорь Без Лица",
        age: "?",
        type: "СУЩНОСТЬ",
        image: "assets/igors/igor07.png",
        good: false,

        descriptions: [
            "У него нет лица.",
            "Вместо лица просто тёмное пятно.",
            "Ты не понимаешь, как он вообще может смотреть."
        ],

        states: [
            "Невозможно",
            "Неизвестно",
            "Ошибка"
        ],

        reactions: [
            "Неизвестно",
            "Не двигается",
            "Смотрит"
        ],

        lore:
            "Он наклоняется ближе, когда ты смотришь в глазок."
    },


    {
        name: "Игорь Высокий",
        age: "?",
        type: "СУЩНОСТЬ",
        image: "assets/igors/igor08.png",
        good: false,

        descriptions: [
            "Он слишком высокий.",
            "Его голова почти касается потолка.",
            "Такой человек физически не должен помещаться здесь."
        ],

        states: [
            "Странное",
            "Невозможно",
            "Неизвестно"
        ],

        reactions: [
            "Не двигается",
            "Смотрит вниз",
            "Неизвестная"
        ],

        lore:
            "Когда ты отходишь от глазка, слышишь шаги наверху."
    },


    {
        name: "Игорь Мокрый",
        age: "31",
        type: "ЧЕЛОВЕК?",
        image: "assets/igors/igor09.png",
        good: false,

        descriptions: [
            "Он полностью мокрый.",
            "С его одежды капает вода.",
            "Волосы и одежда будто только что из воды."
        ],

        states: [
            "Странное",
            "Мокрый",
            "Неизвестно"
        ],

        reactions: [
            "Спокойный",
            "Не моргает",
            "Неизвестная"
        ],

        lore:
            "На улице сегодня сухо. Очень сухо."
    },


    {
        name: "Игорь Последний",
        age: "?",
        type: "???",
        image: "assets/igors/igor10.png",
        good: false,

        descriptions: [
            "Ты не уверен, что это человек.",
            "Он выглядит знакомо. Слишком знакомо.",
            "Кажется, он знает, что ты сейчас смотришь."
        ],

        states: [
            "???",
            "Невозможно",
            "Ошибка"
        ],

        reactions: [
            "???",
            "Смотрит",
            "Неизвестная"
        ],

        lore:
            "Когда ты спрашиваешь, кто он, он отвечает: «ты сам меня позвал»."
    }

];


/* =========================================================
   RANDOM HELPERS
========================================================= */

function randomItem(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


function getRandomIgor() {

    return igors[
        Math.floor(
            Math.random() * igors.length
        )
    ];

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

    if (hour >= 24) {
        hour = 0;
    }

    updateTime();

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

        status.textContent =
            "Кто-то у двери.";

        eventTitle.textContent =
            "Кто-то стучит.";

        eventDescription.textContent =
            "Кто-то пришёл. Посмотри в глазок.";

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


    /*
        Random description
        = 3 possible descriptions
    */

    igorDescription.textContent =
        randomItem(
            igor.descriptions
        );


    igorAge.textContent =
        igor.age;


    igorState.textContent =
        randomItem(
            igor.states
        );


    igorReaction.textContent =
        randomItem(
            igor.reactions
        );


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
            "Ты решил не открывать.\n\nЧерез несколько секунд шаги исчезли."
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


        if (igor.good) {

            leaveVisitor(
                `${igor.name} ушёл.\n\nОн что-то пробормотал и спустился вниз.`
            );

        } else {

            leaveVisitor(
                `${igor.name} медленно отошёл от двери.\n\nПотом ты услышал шаги на лестнице.`
            );

        }

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


        /*
            GOOD IGOR
        */

        if (igor.good) {

            let goodMessages = [

                `${igor.name} вошёл.\n\nОн поблагодарил тебя.`,

                `${igor.name} зашёл внутрь.\n\nНичего странного не произошло.`,

                `${igor.name} прошёл в квартиру.\n\nВсё нормально.`

            ];


            leaveVisitor(
                randomItem(
                    goodMessages
                )
            );


            return;
        }


        /*
            BAD IGOR
            → JUMPSCARE
        */

        triggerJumpscare();

    }
);


/* =========================================================
   JUMPSCARE
========================================================= */

function triggerJumpscare() {

    if (!currentIgor)
        return;


    gameOver = true;


    someoneAtDoor = false;


    /*
        Hide everything
    */

    inspect.classList.add(
        "hidden"
    );

    eventPanel.classList.add(
        "hidden"
    );

    status.classList.add(
        "hidden"
    );


    /*
        Create jumpscare
        dynamically
    */

    const jumpscare =
        document.createElement(
            "div"
        );


    jumpscare.id =
        "jumpscare";


    jumpscare.innerHTML = `

        <img
            src="${JUMPSCARE_IMAGE}"
            alt="Jumpscare"
        >

        <div class="jumpscare-flash"></div>

    `;


    document.body.appendChild(
        jumpscare
    );


    /*
        Small delay before
        horror screen
    */

    setTimeout(
        () => {

            jumpscare.classList.add(
                "active"
            );

        },
        30
    );


    /*
        End after jumpscare
    */

    setTimeout(
        () => {

            jumpscare.remove();

            showDeathScreen();

        },
        1800
    );

}


/* =========================================================
   DEATH SCREEN
========================================================= */

function showDeathScreen() {

    messageTitle.textContent =
        "ТЫ ОТКРЫЛ ДВЕРЬ.";


    messageText.textContent =
        "Это была плохая идея.\n\n" +
        "Игорь больше не стоит за дверью.\n" +
        "Теперь он стоит у тебя за спиной.";


    message.classList.remove(
        "hidden"
    );


    continueButton.textContent =
        "ЗАНОВО";


    status.classList.add(
        "hidden"
    );

}


/* =========================================================
   LEAVE VISITOR
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


    status.classList.remove(
        "hidden"
    );


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


    continueButton.textContent =
        "ПОНЯТНО";

}


/* =========================================================
   CONTINUE / RESTART
========================================================= */

continueButton.addEventListener(
    "click",
    () => {

        message.classList.add(
            "hidden"
        );


        if (gameOver) {

            /*
                Reset game
            */

            gameOver = false;

            someoneAtDoor = false;

            currentIgor = null;


            hour = 23;
            minute = 41;


            updateTime();


            status.textContent =
                "В квартире тихо.";


            status.classList.remove(
                "hidden"
            );

        }

    }
);


/* =========================================================
   KEYBOARD SUPPORT
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
   PRELOAD JUMPSCARE
========================================================= */

const preloadJumpscare =
    new Image();

preloadJumpscare.src =
    JUMPSCARE_IMAGE;


/* =========================================================
   START
========================================================= */

updateTime();

status.textContent =
    "В квартире тихо.";
