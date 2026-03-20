class Card {
    constructor(id, name, description, cost, rarity, effect, preset = true) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.rarity = rarity;
        this.effect = effect;
        this._preset = preset;
    }

    get id() { return this._id; }
    get name() { return this._name; }   
    get description() { return this._description; }
    get cost() { return this._cost; }
    get rarity() { return this._rarity; }
    get effect() { return this._effect; }
    get preset() { return this._preset; }

    set name(value) {
        value = String(value).trim();
        if (value.length < 2) throw new Error("Название слишком короткое.");
        this._name = value;
    }

    set description(value) {
        value = String(value).trim();
        if (value.length < 5) throw new Error("Описание слишком короткое.");
        this._description = value;
    }

    set cost(value) {
        value = Number(value);
        if (!Number.isInteger(value) || value < 0 || value > 20) throw new Error("Стоимость от 0 до 20.");
        this._cost = value;
    }

    set rarity(value) {
        value = String(value).trim();
        if (!value) throw new Error("Укажите редкость.");
        this._rarity = value;
    }

    set effect(value) {
        value = String(value).trim();
        if (value.length < 5) throw new Error("Эффект слишком короткий.");
        this._effect = value;
    }

    getType() {
        return "Обычная карта";
    }

    getClassName() {
        return "custom";
    }

    getExtra() {
        return [];
    }

    update(data) {
        this.name = data.name;
        this.description = data.description;
        this.cost = data.cost;
        this.rarity = data.rarity;
        this.effect = data.effect;
    }

    toJSON() {
        return {
            classType: this.constructor.name,
            id: this.id,
            name: this.name,
            description: this.description,
            cost: this.cost,
            rarity: this.rarity,
            effect: this.effect,
            preset: this.preset
        };
    }

    render(editMode = false) {
        const article = document.createElement("article");
        article.className = `card-item ${this.getClassName()}`;

        article.innerHTML = `
            <div class="card-top">
                <h3 class="card-title">${this.name}</h3>
                <span class="card-badge">${this.getType()}</span>
            </div>
            <div class="card-meta">
                <span class="card-stat">Мана: ${this.cost}</span>
                <span class="card-stat">Редкость: ${this.rarity}</span>
                ${this.getExtra().map(item => `<span class="card-stat">${item}</span>`).join("")}
            </div>
            <p class="card-description">${this.description}</p>
            <p class="card-effect">${this.effect}</p>
            <div class="card-footer">
                <span class="card-origin">${this.preset ? "Базовая карта" : "Пользовательская карта"}</span>
                <div class="card-actions"></div>
            </div>
        `;

        const actions = article.querySelector(".card-actions");

        if (!this.preset) {
            const del = document.createElement("button");
            del.className = "button danger";
            del.type = "button";
            del.textContent = "Удалить";
            del.onclick = () => deleteCustomCard(this.id);
            actions.append(del);
        }

        if (editMode && this.preset) {
            article.append(createEditPanel(this));
        }

        return article;
    }
}

class WarriorCard extends Card {
    constructor(id, name, description, cost, rarity, effect, attack, weapon, preset = true) {
        super(id, name, description, cost, rarity, effect, preset);
        this.attack = attack;
        this.weapon = weapon;
    }

    get attack() { return this._attack; }
    get weapon() { return this._weapon; }

    set attack(value) {
        value = Number(value);
        if (!Number.isInteger(value) || value < 1 || value > 99) throw new Error("Атака от 1 до 99.");
        this._attack = value;
    }

    set weapon(value) {
        value = String(value).trim();
        if (!value) throw new Error("Укажите оружие.");
        this._weapon = value;
    }

    getType() { return "Воин"; }
    getClassName() { return "warrior"; }
    getExtra() { return [`Атака: ${this.attack}`, `Оружие: ${this.weapon}`]; }

    update(data) {
        super.update(data);
        this.attack = data.attack;
        this.weapon = data.weapon;
    }

    toJSON() {
        return { ...super.toJSON(), attack: this.attack, weapon: this.weapon };
    }
}

class PaladinCard extends Card {
    constructor(id, name, description, cost, rarity, effect, defense, blessing, preset = true) {
        super(id, name, description, cost, rarity, effect, preset);
        this.defense = defense;
        this.blessing = blessing;
    }

    get defense() { return this._defense; }
    get blessing() { return this._blessing; }

    set defense(value) {
        value = Number(value);
        if (!Number.isInteger(value) || value < 1 || value > 99) throw new Error("Защита от 1 до 99.");
        this._defense = value;
    }

    set blessing(value) {
        value = String(value).trim();
        if (!value) throw new Error("Укажите благословение.");
        this._blessing = value;
    }

    getType() { return "Паладин"; }
    getClassName() { return "paladin"; }
    getExtra() { return [`Защита: ${this.defense}`, `Благословение: ${this.blessing}`]; }

