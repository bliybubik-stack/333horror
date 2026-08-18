/* =========================================================
   ОТКРОЙ ДВЕРЬ
   v1.0
========================================================= */


/* =========================================================
   НАСТРОЙКИ СЛОЖНОСТИ
========================================================= */

const DIFFICULTIES = {

    easy: {
        name: "ЛЕГКО",
        visitorTime: 35,
        monsterChance: 0.12,
        description:
            "Почти все нормальные."
    },

    normal: {
        name: "НОРМАЛЬНО",
        visitorTime: 28,
        monsterChance: 0.25,
        description:
            "Уже есть проблемы."
    },

    hard: {
        name: "СЛОЖНО",
        visitorTime: 22,
        monsterChance: 0.40,
        description:
            "Они начинают понимать."
    },

    nightmare: {
        name: "КОШМАР",
        visitorTime: 15,
        monsterChance: 0.60,
        description:
            "Они знают, что ты дома."
    }

};


let selectedDifficulty = "normal";

let difficulty =
    DIFFICULTIES[selectedDifficulty];


/* =========================================================
   DOM
========================================================= */

const menu =
    document.getElementById("menu");

const difficultyScreen =
    document.getElementById("difficultyScreen");

const loreScreen =
    document.getElementById("loreScreen");

const gameScreen =
    document.getElementById("gameScreen");

const ending =
    document.getElementById("ending");

const newGameButton =
    document.getElementById("newGameButton");

const difficultyButton =
    document.getElementById("difficultyButton");

const loreButton =
    document.getElementById("loreButton");

const backFromDifficulty =
    document.getElementById("backFromDifficulty");

const backFromLore =
    document.getElementById("backFromLore");

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

const visitorType =
    document.getElementById("visitorType");

const visitorDescription =
    document.getElementById("visitorDescription");

const visitorLore =
    document.getElementById("visitorLore");

const visitorNumber =
    document.getElementById("visitorNumber");

const visitorTimer =
    document.getElementById("visitorTimer");

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

const gameTime =
    document.getElementById("gameTime");

const difficultyName =
    document.getElementById("difficultyName");

const blackScreen =
    document.getElementById("blackScreen");

const blackText =
    document.getElementById("blackText");

const jumpscare =
    document.getElementById("jumpscare");

const jumpscareImage =
    document.getElementById("jumpscareImage");

const endingNumber =
    document.getElementById("endingNumber");

const endingTitle =
    document.getElementById("endingTitle");

const endingText =
    document.getElementById("endingText");

const restartButton =
    document.getElementById("restartButton");


/* =========================================================
   AUDIO
========================================================= */

const sounds = {

    bell:
        document.getElementById("doorbellSound"),

    knock:
        document.getElementById("knockSound"),

    breathing:
        document.getElementById("breathingSound"),

    whisper:
        document.getElementById("whisperSound"),

    jumpscare:
        document.getElementById("jumpscareSound")

};


/* =========================================================
   GAME STATE
========================================================= */

let currentVisitor = null;

let visitorIndex = 0;

let letIn = 0;

let rejected = 0;

let timer = null;

let seconds = 0;

let hour = 23;

let minute = 41;

let gameRunning = false;

let normalVisitors = 0;

let monstersRejected = 0;


/* =========================================================
   20 ПОСЕТИТЕЛЕЙ
=========================================================

   В каждой сложности будет 20 визитов.

   Каждый персонаж может появляться
   как нормальный или изменённый.

========================================================= */

