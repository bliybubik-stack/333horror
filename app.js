/* =========================================================
   ОТКРОЙ ДВЕРЬ
   Простая 2D хоррор-игра
========================================================= */


/* =========================================================
   НАСТРОЙКИ
========================================================= */

const CONFIG = {

    maxVisitors: 12,

    startingHour: 23,
    startingMinute: 41,

    visitorTimeLimit: 35,

    jumpscareDuration: 1800,

    randomEvents: true
};


/* =========================================================
   ЭЛЕМЕНТЫ
========================================================= */

const bellButton =
    document.getElementById("bellButton");

const visitorPanel =
    document.getElementById("visitorPanel");

const visitorImage =
    document.getElementById("visitorImage");

const visitorName =
    document.getElementById("visitorName");

const visitorDescription =
    document.getElementById("visitorDescription");

const visitorTimer =
    document.getElementById("visitorTimer");

const visitorNumber =
    document.getElementById("visitorNumber");

const openButton =
    document.getElementById("openButton");

const rejectButton =
    document.getElementById("rejectButton");

const statusText =
    document.getElementById("status");

const letInText =
    document.getElementById("letIn");

const rejectedText =
    document.getElementById("rejected");

const nightNumber =
    document.getElementById("nightNumber");

const clock =
    document.getElementById("clock");

const doorbellMessage =
    document.getElementById("doorbellMessage");

const blackScreen =
    document.getElementById("blackScreen");

const blackText =
    document.getElementById("blackText");

const jumpscare =
    document.getElementById("jumpscare");

const jumpscareImage =
    document.getElementById("jumpscareImage");

const gameOver =
    document.getElementById("gameOver");

const deathReason =
    document.getElementById("deathReason");

const restartButton =
    document.getElementById("restartButton");

const doorbellAudio =
    document.getElementById("doorbellAudio");

const knockAudio =
    document.getElementById("knockAudio");

const whisperAudio =
    document.getElementById("whisperAudio");

const jumpscareAudio =
    document.getElementById("jumpscareAudio");


/* =========================================================
   СОСТОЯНИЕ
========================================================= */

let currentVisitor = null;

let visitorIndex = 0;

let letIn = 0;

let rejected = 0;

let timer = null;

let visitorSeconds = 0;

let gameRunning = true;

let clockMinutes = CONFIG.startingMinute;

let clockHour = CONFIG.startingHour;


/* =========================================================
   ПОСЕТИТЕЛИ
=========================================================

   evil = true
   означает, что это НЕ человек.

   image = PNG из assets/people/

========================================================= */

const visitors = [

    {
        name: "Саня",
        image: "assets/people/normal_01.png",

        description:
            "Говорит, что забыл ключи.",

        evil: false,

        openText:
            "Саня зашёл. Сказал спасибо. Ничего не произошло.",

        rejectText:
            "Саня сказал «ладно» и ушёл."
    },


    {
        name: "Бабушка",
        image: "assets/people/oldwoman.png",

        description:
            "Просит открыть. Стоит спокойно.",

        evil: false,

        openText:
            "Бабушка зашла и почему-то оставила тебе пирожок.",

        rejectText:
            "Бабушка сказала: «Ну и ладно». Ушла."
    },


    {
        name: "Курьер",
        image: "assets/people/normal_02.png",

        description:
            "Доставка. Ты ничего не заказывал.",

        evil: false,

        openText:
            "Он оставил коробку. В коробке был кирпич.",

        rejectText:
            "Курьер пожал плечами и ушёл."
    },


    {
        name: "Мужик",
        image: "assets/people/weird_01.png",

        description:
            "Не двигается. Просто смотрит.",

        evil: true,

        openText:
            "Ты открыл дверь.",

        rejectText:
            "Он ещё долго стоял у двери..."
    },


    {
        name: "Твоя мама",
        image: "assets/people/normal_01.png",

        description:
            "Похоже на неё.",

        evil: true,

        openText:
            "Это была не твоя мама.",

        rejectText:
            "За дверью стало тихо."
    },


    {
        name: "Сосед",
        image: "assets/people/normal_02.png",

        description:
            "Просит немного соли.",

        evil: false,

        openText:
            "Сосед взял соль и ушёл.",

        rejectText:
            "Сосед сказал, что соль ему больше не нужна."
    },


    {
        name: "Никто",
        image: "assets/people/monster_01.png",

        description:
            "Ты не уверен, что это человек.",

        evil: true,

        openText:
            "Не надо было открывать.",

        rejectText:
            "Оно медленно отошло от двери."
    },


    {
        name: "Девушка",
        image: "assets/people/woman.png",

        description:
            "Говорит, что живёт этажом выше.",

        evil: false,

        openText:
            "Она поблагодарила тебя и ушла.",

        rejectText:
            "Она ушла. Всё нормально."
    },


    {
        name: "Мужчина без лица",
        image: "assets/people/monster_01.png",

        description:
            "На месте лица что-то не так.",

        evil: true,

        openText:
            "Дверь открылась сама.",

        rejectText:
            "Он прошептал: «правильно»."
    },


    {
        name: "Дед",
        image: "assets/people/oldman.png",

        description:
            "Просто дед.",

        evil: false,

        openText:
            "Дед зашёл, посмотрел на тебя и сказал: «Молодец».",

        rejectText:
            "Дед ушёл."
    },


    {
        name: "Паша",
        image: "assets/people/normal_01.png",

        description:
            "Просит зарядить телефон.",

        evil: false,

        openText:
            "Паша зарядил телефон и ушёл.",

        rejectText:
            "Паша сказал: «пон». И ушёл."
    },


    {
        name: "Оно",
        image: "assets/people/monster_01.png",

        description:
            "Оно знает, что ты смотришь.",

        evil: true,

        openText:
            "Ты открыл дверь.",

        rejectText:
            "Оно улыбнулось через глазок."
    }

];