    update(data) {
        super.update(data);
        this.defense = data.defense;
        this.blessing = data.blessing;
    }

    toJSON() {
        return { ...super.toJSON(), defense: this.defense, blessing: this.blessing };
    }
}

class NecromancerCard extends Card {
    constructor(id, name, description, cost, rarity, effect, souls, ritual, preset = true) {
        super(id, name, description, cost, rarity, effect, preset);
        this.souls = souls;
        this.ritual = ritual;
    }

    get souls() { return this._souls; }
    get ritual() { return this._ritual; }

    set souls(value) {
        value = Number(value);
        if (!Number.isInteger(value) || value < 1 || value > 99) throw new Error("Души от 1 до 99.");
        this._souls = value;
    }

    set ritual(value) {
        value = String(value).trim();
        if (!value) throw new Error("Укажите ритуал.");
        this._ritual = value;
    }

    getType() { return "Некромант"; }
    getClassName() { return "necromancer"; }
    getExtra() { return [`Души: ${this.souls}`, `Ритуал: ${this.ritual}`]; }

    update(data) {
        super.update(data);
        this.souls = data.souls;
        this.ritual = data.ritual;
    }

    toJSON() {
        return { ...super.toJSON(), souls: this.souls, ritual: this.ritual };
    }
}

const STORAGE_KEY = "wow_cards";

const baseCards = [
    new WarriorCard(
        "preset-1",
        "Гаррош Адский Крик",
        "Вождь Орды, могучий воин, не знающий пощады.",
        5,
        "Легендарная",
        "Рывок: наносит 5 урона случайному врагу. Если враг убит, получает +2 к атаке.",
        8,
        "Горечь"
    ),
    new PaladinCard(
        "preset-2",
        "Утер Светоносный",
        "Верховный лорд Серебряного Авангарда, защитник Альянса.",
        6,
        "Легендарная",
        "Божественный щит: все союзники получают невосприимчивость к урону на 1 ход.",
        7,
        "Свет"
    ),
    new NecromancerCard(
        "preset-3",
        "Король Лич",
        "Повелитель Нордскола, властелин Плети.",
        7,
        "Легендарная",
        "Призыв армии мертвых: создаёт 3 скелетов на вашу сторону.",
        9,
        "Ледяная скорбь"
    )
];

let state = {
    editMode: false,
    presetCards: [],
    customCards: []
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    loadState();
    buildPage();
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        state = {
            editMode: false,
            presetCards: cloneCards(baseCards),
            customCards: []
        };
        saveState();
        return;
    }

    try {
        const saved = JSON.parse(raw);
        state.editMode = !!saved.editMode;
        state.presetCards = restoreCards(saved.presetCards, baseCards);
        state.customCards = restoreCards(saved.customCards, []);
    } catch {
        state = {
            editMode: false,
            presetCards: cloneCards(baseCards),
            customCards: []
        };
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        editMode: state.editMode,
        presetCards: state.presetCards.map(card => card.toJSON()),
        customCards: state.customCards.map(card => card.toJSON())
    }));
}

function cloneCards(cards) {
    return cards.map(card => createCard(card.toJSON()));
}

function restoreCards(saved, fallback) {
    if (!Array.isArray(saved) || saved.length === 0) return cloneCards(fallback);
    return saved.map(createCard);
}

function createCard(data) {
    if (data.classType === "WarriorCard") {
        return new WarriorCard(data.id, data.name, data.description, data.cost, data.rarity, data.effect, data.attack, data.weapon, data.preset);
    }
    if (data.classType === "PaladinCard") {
        return new PaladinCard(data.id, data.name, data.description, data.cost, data.rarity, data.effect, data.defense, data.blessing, data.preset);
    }
    return new NecromancerCard(data.id, data.name, data.description, data.cost, data.rarity, data.effect, data.souls, data.ritual, data.preset);
}

function buildPage() {
    document.body.innerHTML = "";
    document.body.append(buildHeader(), buildMain());
}

function buildHeader() {
    const header = document.createElement("header");
    header.className = "site-header";

    header.innerHTML = `
        <div class="header-inner">
            <div class="brand">
                <h1>Коллекция карт WoW</h1>
                <p>Управление коллекцией карт по мотивам Hearthstone</p>
            </div>
            <div class="header-actions"></div>
        </div>
    `;

    const actions = header.querySelector(".header-actions");

    const editBtn = button(
        state.editMode ? "Выключить редактирование" : "Включить редактирование",
        state.editMode ? "button danger" : "button primary",
        toggleEditMode
    );

    const resetBtn = button("Сбросить изменения", "button secondary", resetAll);

    actions.append(editBtn, resetBtn);
    return header;
}