const VISITORS = [

    {
        name: "Игорь Старый",
        age: 63,
        type: "СОСЕД",
        image: "assets/people/igor_old.png",

        lore:
            "Живёт в доме с 1988 года. Утверждает, что квартира 37 раньше была его.",

        description:
            "Старый мужик в потёртой куртке.",

        evil: false
    },


    {
        name: "Игорь Младший",
        age: 29,
        type: "СЫН",
        image: "assets/people/igor_young.png",

        lore:
            "Говорит, что его отец — Игорь Старый. Но Игорь Старый никогда не говорил о сыне.",

        description:
            "Молодой парень. Выглядит нормально.",

        evil: false
    },


    {
        name: "Игорь Ребёнок",
        age: 9,
        type: "РЕБЁНОК",
        image: "assets/people/igor_child.png",

        lore:
            "Ребёнок говорит, что живёт в квартире 37.",

        description:
            "Стоит и держит игрушку.",

        evil: false
    },


    {
        name: "Игорь Врач",
        age: 41,
        type: "ВРАЧ",
        image: "assets/people/igor_doctor.png",

        lore:
            "Представляется врачом. Почему-то знает твой диагноз.",

        description:
            "Белый халат. Медицинская сумка.",

        evil: false
    },


    {
        name: "Игорь Курьер",
        age: 24,
        type: "КУРЬЕР",
        image: "assets/people/igor_courier.png",

        lore:
            "Приносит посылки, которых ты никогда не заказывал.",

        description:
            "Курьер с коробкой.",

        evil: false
    },


    {
        name: "Игорь Полицейский",
        age: 38,
        type: "ПОЛИЦИЯ",
        image: "assets/people/igor_police.png",

        lore:
            "Говорит, что расследует исчезновения жильцов.",

        description:
            "Форма. Удостоверение показывает слишком быстро.",

        evil: false
    },


    {
        name: "Игорь Сосед",
        age: 34,
        type: "СОСЕД",
        image: "assets/people/igor_neighbor.png",

        lore:
            "Живёт этажом ниже. Каждый вечер просит соль.",

        description:
            "Обычный сосед.",

        evil: false
    },


    {
        name: "Игорь Рабочий",
        age: 47,
        type: "РАБОЧИЙ",
        image: "assets/people/igor_worker.png",

        lore:
            "Утверждает, что ремонтировал квартиру 37.",

        description:
            "Рабочая одежда. Грязные руки.",

        evil: false
    },


    {
        name: "Игорь Пьяный",
        age: 51,
        type: "ПЬЯНЫЙ",
        image: "assets/people/igor_drunk.png",

        lore:
            "Каждую ночь забывает, где живёт.",

        description:
            "Пахнет алкоголем даже через дверь.",

        evil: false
    },


    {
        name: "Игорь В КОСТЮМЕ",
        age: 45,
        type: "НЕИЗВЕСТНО",
        image: "assets/people/igor_suit.png",

        lore:
            "Никто в доме никогда не видел его днём.",

        description:
            "Чёрный костюм. Стоит неподвижно.",

        evil: true
    },


    {
        name: "Игорь Женщина",
        age: 37,
        type: "ЖЕНЩИНА",
        image: "assets/people/igor_woman.png",

        lore:
            "Говорит, что её зовут Игорь. И очень обижается на вопросы.",

        description:
            "Женщина с пакетом.",

        evil: false
    },


    {
        name: "Игорь Бомж",
        age: 58,
        type: "БЕЗДОМНЫЙ",
        image: "assets/people/igor_beggar.png",

        lore:
            "Живёт в подвале. По его словам, уже 20 лет.",

        description:
            "Старый человек с одеялом.",

        evil: false
    },


    {
        name: "Игорь Священник",
        age: 66,
        type: "СВЯЩЕННИК",
        image: "assets/people/igor_priest.png",

        lore:
            "Он пришёл не к тебе. Он пришёл за тем, кто стоит за тобой.",

        description:
            "Держит крест.",

        evil: false
    },


    {
        name: "Игорь В Маске",
        age: "?",
        type: "НЕИЗВЕСТНО",
        image: "assets/people/igor_mask.png",

        lore:
            "Никто не знает, зачем ему маска.",

        description:
            "Белая маска. Чёрная одежда.",

        evil: true
    },


    {
        name: "Игорь Улыбка",
        age: 44,
        type: "НЕИЗВЕСТНО",
        image: "assets/people/igor_smile.png",

        lore:
            "Он улыбается даже тогда, когда говорит о смерти.",

        description:
            "Слишком широкая улыбка.",

        evil: true
    },


    {
        name: "Игорь Без Лица",
        age: "?",
        type: "НЕ ЧЕЛОВЕК",
        image: "assets/people/igor_faceless.png",

        lore:
            "Лица нет. Но он знает, как ты выглядишь.",

        description:
            "На месте лица ничего.",

        evil: true
    },


    {
        name: "Игорь Высокий",
        age: "?",
        type: "СУЩНОСТЬ",
        image: "assets/people/igor_tall.png",

        lore:
            "Его голова почти касается потолка.",

        description:
            "Слишком высокий человек.",

        evil: true
    },


    {
        name: "Игорь Неправильный",
        age: 32,
        type: "ОШИБКА",
        image: "assets/people/igor_wrong.png",

        lore:
            "У него две правые руки.",

        description:
            "Сначала кажется нормальным.",

        evil: true
    },


    {
        name: "Игорь Мёртвый",
        age: 71,
        type: "МЁРТВЫЙ",
        image: "assets/people/igor_dead.png",

        lore:
            "Игорь Старый умер в 2009 году.",

        description:
            "Похож на фотографию из старого некролога.",

        evil: true
    },


    {
        name: "Игорь Неизвестный",
        age: "???",
        type: "НЕ ОПРЕДЕЛЕНО",
        image: "assets/people/igor_unknown.png",

        lore:
            "Он называет тебя по имени, хотя ты его не говорил.",

        description:
            "Ты не понимаешь, что видишь.",

        evil: true
    }

];


