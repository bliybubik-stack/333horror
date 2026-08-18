const CONFIG = {
    visitorsPerNight: 10,
    visitorTime: 30,
    startHour: 23,
    startMinute: 41
};


/* =========================
   ELEMENTS
========================= */

const doorbell =
    document.getElementById("doorbell");

const visitorScreen =
    document.getElementById("visitorScreen");

const visitorImage =
    document.getElementById("visitorImage");

const visitorName =
    document.getElementById("visitorName");

const visitorAge =
    document.getElementById("visitorAge");

const visitorDescription =
    document.getElementById("visitorDescription");

const visitorType =
    document.getElementById("visitorType");

const visitorId =
    document.getElementById("visitorId");

const timerText =
    document.getElementById("timer");

const openButton =
    document.getElementById("openButton");

const rejectButton =
    document.getElementById("rejectButton");

const statusText =
    document.getElementById("status");

const doorMessage =
    document.getElementById("doorMessage");

const letInText =
    document.getElementById("letIn");

const rejectedText =
    document.getElementById("rejected");

const timeText =
    document.getElementById("time");

const blackScreen =
    document.getElementById("blackScreen");

const blackText =
    document.getElementById("blackText");

const jumpscare =
    document.getElementById("jumpscare");

const jumpscareImage =
    document.getElementById("jumpscareImage");

const ending =
    document.getElementById("ending");

const endingNumber =
    document.getElementById("endingNumber");

const endingTitle =
    document.getElementById("endingTitle");

const endingText =
    document.getElementById("endingText");

const restart =
    document.getElementById("restart");

const doorbellSound =
    document.getElementById("doorbellSound");

const knockSound =
    document.getElementById("knockSound");

const breathingSound =
    document.getElementById("breathingSound");

const whisperSound =
    document.getElementById("whisperSound");

const jumpscareSound =
    document.getElementById("jumpscareSound");


/* =========================
   GAME STATE
========================= */

let currentVisitor = null;

let visitorCount = 0;

let letIn = 0;

let rejected = 0;

let timer = null;

let secondsAtDoor = 0;

let gameOver = false;

let hour = CONFIG.startHour;

let minute = CONFIG.startMinute;


/* =========================
   ПЕРСОНАЖИ
========================= */

const visitors = [

    {
        id: "igor_old",

        name: "Игорь Старый",

        age: 63,

        image:
            "assets/people/igor_old.png",

        type:
            "ЧЕЛОВЕК",

        description:
            "Сосед из квартиры 36. Всегда ходит в одной и той же куртке.",

        evil: false,

        open:
            "Игорь зашёл, посмотрел на тебя и сказал: «Спасибо, сынок».",

        reject:
            "Игорь пожал плечами и пошёл обратно."
    },


    {
        id: "igor_young",

        name: "Игорь Младший",

        age: 29,

        image:
            "assets/people/igor_young.png",

        type:
            "ЧЕЛОВЕК",

        description:
            "Говорит, что он брат Игоря Старого.",

        evil: false,

        open:
            "Игорь зашёл. Через минуту они оба ушли.",

        reject:
            "Игорь посмотрел на дверь и сказал: «Понял»."
    },


    {
        id: "babushka",

        name: "Людмила Петровна",

        age: 71,

        image:
            "assets/people/babushka.png",

        type:
            "ЧЕЛОВЕК",

        description:
            "Бабушка с пакетом. Просит открыть.",

        evil: false,

        open:
            "Она дала тебе пирожок и ушла.",

        reject:
            "Она сказала: «Ну ладно»."
    },


    {
        id: "neighbor",

        name: "Алексей",

        age: 34,

        image:
            "assets/people/neighbor.png",

        type:
            "СОСЕД",

        description:
            "Говорит, что у него закончилась соль.",

        evil: false,

        open:
            "Алексей взял соль и ушёл.",

        reject:
            "Алексей ушёл за солью к кому-то другому."
    },


    {
        id: "courier",

        name: "Курьер",

        age: 24,

        image:
            "assets/people/courier.png",

        type:
            "КУРЬЕР",

        description:
            "Принёс посылку, которую ты не заказывал.",

        evil: false,

        open:
            "Он оставил коробку. Внутри оказался старый тапок.",

        reject:
            "Курьер забрал коробку."
    },


    {
        id: "igor",

        name: "Игорь",

        age: 44,

        image:
            "assets/people/igor_old.png",

        type:
            "НЕИЗВЕСТНО",

        description:
            "Стоит слишком близко к двери.",

        evil: true,

        open:
            "Ты открыл дверь.",

        reject:
            "Игорь медленно отошёл."
    },


    {
        id: "faceless",

        name: "Безликий",

        age: "?",

        image:
            "assets/people/faceless.png",

        type:
            "НЕ ЧЕЛОВЕК",

        description:
            "Лица нет. Но он смотрит прямо на тебя.",

        evil: true,

        open:
            "Он вошёл.",

        reject:
            "Он наклонился к глазку и прошептал твоё имя."
    },


    {
        id: "thing",

        name: "Оно",

        age: "???",

        image:
            "assets/people/thing.png",

        type:
            "НЕИЗВЕСТНО",

        description:
            "Ты не знаешь, что это такое.",

        evil: true,

        open:
            "Дверь открылась.",

        reject:
            "Оно осталось стоять."
    }

];