function buildMain() {
    const main = document.createElement("main");
    main.className = "page-wrapper";
    main.append(buildHero(), buildContent());
    return main;
}

function buildHero() {
    const section = document.createElement("section");
    section.className = "hero";
    section.innerHTML = `
        <h2>Добро пожаловать в Азерот!</h2>
        <p>Коллекционируй легендарных героев, создавай свои карты и сражайся!</p>
        <div class="info-grid">
            <article class="info-card">
                <h3>Воин</h3>
                <p>Атакующие карты с мощным оружием</p>
            </article>
            <article class="info-card">
                <h3>Паладин</h3>
                <p>Защитные карты с благословениями</p>
            </article>
            <article class="info-card">
                <h3>Некромант</h3>
                <p>Карты с душами и ритуалами</p>
            </article>
        </div>
    `;
    return section;
}

function buildContent() {
    const wrapper = document.createElement("div");
    wrapper.className = "content-grid";
    wrapper.append(buildSidebar(), buildDeck());
    return wrapper;
}

function buildSidebar() {
    const aside = document.createElement("aside");
    aside.className = "sidebar";

    const section = document.createElement("section");
    section.innerHTML = `<h2>Добавить карту</h2>`;

    const form = document.createElement("form");
    form.id = "add-card-form";
    form.append(
        field("new-name", "Название карты"),
        textareaField("new-description", "Описание карты"),
        numberField("new-cost", "Стоимость маны", 0, 20),
        field("new-rarity", "Редкость"),
        textareaField("new-effect", "Эффект карты"),
        selectField("new-type", "Класс карты", [
            ["WarriorCard", "Воин"],
            ["PaladinCard", "Паладин"],
            ["NecromancerCard", "Некромант"]
        ]),
        numberField("new-a", "Атака / Защита / Души", 1, 99),
        field("new-b", "Оружие / Благословение / Ритуал"),
        button("Создать карту", "button success", null, "submit"),
        messageBlock("add-card-message")
    );

    form.addEventListener("submit", addCard);
    section.append(form);
    aside.append(section);

    return aside;
}

function buildDeck() {
    const area = document.createElement("div");
    area.className = "deck-area";
    area.append(buildPresetSection(), buildCustomSection());
    return area;
}

function buildPresetSection() {
    const section = document.createElement("section");
    section.className = "section-block";

    const title = document.createElement("h2");
    title.textContent = "Легендарные герои";

    const text = document.createElement("p");
    text.textContent = "Знаменитые персонажи World of Warcraft, доступные для редактирования.";

    const grid = document.createElement("div");
    grid.className = "cards-grid";

    state.presetCards.forEach(card => grid.append(card.render(state.editMode)));

    section.append(title, text, grid);
    return section;
}

function buildCustomSection() {
    const section = document.createElement("section");
    section.className = "section-block";

    const title = document.createElement("h2");
    title.textContent = "Пользовательские карты";

    const text = document.createElement("p");
    text.textContent = "Карты, созданные тобой.";

    section.append(title, text);

    if (!state.customCards.length) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Пока пользовательских карт нет. Создай свою карту!";
        section.append(empty);
        return section;
    }

    const grid = document.createElement("div");
    grid.className = "cards-grid";
    state.customCards.forEach(card => grid.append(card.render(false)));
    section.append(grid);

    return section;
}

function addCard(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const msg = form.querySelector("#add-card-message");
    clearMessage(msg);

    try {
        const type = form.querySelector("#new-type").value;
        const id = "custom-" + Date.now();
        const data = {
            id,
            name: form.querySelector("#new-name").value,
            description: form.querySelector("#new-description").value,
            cost: form.querySelector("#new-cost").value,
            rarity: form.querySelector("#new-rarity").value,
            effect: form.querySelector("#new-effect").value,
            a: form.querySelector("#new-a").value,
            b: form.querySelector("#new-b").value
        };

        let card;

        if (type === "WarriorCard") {
            card = new WarriorCard(id, data.name, data.description, data.cost, data.rarity, data.effect, data.a, data.b, false);
        } else if (type === "PaladinCard") {
            card = new PaladinCard(id, data.name, data.description, data.cost, data.rarity, data.effect, data.a, data.b, false);
        } else {
            card = new NecromancerCard(id, data.name, data.description, data.cost, data.rarity, data.effect, data.a, data.b, false);
        }

        state.customCards.unshift(card);
        saveState();
        buildPage();
    } catch (error) {
        showMessage(msg, error.message, true);
    }
}

function deleteCustomCard(id) {
    if (!confirm("Удалить карту?")) return;
    state.customCards = state.customCards.filter(card => card.id !== id);
    saveState();
    buildPage();
}

function toggleEditMode() {
    state.editMode = !state.editMode;
    saveState();
    buildPage();
}