/* =========================================================
   MENU
========================================================= */

newGameButton.onclick = () => {

    showDifficulty();

};


difficultyButton.onclick = () => {

    showDifficulty();

};


loreButton.onclick = () => {

    menu.classList.add("hidden");

    loreScreen.classList.remove("hidden");

};


backFromLore.onclick = () => {

    loreScreen.classList.add("hidden");

    menu.classList.remove("hidden");

};


backFromDifficulty.onclick = () => {

    difficultyScreen.classList.add("hidden");

    menu.classList.remove("hidden");

};


/* =========================================================
   DIFFICULTY
========================================================= */

document
    .querySelectorAll(".difficulty")
    .forEach(button => {

        button.onclick = () => {

            selectedDifficulty =
                button.dataset.difficulty;

            difficulty =
                DIFFICULTIES[
                    selectedDifficulty
                ];

            startGame();

        };

    });


function showDifficulty() {

    menu.classList.add("hidden");

    difficultyScreen.classList.remove(
        "hidden"
    );

}


/* =========================================================
   START GAME
========================================================= */

function startGame() {

    difficulty =
        DIFFICULTIES[selectedDifficulty];

    difficultyName.textContent =
        difficulty.name;

    difficultyScreen.classList.add(
        "hidden"
    );

    ending.classList.add(
        "hidden"
    );

    gameScreen.classList.remove(
        "hidden"
    );

    visitorIndex = 0;

    letIn = 0;

    rejected = 0;

    normalVisitors = 0;

    monstersRejected = 0;

    currentVisitor = null;

    gameRunning = true;

    hour = 23;

    minute = 41;

    updateCounters();

    updateClock();

    statusText.textContent =
        "Сижу. Жду.";

    doorMessage.textContent =
        "Тишина.";

}


/* =========================================================
   CLOCK
========================================================= */

setInterval(() => {

    if (!gameRunning)
        return;

    minute++;

    if (minute >= 60) {

        minute = 0;

        hour++;

    }

    if (hour >= 24)
        hour = 0;

    updateClock();

}, 4000);


function updateClock() {

    gameTime.textContent =
        `${String(hour).padStart(2,"0")}:${String(minute).padStart(2,"0")}`;

}


/* =========================================================
   VISITOR
========================================================= */