/* =========================
   START
========================= */

function startGame() {

    gameOver = false;

    visitorCount = 0;

    letIn = 0;

    rejected = 0;

    updateCounters();

    statusText.textContent =
        "Сижу. Жду.";

    doorMessage.textContent =
        "Тишина.";

    updateClock();
}


/* =========================
   CLOCK
========================= */

setInterval(() => {

    if (gameOver)
        return;

    minute++;

    if (minute >= 60) {

        minute = 0;

        hour++;

        if (hour >= 24)
            hour = 0;
    }

    updateClock();

}, 4000);


function updateClock() {

    timeText.textContent =
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}


/* =========================
   DOORBELL
========================= */

doorbell.addEventListener(
    "click",
    () => {

        if (gameOver)
            return;

        if (currentVisitor)
            return;

        if (
            visitorCount >=
            CONFIG.visitorsPerNight
        ) {

            goodEnding();

            return;
        }

        spawnVisitor();
    }
);


/* =========================
   SPAWN
========================= */

function spawnVisitor() {

    visitorCount++;

    currentVisitor =
        visitors[
            Math.floor(
                Math.random() *
                visitors.length
            )
        ];

    visitorScreen.classList.remove(
        "hidden"
    );

    visitorImage.src =
        currentVisitor.image;

    visitorName.textContent =
        currentVisitor.name;

    visitorAge.textContent =
        `Возраст: ${currentVisitor.age}`;

    visitorDescription.textContent =
        currentVisitor.description;

    visitorType.textContent =
        currentVisitor.type;

    visitorId.textContent =
        "#" +
        String(visitorCount).padStart(3, "0");

    statusText.textContent =
        "Кто-то у двери.";

    doorMessage.textContent =
        "КТО-ТО У ДВЕРИ";

    playSound(doorbellSound);

    startTimer();

    specialVisitorEvents();
}


/* =========================
   TIMER
========================= */

function startTimer() {

    clearInterval(timer);

    secondsAtDoor = 0;

    timerText.textContent =
        "00:00";

    timer = setInterval(() => {

        secondsAtDoor++;

        timerText.textContent =
            `00:${String(secondsAtDoor).padStart(2, "0")}`;

        if (
            secondsAtDoor >=
            CONFIG.visitorTime
        ) {

            visitorLeaves();

        }

    }, 1000);
}


/* =========================
   LEAVE
========================= */

function visitorLeaves() {

    if (!currentVisitor)
        return;

    clearInterval(timer);

    visitorScreen.classList.add(
        "hidden"
    );

    statusText.textContent =
        "Он ушёл.";

    doorMessage.textContent =
        "Шаги удаляются...";

    playSound(knockSound);

    currentVisitor = null;

    setTimeout(() => {

        statusText.textContent =
            "Снова тишина.";

        doorMessage.textContent =
            "Тишина.";

    }, 2500);
}


/* =========================
   OPEN
========================= */

openButton.addEventListener(
    "click",
    () => {

        if (!currentVisitor)
            return;

        const visitor =
            currentVisitor;

        clearInterval(timer);

        visitorScreen.classList.add(
            "hidden"
        );

        currentVisitor = null;

        if (visitor.evil) {

            evilEndingSequence(
                visitor
            );

            return;
        }

        letIn++;

        updateCounters();

        statusText.textContent =
            visitor.open;

        setTimeout(() => {

            statusText.textContent =
                "Сижу. Жду.";

        }, 3500);
    }
);


/* =========================
   REJECT
========================= */

rejectButton.addEventListener(
    "click",
    () => {

        if (!currentVisitor)
            return;

        const visitor =
            currentVisitor;

        clearInterval(timer);

        rejected++;

        updateCounters();

        visitorScreen.classList.add(
            "hidden"
        );

        currentVisitor = null;

        statusText.textContent =
            visitor.reject;

        playSound(knockSound);

        /*
            Если это опасный посетитель,
            иногда он не уходит.
        */

        if (
            visitor.evil &&
            Math.random() < .45
        ) {

            creepyRejectEvent();

        }

    }
);


/* =========================
   СТРАННЫЕ СОБЫТИЯ
========================= */