function resetAll() {
    if (!confirm("Сбросить все изменения?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = { editMode: false, presetCards: cloneCards(baseCards), customCards: [] };
    saveState();
    buildPage();
}

function createEditPanel(card) {
    const section = document.createElement("section");
    section.className = "edit-panel";

    const title = document.createElement("h4");
    title.textContent = "Редактирование карты";

    const form = document.createElement("form");
    form.append(
        field(`edit-name-${card.id}`, "Название карты", card.name, true),
        textareaField(`edit-description-${card.id}`, "Описание карты", card.description, true),
        numberField(`edit-cost-${card.id}`, "Стоимость маны", 0, 20, card.cost, true),
        field(`edit-rarity-${card.id}`, "Редкость", card.rarity, true),
        textareaField(`edit-effect-${card.id}`, "Эффект карты", card.effect, true),
        ...extraFields(card),
        button("Сохранить изменения", "button primary", null, "submit"),
        messageBlock(`msg-${card.id}`)
    );

    form.addEventListener("submit", (event) => saveEdit(event, card));
    section.append(title, form);
    return section;
}

function saveEdit(event, card) {
    event.preventDefault();
    const form = event.currentTarget;
    const msg = form.querySelector(".form-message");
    clearMessage(msg);

    try {
        const base = {
            name: form.querySelector(`#edit-name-${card.id}`).value,
            description: form.querySelector(`#edit-description-${card.id}`).value,
            cost: form.querySelector(`#edit-cost-${card.id}`).value,
            rarity: form.querySelector(`#edit-rarity-${card.id}`).value,
            effect: form.querySelector(`#edit-effect-${card.id}`).value
        };

        if (card instanceof WarriorCard) {
            card.update({
                ...base,
                attack: form.querySelector(`#extra-a-${card.id}`).value,
                weapon: form.querySelector(`#extra-b-${card.id}`).value
            });
        } else if (card instanceof PaladinCard) {
            card.update({
                ...base,
                defense: form.querySelector(`#extra-a-${card.id}`).value,
                blessing: form.querySelector(`#extra-b-${card.id}`).value
            });
        } else {
            card.update({
                ...base,
                souls: form.querySelector(`#extra-a-${card.id}`).value,
                ritual: form.querySelector(`#extra-b-${card.id}`).value
            });
        }

        saveState();
        buildPage();
    } catch (error) {
        showMessage(msg, error.message, true);
    }
}

function extraFields(card) {
    if (card instanceof WarriorCard) {
        return [
            numberField(`extra-a-${card.id}`, "Сила атаки", 1, 99, card.attack, true),
            field(`extra-b-${card.id}`, "Оружие", card.weapon, true)
        ];
    }

    if (card instanceof PaladinCard) {
        return [
            numberField(`extra-a-${card.id}`, "Защита", 1, 99, card.defense, true),
            field(`extra-b-${card.id}`, "Благословение", card.blessing, true)
        ];
    }

    return [
        numberField(`extra-a-${card.id}`, "Души", 1, 99, card.souls, true),
        field(`extra-b-${card.id}`, "Ритуал", card.ritual, true)
    ];
}

function field(id, labelText, value = "", filled = false) {
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `<label for="${id}">${labelText}</label><input type="text" id="${id}" name="${id}">`;
    const input = div.querySelector("input");
    if (filled) input.value = value;
    else input.placeholder = value;
    return div;
}

function textareaField(id, labelText, value = "", filled = false) {
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `<label for="${id}">${labelText}</label><textarea id="${id}" name="${id}"></textarea>`;
    const textarea = div.querySelector("textarea");
    if (filled) textarea.value = value;
    else textarea.placeholder = value;
    return div;
}

function numberField(id, labelText, min, max, value = "", filled = false) {
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `<label for="${id}">${labelText}</label><input type="number" id="${id}" name="${id}" min="${min}" max="${max}">`;
    const input = div.querySelector("input");
    if (filled) input.value = value;
    else input.placeholder = value;
    return div;
}

function selectField(id, labelText, items) {
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `<label for="${id}">${labelText}</label><select id="${id}" name="${id}"></select>`;
    const select = div.querySelector("select");

    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item[0];
        option.textContent = item[1];
        select.append(option);
    });

    return div;
}

function button(text, className, handler = null, type = "button") {
    const btn = document.createElement("button");
    btn.className = className;
    btn.type = type;
    btn.textContent = text;
    if (handler) btn.addEventListener("click", handler);
    return btn;
}

function messageBlock(id) {
    const div = document.createElement("div");
    div.id = id;
    div.className = "form-message";
    return div;
}

function showMessage(el, text, error = false) {
    el.textContent = text;
    el.className = `form-message ${error ? "error" : "success"}`;
}

function clearMessage(el) {
    el.textContent = "";
    el.className = "form-message";
}