doorbell.onclick = () => {

    if (!gameRunning)
        return;

    if (currentVisitor)
        return;

    if (visitorIndex >= 20) {

        finishNight();

        return;

    }

    visitorIndex++;

    let visitor =
        VISITORS[
            Math.floor(
                Math.random() *
                VISITORS.length
            )
        ];

    /*
        На лёгкой сложности
        монстры почти никогда не приходят.

        На кошмаре — очень часто.
    */

    if (
        Math.random() <
        difficulty.monsterChance
    ) {

        const monsters =
            VISITORS.filter(v => v.evil);

        visitor =
            monsters[
                Math.floor(
                    Math.random() *
                    monsters.length
                )
            ];

    }

    currentVisitor = visitor;

    visitorImage.src =
        visitor.image;

    visitorName.textContent =
        visitor.name;

    visitorAge.textContent =
        `Возраст: ${visitor.age}`;

    visitorType.textContent =
        visitor.type;

    visitorDescription.textContent =
        visitor.description;

    visitorLore.textContent =
        visitor.lore;

    visitorNumber.textContent =
        `${String(visitorIndex).padStart(2,"0")} / 20`;

    visitorScreen.classList.remove(
        "hidden"
    );

    statusText.textContent =
        "Кто-то у двери.";

    doorMessage.textContent =
        "КТО-ТО У ДВЕРИ";

    playSound(sounds.bell);

    startVisitorTimer();

    visitorEvents(visitor);

};


/* =========================================================
   TIMER
========================================================= */

function startVisitorTimer() {

    clearInterval(timer);

    seconds = 0;

    visitorTimer.textContent =
        "00:00";

    timer = setInterval(() => {

        seconds++;

        visitorTimer.textContent =
            `00:${String(seconds).padStart(2,"0")}`;

        if (
            seconds >=
            difficulty.visitorTime
        ) {

            visitorLeaves();

        }

    }, 1000);

}


/* =========================================================
   VISITOR EVENTS
========================================================= */

function visitorEvents(visitor) {

    setTimeout(() => {

        if (currentVisitor !== visitor)
            return;

        if (visitor.evil) {

            visitorDescription.textContent =
                "Он знает, что ты смотришь.";

        }

    }, 5000);


    setTimeout(() => {

        if (currentVisitor !== visitor)
            return;

        if (
            visitor.evil &&
            selectedDifficulty !== "easy"
        ) {

            visitorImage.style.filter =
                "brightness(.4) contrast(1.7)";

            visitorDescription.textContent =
                "Он стал ближе.";

        }

    }, 9000);


    setTimeout(() => {

        if (currentVisitor !== visitor)
            return;

        if (
            selectedDifficulty ===
            "nightmare"
        ) {

            playSound(
                sounds.whisper
            );

            visitorLore.textContent =
                "«Открой дверь.»";

        }

    }, 12000);

}


/* =========================================================
   OPEN
========================================================= */

openButton.onclick = () => {

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

        monsterEnding(visitor);

        return;

    }

    letIn++;

    normalVisitors++;

    updateCounters();

    statusText.textContent =
        "Он вошёл.";

    setTimeout(() => {

        statusText.textContent =
            visitor.name +
            " ушёл.";

    }, 2000);

};


/* =========================================================
   REJECT
========================================================= */

rejectButton.onclick = () => {

    if (!currentVisitor)
        return;

    const visitor =
        currentVisitor;

    clearInterval(timer);

    rejected++;

    if (visitor.evil)
        monstersRejected++;

    updateCounters();

    visitorScreen.classList.add(
        "hidden"
    );

    currentVisitor = null;

    statusText.textContent =
        "Пошёл нахуй.";

    doorMessage.textContent =
        "Он ушёл.";

    playSound(sounds.knock);


    /*
        Кошмар:
        монстр может остаться.
    */

    if (
        visitor.evil &&
        selectedDifficulty === "nightmare"
    ) {

        setTimeout(() => {

            blackScreen.classList.remove(
                "hidden"
            );

            blackText.textContent =
                "Он всё ещё стоит у двери.";

            playSound(
                sounds.breathing
            );

        }, 2500);


        setTimeout(() => {

            blackScreen.classList.add(
                "hidden"
            );

        }, 5000);

    }

};


/* =========================================================
   AUTO LEAVE
========================================================= */