/* =========================================================
   START
========================================================= */

function startGame() {

    gameRunning = true;

    currentVisitor = null;

    visitorIndex = 0;

    letIn = 0;

    rejected = 0;

    updateCounters();

    gameOver.classList.add("hidden");

    visitorPanel.classList.add("hidden");

    statusText.textContent =
        "Сижу. Жду.";

    doorbellMessage.textContent =
        "Тишина...";

    startClock();
}


/* =========================================================
   ЧАСЫ
========================================================= */

function startClock() {

    setInterval(() => {

        if (!gameRunning)
            return;

        clockMinutes++;

        if (clockMinutes >= 60) {

            clockMinutes = 0;

            clockHour++;

            if (clockHour >= 24) {
                clockHour = 0;
            }
        }

        clock.textContent =
            `${String(clockHour).padStart(2, "0")}:${String(clockMinutes).padStart(2, "0")}`;

    }, 3000);
}


/* =========================================================
   ЗВОНОК
========================================================= */

bellButton.addEventListener("click", () => {

    if (!gameRunning)
        return;

    if (currentVisitor)
        return;

    if (visitorIndex >= CONFIG.maxVisitors) {

        finishNight();

        return;
    }

    spawnVisitor();
});


/* =========================================================
   ПОЯВЛЕНИЕ ПОСЕТИТЕЛЯ
========================================================= */

function spawnVisitor() {

    visitorIndex++;

    const randomVisitor =
        visitors[
            Math.floor(
                Math.random() * visitors.length
            )
        ];

    currentVisitor = {
        ...randomVisitor
    };

    visitorPanel.classList.remove("hidden");

    visitorImage.src =
        currentVisitor.image;

    visitorName.textContent =
        currentVisitor.name;

    visitorDescription.textContent =
        currentVisitor.description;

    visitorNumber.textContent =
        "#" +
        String(visitorIndex).padStart(3, "0");

    statusText.textContent =
        "Кто-то пришёл.";

    doorbellMessage.textContent =
        "ЗВОНОК...";

    playSound(doorbellAudio);

    startVisitorTimer();

    randomVisitorBehavior();

}


/* =========================================================
   ТАЙМЕР
========================================================= */

function startVisitorTimer() {

    clearInterval(timer);

    visitorSeconds = 0;

    visitorTimer.textContent =
        "00:00";

    timer = setInterval(() => {

        visitorSeconds++;

        const seconds =
            String(visitorSeconds).padStart(2, "0");

        visitorTimer.textContent =
            `00:${seconds}`;

        if (
            visitorSeconds >=
            CONFIG.visitorTimeLimit
        ) {

            visitorLeavesAutomatically();
        }

    }, 1000);
}


/* =========================================================
   ПОСЕТИТЕЛЬ УХОДИТ
========================================================= */

function visitorLeavesAutomatically() {

    clearInterval(timer);

    if (!currentVisitor)
        return;

    statusText.textContent =
        "Он ушёл.";

    doorbellMessage.textContent =
        "Шаги удаляются...";

    playSound(knockAudio);

    setTimeout(() => {

        visitorPanel.classList.add("hidden");

        currentVisitor = null;

        statusText.textContent =
            "Снова тишина.";

        doorbellMessage.textContent =
            "Тишина...";

    }, 1500);
}


/* =========================================================
   ВПУСТИТЬ
========================================================= */

openButton.addEventListener("click", () => {

    if (!currentVisitor)
        return;

    const visitor =
        currentVisitor;

    clearInterval(timer);

    if (visitor.evil) {

        visitorPanel.classList.add("hidden");

        statusText.textContent =
            "Ты открыл дверь.";

        evilVisitorEntered();

    } else {

        letIn++;

        updateCounters();

        visitorPanel.classList.add("hidden");

        statusText.textContent =
            visitor.openText;

        currentVisitor = null;

        setTimeout(() => {

            statusText.textContent =
                "Сижу. Жду.";

        }, 3000);
    }

});


/* =========================================================
   ПОШЁЛ НАХУЙ
========================================================= */