function specialVisitorEvents() {

    const visitor =
        currentVisitor;

    setTimeout(() => {

        if (currentVisitor !== visitor)
            return;

        if (visitor.id === "igor") {

            visitorDescription.textContent =
                "Он улыбается. Но Игорь не улыбался никогда.";

        }

        if (
            visitor.id === "faceless"
        ) {

            visitorDescription.textContent =
                "Он сейчас смотрит прямо в камеру.";

            playSound(
                breathingSound
            );
        }

        if (
            visitor.id === "thing"
        ) {

            visitorDescription.textContent =
                "Не двигайся.";

        }

    }, 5000);


    setTimeout(() => {

        if (currentVisitor !== visitor)
            return;

        if (visitor.evil) {

            visitorImage.style.filter =
                "brightness(.4) contrast(1.7)";

            visitorDescription.textContent =
                "Он ближе.";

        }

    }, 10000);
}


/* =========================
   EVIL REJECT
========================= */

function creepyRejectEvent() {

    setTimeout(() => {

        blackScreen.classList.remove(
            "hidden"
        );

        blackText.textContent =
            "Ты слышишь дыхание.";

        playSound(
            breathingSound
        );

    }, 1500);


    setTimeout(() => {

        blackText.textContent =
            "Но за дверью никого нет.";

    }, 3500);


    setTimeout(() => {

        blackText.textContent =
            "Тогда кто дышит?";

    }, 5200);


    setTimeout(() => {

        blackScreen.classList.add(
            "hidden"
        );

        statusText.textContent =
            "Наверное, показалось.";

    }, 7000);
}


/* =========================
   EVIL OPEN
========================= */

function evilEndingSequence(
    visitor
) {

    setTimeout(() => {

        blackScreen.classList.remove(
            "hidden"
        );

        blackText.textContent =
            "Ты открыл дверь.";

    }, 500);


    setTimeout(() => {

        blackText.textContent =
            `${visitor.name} вошёл.`;

    }, 2200);


    setTimeout(() => {

        blackText.textContent =
            "Он стоит прямо за тобой.";

        playSound(
            whisperSound
        );

    }, 4000);


    setTimeout(() => {

        jumpscareImage.src =
            getJumpscare(visitor);

        blackScreen.classList.add(
            "hidden"
        );

        jumpscare.classList.remove(
            "hidden"
        );

        playSound(
            jumpscareSound
        );

    }, 5700);


    setTimeout(() => {

        jumpscare.classList.add(
            "hidden"
        );

        badEnding(
            visitor
        );

    }, 8000);
}


/* =========================
   JUMPSCARE IMAGE
========================= */

function getJumpscare(visitor) {

    if (
        visitor.id === "igor"
    ) {

        return "assets/jumpscares/igor_jumpscare.png";
    }

    if (
        visitor.id === "faceless"
    ) {

        return "assets/jumpscares/faceless_jumpscare.png";
    }

    return "assets/jumpscares/thing_jumpscare.png";
}


/* =========================
   ENDING 1
   НОРМАЛЬНАЯ
========================= */

function goodEnding() {

    gameOver = true;

    ending.classList.remove(
        "hidden"
    );

    endingNumber.textContent =
        "КОНЦОВКА 1 / 3";

    endingTitle.textContent =
        "ОБЫЧНАЯ НОЧЬ";

    endingText.textContent =
        `Ты никого подозрительного не впустил.
        
Впущено: ${letIn}
Послано нахуй: ${rejected}

Утро наступило.

Ничего особенного не произошло.

Ну почти.`;

}


/* =========================
   ENDING 2
   ПОСЛАЛ ВСЕХ
========================= */

function badRejectEnding() {

    gameOver = true;

    ending.classList.remove(
        "hidden"
    );

    endingNumber.textContent =
        "КОНЦОВКА 2 / 3";

    endingTitle.textContent =
        "НИКОГО НЕ ВПУСКАЙ";

    endingText.textContent =
        `Ты никого не впустил.

Ты послал нахуй всех.

Даже бабушку.

Она до сих пор стоит под дверью.

И теперь она знает,
что ты дома.`;

}


/* =========================
   ENDING 3
   ПЛОХАЯ
========================= */

function badEnding(visitor) {

    gameOver = true;

    ending.classList.remove(
        "hidden"
    );

    endingNumber.textContent =
        "КОНЦОВКА 3 / 3";

    endingTitle.textContent =
        "ЗРЯ ОТКРЫЛ";

    endingText.textContent =
        `${visitor.name} оказался не человеком.

Ты открыл дверь.

Он вошёл.

Больше дверь никто не откроет.

По крайней мере,
изнутри.`;
}


/* =========================
   COUNTERS
========================= */

function updateCounters() {

    letInText.textContent =
        letIn;

    rejectedText.textContent =
        rejected;
}


/* =========================
   AUDIO
========================= */

function playSound(sound) {

    sound.currentTime = 0;

    sound.volume = .75;

    sound.play().catch(() => {});
}


/* =========================
   RESTART
========================= */

restart.addEventListener(
    "click",
    () => {

        location.reload();

    }
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (gameOver)
            return;

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


/* =========================
   START
========================= */

startGame();