function visitorLeaves() {

    clearInterval(timer);

    if (!currentVisitor)
        return;

    const visitor =
        currentVisitor;

    visitorScreen.classList.add(
        "hidden"
    );

    currentVisitor = null;

    statusText.textContent =
        visitor.name +
        " ушёл.";

    doorMessage.textContent =
        "Тишина.";

}


/* =========================================================
   MONSTER ENDING
========================================================= */

function monsterEnding(visitor) {

    gameRunning = false;

    setTimeout(() => {

        blackScreen.classList.remove(
            "hidden"
        );

        blackText.textContent =
            "Ты открыл дверь.";

    }, 500);


    setTimeout(() => {

        blackText.textContent =
            visitor.name +
            " вошёл.";

    }, 2000);


    setTimeout(() => {

        blackText.textContent =
            "Он стоит за тобой.";

        playSound(
            sounds.whisper
        );

    }, 4000);


    setTimeout(() => {

        blackScreen.classList.add(
            "hidden"
        );

        jumpscareImage.src =
            getJumpscare(visitor);

        jumpscare.classList.remove(
            "hidden"
        );

        playSound(
            sounds.jumpscare
        );

    }, 5500);


    setTimeout(() => {

        jumpscare.classList.add(
            "hidden"
        );

        showEnding(
            "КОНЦОВКА 3 / 4",
            "ЗРЯ ОТКРЫЛ",
            `${visitor.name} оказался не человеком.

Ты открыл дверь.

Он вошёл.

Теперь квартира 37 снова занята.`

        );

    }, 7500);

}


/* =========================================================
   JUMPSCARE
========================================================= */

function getJumpscare(visitor) {

    if (
        visitor.name.includes("Без Лица")
    )
        return "assets/jumpscares/faceless.png";

    if (
        visitor.name.includes("Высокий")
    )
        return "assets/jumpscares/tall.png";

    if (
        visitor.name.includes("Неизвестный")
    )
        return "assets/jumpscares/unknown.png";

    return "assets/jumpscares/igor.png";

}


/* =========================================================
   END NIGHT
========================================================= */

function finishNight() {

    gameRunning = false;

    /*
        Секретная концовка:
        если игрок практически всех
        монстров послал нахуй.
    */

    if (
        monstersRejected >= 5 &&
        letIn === 0
    ) {

        showEnding(
            "СЕКРЕТНАЯ КОНЦОВКА",
            "ТЫ ПОНЯЛ",
            `Ты никого не впустил.

Ты посмотрел в глазок.

Ты понял.

Они не приходили к тебе.

Они проверяли,
когда ты откроешь дверь.

Ты не открыл.

23:41 больше не наступило.`
        );

        return;

    }


    /*
        Если всех нормальных впускал.
    */

    if (
        normalVisitors >= 7 &&
        monstersRejected >= 2
    ) {

        showEnding(
            "КОНЦОВКА 1 / 4",
            "ОБЫЧНАЯ НОЧЬ",
            `Утро.

Все ушли.

Никто не умер.

Никто не ломился.

Ты пережил ночь.

Но на кухне лежит записка:

«Игорь вернётся».`
        );

        return;

    }


    showEnding(
        "КОНЦОВКА 2 / 4",
        "НИКОГО НЕ ВПУСКАЙ",
        `Ты никого не впустил.

Ты послал всех нахуй.

В 06:00 стало тихо.

Но звонок всё ещё горит.

Хотя электричество отключено.`
    );

}


/* =========================================================
   ENDING UI
========================================================= */

function showEnding(
    number,
    title,
    text
) {

    ending.classList.remove(
        "hidden"
    );

    endingNumber.textContent =
        number;

    endingTitle.textContent =
        title;

    endingText.textContent =
        text;

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

function playSound(sound) {

    if (!sound)
        return;

    sound.currentTime = 0;

    sound.volume = .7;

    sound.play().catch(() => {});

}


/* =========================================================
   RESTART
========================================================= */

restartButton.onclick = () => {

    ending.classList.add(
        "hidden"
    );

    gameScreen.classList.add(
        "hidden"
    );

    menu.classList.remove(
        "hidden"
    );

};


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (!gameRunning)
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