rejectButton.addEventListener("click", () => {

    if (!currentVisitor)
        return;

    const visitor =
        currentVisitor;

    clearInterval(timer);

    rejected++;

    updateCounters();

    visitorPanel.classList.add("hidden");

    currentVisitor = null;

    statusText.textContent =
        visitor.rejectText;

    playSound(knockAudio);

    /*
        Иногда плохой посетитель
        не уходит сразу.
    */

    if (
        visitor.evil &&
        Math.random() < 0.35
    ) {

        creepyEvent();

        return;
    }

    setTimeout(() => {

        statusText.textContent =
            "Сижу. Жду.";

    }, 3500);

});


/* =========================================================
   ПЛОХОЙ ПОСЕТИТЕЛЬ
========================================================= */

function evilVisitorEntered() {

    setTimeout(() => {

        blackScreen.classList.remove("hidden");

        blackText.textContent =
            "Дверь закрылась.";

    }, 700);


    setTimeout(() => {

        blackText.textContent =
            "Ты слышишь шаги.";

        playSound(whisperAudio);

    }, 2200);


    setTimeout(() => {

        blackText.textContent =
            "Шаги остановились.";

    }, 4000);


    setTimeout(() => {

        blackText.textContent =
            "Прямо за тобой.";

    }, 5200);


    setTimeout(() => {

        blackScreen.classList.add("hidden");

        triggerJumpscare(
            "assets/jumpscares/jumpscare_01.png",
            "Ты сам его впустил."
        );

    }, 6500);
}


/* =========================================================
   КРИПОВОЕ СОБЫТИЕ
========================================================= */

function creepyEvent() {

    statusText.textContent =
        "Он ушёл.";

    setTimeout(() => {

        blackScreen.classList.remove("hidden");

        blackText.textContent =
            "Ты слышишь дыхание.";

        playSound(whisperAudio);

    }, 1800);


    setTimeout(() => {

        blackText.textContent =
            "Но дверь закрыта.";

    }, 3500);


    setTimeout(() => {

        blackScreen.classList.add("hidden");

        statusText.textContent =
            "Наверное, показалось.";

    }, 5200);
}


/* =========================================================
   СЛУЧАЙНЫЕ СОБЫТИЯ
========================================================= */

function randomVisitorBehavior() {

    if (!CONFIG.randomEvents)
        return;

    if (!currentVisitor)
        return;

    const visitorAtMoment =
        currentVisitor;

    setTimeout(() => {

        if (
            currentVisitor !==
            visitorAtMoment
        ) {
            return;
        }

        const event =
            Math.floor(Math.random() * 4);

        if (event === 0) {

            visitorDescription.textContent =
                "Почему он смотрит прямо в глазок.";

        }

        if (event === 1) {

            visitorDescription.textContent =
                "Он перестал дышать.";

            visitorImage.style.filter =
                "contrast(1.5) brightness(.45)";

        }

        if (event === 2) {

            playSound(knockAudio);

            visitorDescription.textContent =
                "Он постучал. Очень тихо.";

        }

        if (event === 3) {

            visitorDescription.textContent =
                "Кажется, он улыбнулся.";

        }

    }, 5000 + Math.random() * 7000);
}


/* =========================================================
   JUMPSCARE
========================================================= */

function triggerJumpscare(
    image,
    reason
) {

    gameRunning = false;

    jumpscareImage.src =
        image;

    jumpscare.classList.remove("hidden");

    playSound(jumpscareAudio);

    setTimeout(() => {

        jumpscare.classList.add("hidden");

        deathReason.textContent =
            reason;

        gameOver.classList.remove("hidden");

    }, CONFIG.jumpscareDuration);
}


/* =========================================================
   НОЧЬ ЗАКОНЧЕНА
========================================================= */

function finishNight() {

    gameRunning = false;

    blackScreen.classList.remove("hidden");

    blackText.textContent =
        "До утра ты дожил.";


    setTimeout(() => {

        blackText.textContent =
            `Впущено: ${letIn}\nПослано нахуй: ${rejected}`;

    }, 2500);


    setTimeout(() => {

        blackScreen.classList.add("hidden");

        gameOver.classList.remove("hidden");

        deathReason.textContent =
            "Ночь закончилась. Повезло.";

    }, 5000);
}


/* =========================================================
   COUNTERS
========================================================= */

function updateCounters() {

    letInText.textContent =
        letIn;

    rejectedText.textContent =
        rejected;
}


/* =========================================================
   AUDIO
========================================================= */

function playSound(audio) {

    try {

        audio.currentTime = 0;

        audio.volume = 0.7;

        audio.play().catch(() => {});

    } catch (error) {

        console.log(
            "Audio error:",
            error
        );
    }
}


/* =========================================================
   RESTART
========================================================= */

restartButton.addEventListener(
    "click",
    () => {

        location.reload();

    }
);


/* =========================================================
   КЛАВИАТУРА
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (!gameRunning)
            return;

        /*
            E = впустить
            Q = послать нахуй
        */

        if (
            event.key.toLowerCase() === "e"
        ) {

            openButton.click();

        }

        if (
            event.key.toLowerCase() === "q"
        ) {

            rejectButton.click();

        }

    }
);


/* =========================================================
   START
========================================================= */

startGame();
