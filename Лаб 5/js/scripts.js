(function() {
    const STORAGE = "wow_collection";

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
                del.onclick = () => removeCard(this.id);
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

    const presetList = [
        new WarriorCard(
            "preset-1",
            "Гаррош Адский Крик",
            "Вождь Орды, могучий воин, не знающий пощады.",
            5,
            "Легендарная",
            "Рывок: наносит 5 урона случайному врагу. Если враг убит, получает +2 к атаке.",
            8,
            "Горечь",
            true
        ),
        new PaladinCard(
            "preset-2",
            "Утер Светоносный",
            "Верховный лорд Серебряного Авангарда, защитник Альянса.",
            6,
            "Легендарная",
            "Божественный щит: все союзники получают невосприимчивость к урону на 1 ход.",
            7,
            "Свет",
            true
        ),
        new NecromancerCard(
            "preset-3",
            "Король Лич",
            "Повелитель Нордскола, властелин Плети.",
            7,
            "Легендарная",
            "Призыв армии мертвых: создаёт 3 скелетов на вашу сторону.",
            9,
            "Ледяная скорбь",
            true
        )
    ];

    let appState = {
        editMode: false,
        base: [],
        custom: []
    };

    function saveToStorage() {
        localStorage.setItem(STORAGE, JSON.stringify({
            editMode: appState.editMode,
            base: appState.base.map(function(c) { return c.toJSON(); }),
            custom: appState.custom.map(function(c) { return c.toJSON(); })
        }));
    }

    function loadFromStorage() {
        var raw = localStorage.getItem(STORAGE);
        if (!raw) {
            appState.base = presetList.slice();
            appState.custom = [];
            saveToStorage();
            return;
        }

        try {
            var data = JSON.parse(raw);
            appState.editMode = !!data.editMode;
            appState.base = (data.base || []).map(function(c) { return restoreCard(c); });
            appState.custom = (data.custom || []).map(function(c) { return restoreCard(c); });
        } catch(e) {
            appState.base = presetList.slice();
            appState.custom = [];
        }
    }

    function restoreCard(data) {
        if (data.classType === "WarriorCard") {
            return new WarriorCard(data.id, data.name, data.description, data.cost, data.rarity, data.effect, data.attack, data.weapon, data.preset);
        }
        if (data.classType === "PaladinCard") {
            return new PaladinCard(data.id, data.name, data.description, data.cost, data.rarity, data.effect, data.defense, data.blessing, data.preset);
        }
        return new NecromancerCard(data.id, data.name, data.description, data.cost, data.rarity, data.effect, data.souls, data.ritual, data.preset);
    }

    function renderApp() {
        document.body.innerHTML = "";
        document.body.appendChild(buildHeader());
        document.body.appendChild(buildMain());
    }

    function buildHeader() {
        var header = document.createElement("header");
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

        var actions = header.querySelector(".header-actions");
        var editBtn = createButton(
            appState.editMode ? "Выключить редактирование" : "Включить редактирование",
            appState.editMode ? "button danger" : "button primary",
            function() {
                appState.editMode = !appState.editMode;
                saveToStorage();
                renderApp();
            }
        );
        var resetBtn = createButton("Сбросить изменения", "button secondary", function() {
            if (confirm("Сбросить всё?")) {
                localStorage.removeItem(STORAGE);
                appState = { editMode: false, base: presetList.slice(), custom: [] };
                saveToStorage();
                renderApp();
            }
        });

        actions.appendChild(editBtn);
        actions.appendChild(resetBtn);
        return header;
    }

    function buildMain() {
        var main = document.createElement("main");
        main.className = "page-wrapper";
        main.appendChild(buildHero());
        main.appendChild(buildContent());
        return main;
    }

    function buildHero() {
        var sec = document.createElement("section");
        sec.className = "hero";
        sec.innerHTML = `
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
        return sec;
    }

    function buildContent() {
        var wrapper = document.createElement("div");
        wrapper.className = "content-grid";
        wrapper.appendChild(buildSidebar());
        wrapper.appendChild(buildDeck());
        return wrapper;
    }

    function buildSidebar() {
        var aside = document.createElement("aside");
        aside.className = "sidebar";

        var section = document.createElement("section");
        section.innerHTML = "<h2>Добавить карту</h2>";

        var form = document.createElement("form");
        form.id = "add-card-form";
        form.appendChild(field("new-name", "Название карты"));
        form.appendChild(textareaField("new-description", "Описание карты"));
        form.appendChild(numberField("new-cost", "Стоимость маны", 0, 20));
        form.appendChild(field("new-rarity", "Редкость"));
        form.appendChild(textareaField("new-effect", "Эффект карты"));
        form.appendChild(selectField("new-type", "Класс карты", [
            ["WarriorCard", "Воин"],
            ["PaladinCard", "Паладин"],
            ["NecromancerCard", "Некромант"]
        ]));
        form.appendChild(numberField("new-a", "Атака / Защита / Души", 1, 99));
        form.appendChild(field("new-b", "Оружие / Благословение / Ритуал"));
        form.appendChild(createButton("Создать карту", "button success", null, "submit"));
        form.appendChild(messageBlock("add-card-message"));

        form.addEventListener("submit", addCard);
        section.appendChild(form);
        aside.appendChild(section);

        return aside;
    }

    function buildDeck() {
        var area = document.createElement("div");
        area.className = "deck-area";

        var baseSec = document.createElement("section");
        baseSec.className = "section-block";
        baseSec.innerHTML = "<h2>Легендарные герои</h2><p>Знаменитые персонажи World of Warcraft, доступные для редактирования.</p><div class=\"cards-grid\"></div>";
        var baseGrid = baseSec.querySelector(".cards-grid");
        for (var i = 0; i < appState.base.length; i++) {
            baseGrid.appendChild(appState.base[i].render(appState.editMode));
        }

        var customSec = document.createElement("section");
        customSec.className = "section-block";
        customSec.innerHTML = "<h2>Пользовательские карты</h2><p>Карты, созданные тобой.</p><div class=\"cards-grid\"></div>";
        var customGrid = customSec.querySelector(".cards-grid");

        if (appState.custom.length === 0) {
            customGrid.innerHTML = '<p class="empty-state">Пока пользовательских карт нет. Создай свою карту!</p>';
        } else {
            for (var j = 0; j < appState.custom.length; j++) {
                customGrid.appendChild(appState.custom[j].render(false));
            }
        }

        area.appendChild(baseSec);
        area.appendChild(customSec);
        return area;
    }

    function addCard(e) {
        e.preventDefault();
        var form = e.currentTarget;
        var msg = document.getElementById("add-card-message");
        clearMessage(msg);

        try {
            var type = form.querySelector("#new-type").value;
            var id = "custom-" + Date.now();
            var data = {
                id: id,
                name: form.querySelector("#new-name").value,
                description: form.querySelector("#new-description").value,
                cost: form.querySelector("#new-cost").value,
                rarity: form.querySelector("#new-rarity").value,
                effect: form.querySelector("#new-effect").value,
                a: form.querySelector("#new-a").value,
                b: form.querySelector("#new-b").value
            };

            var card;
            if (type === "WarriorCard") {
                card = new WarriorCard(id, data.name, data.description, data.cost, data.rarity, data.effect, data.a, data.b, false);
            } else if (type === "PaladinCard") {
                card = new PaladinCard(id, data.name, data.description, data.cost, data.rarity, data.effect, data.a, data.b, false);
            } else {
                card = new NecromancerCard(id, data.name, data.description, data.cost, data.rarity, data.effect, data.a, data.b, false);
            }

            appState.custom.unshift(card);
            saveToStorage();
            renderApp();
        } catch (err) {
            showMessage(msg, err.message, true);
        }
    }

    function removeCard(id) {
        if (!confirm("Удалить карту?")) return;
        var newCustom = [];
        for (var i = 0; i < appState.custom.length; i++) {
            if (appState.custom[i].id !== id) {
                newCustom.push(appState.custom[i]);
            }
        }
        appState.custom = newCustom;
        saveToStorage();
        renderApp();
    }

    function createEditPanel(card) {
        var box = document.createElement("div");
        box.className = "edit-panel";
        box.innerHTML = "<h4>Редактирование карты</h4>";

        var form = document.createElement("form");
        form.appendChild(field("edit-name-" + card.id, "Название карты", card.name, true));
        form.appendChild(textareaField("edit-description-" + card.id, "Описание карты", card.description, true));
        form.appendChild(numberField("edit-cost-" + card.id, "Стоимость маны", 0, 20, card.cost, true));
        form.appendChild(field("edit-rarity-" + card.id, "Редкость", card.rarity, true));
        form.appendChild(textareaField("edit-effect-" + card.id, "Эффект карты", card.effect, true));

        var extra = extraFields(card);
        for (var i = 0; i < extra.length; i++) {
            form.appendChild(extra[i]);
        }

        form.appendChild(createButton("Сохранить изменения", "button primary", null, "submit"));
        form.appendChild(messageBlock("msg-" + card.id));

        form.addEventListener("submit", function(ev) { saveEdit(ev, card); });
        box.appendChild(form);
        return box;
    }

    function saveEdit(ev, card) {
        ev.preventDefault();
        var form = ev.currentTarget;
        var msg = form.querySelector(".form-message");
        clearMessage(msg);

        try {
            var base = {
                name: form.querySelector("#edit-name-" + card.id).value,
                description: form.querySelector("#edit-description-" + card.id).value,
                cost: form.querySelector("#edit-cost-" + card.id).value,
                rarity: form.querySelector("#edit-rarity-" + card.id).value,
                effect: form.querySelector("#edit-effect-" + card.id).value
            };

            if (card instanceof WarriorCard) {
                card.update({
                    name: base.name,
                    description: base.description,
                    cost: base.cost,
                    rarity: base.rarity,
                    effect: base.effect,
                    attack: form.querySelector("#extra-a-" + card.id).value,
                    weapon: form.querySelector("#extra-b-" + card.id).value
                });
            } else if (card instanceof PaladinCard) {
                card.update({
                    name: base.name,
                    description: base.description,
                    cost: base.cost,
                    rarity: base.rarity,
                    effect: base.effect,
                    defense: form.querySelector("#extra-a-" + card.id).value,
                    blessing: form.querySelector("#extra-b-" + card.id).value
                });
            } else {
                card.update({
                    name: base.name,
                    description: base.description,
                    cost: base.cost,
                    rarity: base.rarity,
                    effect: base.effect,
                    souls: form.querySelector("#extra-a-" + card.id).value,
                    ritual: form.querySelector("#extra-b-" + card.id).value
                });
            }

            saveToStorage();
            renderApp();
        } catch (err) {
            showMessage(msg, err.message, true);
        }
    }

    function extraFields(card) {
        if (card instanceof WarriorCard) {
            return [
                numberField("extra-a-" + card.id, "Сила атаки", 1, 99, card.attack, true),
                field("extra-b-" + card.id, "Оружие", card.weapon, true)
            ];
        }
        if (card instanceof PaladinCard) {
            return [
                numberField("extra-a-" + card.id, "Защита", 1, 99, card.defense, true),
                field("extra-b-" + card.id, "Благословение", card.blessing, true)
            ];
        }
        return [
            numberField("extra-a-" + card.id, "Души", 1, 99, card.souls, true),
            field("extra-b-" + card.id, "Ритуал", card.ritual, true)
        ];
    }

    function field(id, labelText, value, filled) {
        var div = document.createElement("div");
        div.className = "form-group";
        div.innerHTML = '<label for="' + id + '">' + labelText + '</label><input type="text" id="' + id + '" name="' + id + '">';
        var input = div.querySelector("input");
        if (filled) {
            input.value = value;
        } else {
            input.placeholder = value || "";
        }
        return div;
    }

    function textareaField(id, labelText, value, filled) {
        var div = document.createElement("div");
        div.className = "form-group";
        div.innerHTML = '<label for="' + id + '">' + labelText + '</label><textarea id="' + id + '" name="' + id + '"></textarea>';
        var textarea = div.querySelector("textarea");
        if (filled) {
            textarea.value = value;
        } else {
            textarea.placeholder = value || "";
        }
        return div;
    }

    function numberField(id, labelText, min, max, value, filled) {
        var div = document.createElement("div");
        div.className = "form-group";
        div.innerHTML = '<label for="' + id + '">' + labelText + '</label><input type="number" id="' + id + '" name="' + id + '" min="' + min + '" max="' + max + '">';
        var input = div.querySelector("input");
        if (filled) {
            input.value = value;
        } else {
            input.placeholder = value || "";
        }
        return div;
    }

    function selectField(id, labelText, items) {
        var div = document.createElement("div");
        div.className = "form-group";
        div.innerHTML = '<label for="' + id + '">' + labelText + '</label><select id="' + id + '" name="' + id + '"></select>';
        var select = div.querySelector("select");
        for (var i = 0; i < items.length; i++) {
            var opt = document.createElement("option");
            opt.value = items[i][0];
            opt.textContent = items[i][1];
            select.appendChild(opt);
        }
        return div;
    }

    function createButton(text, className, handler, type) {
        var btn = document.createElement("button");
        btn.className = className;
        btn.type = type || "button";
        btn.textContent = text;
        if (handler) {
            btn.addEventListener("click", handler);
        }
        return btn;
    }

    function messageBlock(id) {
        var div = document.createElement("div");
        div.id = id;
        div.className = "form-message";
        return div;
    }

    function showMessage(el, text, error) {
        el.textContent = text;
        el.className = "form-message " + (error ? "error" : "success");
    }

    function clearMessage(el) {
        el.textContent = "";
        el.className = "form-message";
    }

    loadFromStorage();
    renderApp();
})();