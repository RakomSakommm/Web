(function() {
    const STORAGE = "wow_collection";

    class Unit {
        constructor(data, isBase = true) {
            this._id = data.id;
            this.name = data.name;
            this.desc = data.desc;
            this.cost = data.cost;
            this.grade = data.grade;
            this.text = data.text;
            this._isBase = isBase;
        }

        get id() { return this._id; }
        get name() { return this._name; }
        get desc() { return this._desc; }
        get cost() { return this._cost; }
        get grade() { return this._grade; }
        get text() { return this._text; }
        get isBase() { return this._isBase; }

        set name(v) {
            v = String(v).trim();
            if (v.length < 2) throw new Error("Название слишком короткое");
            this._name = v;
        }

        set desc(v) {
            v = String(v).trim();
            if (v.length < 5) throw new Error("Описание слишком короткое");
            this._desc = v;
        }

        set cost(v) {
            v = Number(v);
            if (!Number.isInteger(v) || v < 0 || v > 20) throw new Error("Стоимость от 0 до 20");
            this._cost = v;
        }

        set grade(v) {
            v = String(v).trim();
            if (!v) throw new Error("Укажите редкость");
            this._grade = v;
        }

        set text(v) {
            v = String(v).trim();
            if (v.length < 5) throw new Error("Эффект слишком короткий");
            this._text = v;
        }

        getType() { return "Обычный юнит"; }
        getClass() { return "normal"; }
        getExtra() { return []; }

        applyChanges(data) {
            this.name = data.name;
            this.desc = data.desc;
            this.cost = data.cost;
            this.grade = data.grade;
            this.text = data.text;
        }

        toJSON() {
            return {
                type: this.constructor.name,
                id: this.id,
                name: this.name,
                desc: this.desc,
                cost: this.cost,
                grade: this.grade,
                text: this.text,
                isBase: this.isBase
            };
        }

        render(edit = false) {
            const el = document.createElement("article");
            el.className = `card ${this.getClass()}`;

            el.innerHTML = `
                <div class="card-head">
                    <h3 class="card-name">${this.name}</h3>
                    <span class="card-tag">${this.getType()}</span>
                </div>
                <div class="card-stats">
                    <span class="card-stat">⚡ ${this.cost}</span>
                    <span class="card-stat">⭐ ${this.grade}</span>
                    ${this.getExtra().map(x => `<span class="card-stat">${x}</span>`).join("")}
                </div>
                <p class="card-desc">${this.desc}</p>
                <p class="card-effect">✨ ${this.text}</p>
                <div class="card-foot">
                    <span class="card-source">${this.isBase ? "Базовая" : "Своя"}</span>
                    <div class="card-btns"></div>
                </div>
            `;

            const btns = el.querySelector(".card-btns");

            if (!this.isBase) {
                const del = document.createElement("button");
                del.className = "btn danger";
                del.textContent = "Удалить";
                del.onclick = () => removeCard(this.id);
                btns.append(del);
            }

            if (edit && this.isBase) {
                el.append(createEditForm(this));
            }

            return el;
        }
    }

    class Berserker extends Unit {
        constructor(data, isBase = true) {
            super(data, isBase);
            this.attack = data.attack;
            this.weapon = data.weapon;
        }

        get attack() { return this._attack; }
        get weapon() { return this._weapon; }

        set attack(v) {
            v = Number(v);
            if (!Number.isInteger(v) || v < 1 || v > 99) throw new Error("Атака от 1 до 99");
            this._attack = v;
        }

        set weapon(v) {
            v = String(v).trim();
            if (!v) throw new Error("Укажите оружие");
            this._weapon = v;
        }

        getType() { return "Берсерк"; }
        getClass() { return "berserk"; }
        getExtra() { return [`🗡️ ${this.attack}`, `⚔️ ${this.weapon}`]; }

        applyChanges(data) {
            super.applyChanges(data);
            this.attack = data.attack;
            this.weapon = data.weapon;
        }

        toJSON() {
            return { ...super.toJSON(), attack: this.attack, weapon: this.weapon };
        }
    }

    class Guardian extends Unit {
        constructor(data, isBase = true) {
            super(data, isBase);
            this.armor = data.armor;
            this.bless = data.bless;
        }

        get armor() { return this._armor; }
        get bless() { return this._bless; }

        set armor(v) {
            v = Number(v);
            if (!Number.isInteger(v) || v < 1 || v > 99) throw new Error("Защита от 1 до 99");
            this._armor = v;
        }

        set bless(v) {
            v = String(v).trim();
            if (!v) throw new Error("Укажите благословение");
            this._bless = v;
        }

        getType() { return "Страж"; }
        getClass() { return "guard"; }
        getExtra() { return [`🛡️ ${this.armor}`, `✨ ${this.bless}`]; }

        applyChanges(data) {
            super.applyChanges(data);
            this.armor = data.armor;
            this.bless = data.bless;
        }

        toJSON() {
            return { ...super.toJSON(), armor: this.armor, bless: this.bless };
        }
    }

    class DarkMage extends Unit {
        constructor(data, isBase = true) {
            super(data, isBase);
            this.souls = data.souls;
            this.ritual = data.ritual;
        }

        get souls() { return this._souls; }
        get ritual() { return this._ritual; }

        set souls(v) {
            v = Number(v);
            if (!Number.isInteger(v) || v < 1 || v > 99) throw new Error("Души от 1 до 99");
            this._souls = v;
        }

        set ritual(v) {
            v = String(v).trim();
            if (!v) throw new Error("Укажите ритуал");
            this._ritual = v;
        }

        getType() { return "Некромант"; }
        getClass() { return "dark"; }
        getExtra() { return [`💀 ${this.souls}`, `📜 ${this.ritual}`]; }

        applyChanges(data) {
            super.applyChanges(data);
            this.souls = data.souls;
            this.ritual = data.ritual;
        }

        toJSON() {
            return { ...super.toJSON(), souls: this.souls, ritual: this.ritual };
        }
    }

    const presetList = [
        new Berserker({ id: "base_1", name: "Гаррош", desc: "Вождь Орды", cost: 5, grade: "Легендарная", text: "Рывок: 5 урона", attack: 8, weapon: "Горечь" }, true),
        new Guardian({ id: "base_2", name: "Утер", desc: "Верховный лорд", cost: 6, grade: "Легендарная", text: "Божественный щит", armor: 7, bless: "Свет" }, true),
        new DarkMage({ id: "base_3", name: "Король Лич", desc: "Повелитель Нордскола", cost: 7, grade: "Легендарная", text: "Призыв армии", souls: 9, ritual: "Ледяная скорбь" }, true)
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
        if (data.type === "Berserker") {
            return new Berserker(data, data.isBase);
        }
        if (data.type === "Guardian") {
            return new Guardian(data, data.isBase);
        }
        return new DarkMage(data, data.isBase);
    }

    function renderApp() {
        document.body.innerHTML = "";
        document.body.appendChild(buildHeader());
        document.body.appendChild(buildMain());
    }

    function buildHeader() {
        var header = document.createElement("header");
        header.className = "top-bar";
        header.innerHTML = '<div class="top-inner"><div><h1>WoW Коллекция</h1><p>Карточная коллекция по мотивам Hearthstone</p></div><div class="top-actions"></div></div>';

        var actions = header.querySelector(".top-actions");
        var editBtn = createButton(
            appState.editMode ? "Выкл. редакт" : "Вкл. редакт",
            appState.editMode ? "btn danger" : "btn primary",
            function() {
                appState.editMode = !appState.editMode;
                saveToStorage();
                renderApp();
            }
        );
        var resetBtn = createButton("Сброс", "btn secondary", function() {
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
        main.className = "main-wrap";
        main.appendChild(buildHero());
        main.appendChild(buildContent());
        return main;
    }

    function buildHero() {
        var sec = document.createElement("section");
        sec.className = "hero";
        sec.innerHTML = '<h2>Добро пожаловать в Азерот</h2><p>Собирай, создавай, редактируй</p><div class="hero-grid"><article><h3>Берсерк</h3><p>Атака + оружие</p></article><article><h3>Страж</h3><p>Защита + благословение</p></article><article><h3>Некромант</h3><p>Души + ритуал</p></article></div>';
        return sec;
    }

    function buildContent() {
        var wrapper = document.createElement("div");
        wrapper.className = "content-layout";
        wrapper.appendChild(buildForm());
        wrapper.appendChild(buildDeck());
        return wrapper;
    }

    function buildForm() {
        var aside = document.createElement("aside");
        aside.className = "form-panel";
        aside.innerHTML = '<h2>Добавить карту</h2>';

        var form = document.createElement("form");
        form.id = "addForm";
        form.appendChild(inputField("new_name", "Название"));
        form.appendChild(textareaField("new_desc", "Описание"));
        form.appendChild(numberField("new_cost", "Мана", 0, 20));
        form.appendChild(inputField("new_grade", "Редкость"));
        form.appendChild(textareaField("new_text", "Эффект"));
        form.appendChild(selectField("new_class", "Класс", [
            ["Berserker", "Берсерк"],
            ["Guardian", "Страж"],
            ["DarkMage", "Некромант"]
        ]));
        form.appendChild(numberField("new_a", "Атака / Защита / Души", 1, 99));
        form.appendChild(inputField("new_b", "Оружие / Благословение / Ритуал"));
        form.appendChild(createButton("Создать", "btn success", null, "submit"));
        form.appendChild(messageBlock("formMsg"));

        form.addEventListener("submit", addCard);
        aside.appendChild(form);
        return aside;
    }

    function buildDeck() {
        var area = document.createElement("div");
        area.className = "deck-area";

        var baseSec = document.createElement("section");
        baseSec.className = "block";
        baseSec.innerHTML = '<h2>Легендарные герои</h2><p>Предустановленные карты</p><div class="card-grid"></div>';
        var baseGrid = baseSec.querySelector(".card-grid");
        for (var i = 0; i < appState.base.length; i++) {
            baseGrid.appendChild(appState.base[i].render(appState.editMode));
        }

        var customSec = document.createElement("section");
        customSec.className = "block";
        customSec.innerHTML = '<h2>Мои карты</h2><p>Созданные тобой</p><div class="card-grid"></div>';
        var customGrid = customSec.querySelector(".card-grid");

        if (appState.custom.length === 0) {
            customGrid.innerHTML = '<p class="empty">Пока пусто. Создай первую карту!</p>';
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
        var msg = document.getElementById("formMsg");
        clearMsg(msg);

        try {
            var type = form.querySelector("#new_class").value;
            var id = "user_" + Date.now();
            var data = {
                id: id,
                name: form.querySelector("#new_name").value,
                desc: form.querySelector("#new_desc").value,
                cost: form.querySelector("#new_cost").value,
                grade: form.querySelector("#new_grade").value,
                text: form.querySelector("#new_text").value,
                a: form.querySelector("#new_a").value,
                b: form.querySelector("#new_b").value
            };

            var card;
            if (type === "Berserker") {
                card = new Berserker({ id: data.id, name: data.name, desc: data.desc, cost: data.cost, grade: data.grade, text: data.text, attack: data.a, weapon: data.b }, false);
            } else if (type === "Guardian") {
                card = new Guardian({ id: data.id, name: data.name, desc: data.desc, cost: data.cost, grade: data.grade, text: data.text, armor: data.a, bless: data.b }, false);
            } else {
                card = new DarkMage({ id: data.id, name: data.name, desc: data.desc, cost: data.cost, grade: data.grade, text: data.text, souls: data.a, ritual: data.b }, false);
            }

            appState.custom.unshift(card);
            saveToStorage();
            renderApp();
        } catch (err) {
            showMsg(msg, err.message, true);
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

    function createEditForm(card) {
        var box = document.createElement("div");
        box.className = "edit-panel";
        box.innerHTML = '<h4>Редактировать</h4>';

        var form = document.createElement("form");
        form.appendChild(inputField("edit_name_" + card.id, "Название", card.name, true));
        form.appendChild(textareaField("edit_desc_" + card.id, "Описание", card.desc, true));
        form.appendChild(numberField("edit_cost_" + card.id, "Мана", 0, 20, card.cost, true));
        form.appendChild(inputField("edit_grade_" + card.id, "Редкость", card.grade, true));
        form.appendChild(textareaField("edit_text_" + card.id, "Эффект", card.text, true));
        
        var extra = extraFields(card);
        for (var i = 0; i < extra.length; i++) {
            form.appendChild(extra[i]);
        }
        
        form.appendChild(createButton("Сохранить", "btn primary", null, "submit"));
        form.appendChild(messageBlock("msg_" + card.id));

        form.addEventListener("submit", function(ev) { saveEdit(ev, card); });
        box.appendChild(form);
        return box;
    }

    function saveEdit(ev, card) {
        ev.preventDefault();
        var form = ev.currentTarget;
        var msg = form.querySelector(".msg-block");
        clearMsg(msg);

        try {
            var base = {
                name: form.querySelector("#edit_name_" + card.id).value,
                desc: form.querySelector("#edit_desc_" + card.id).value,
                cost: form.querySelector("#edit_cost_" + card.id).value,
                grade: form.querySelector("#edit_grade_" + card.id).value,
                text: form.querySelector("#edit_text_" + card.id).value
            };

            if (card instanceof Berserker) {
                card.applyChanges({
                    name: base.name,
                    desc: base.desc,
                    cost: base.cost,
                    grade: base.grade,
                    text: base.text,
                    attack: form.querySelector("#extra_a_" + card.id).value,
                    weapon: form.querySelector("#extra_b_" + card.id).value
                });
            } else if (card instanceof Guardian) {
                card.applyChanges({
                    name: base.name,
                    desc: base.desc,
                    cost: base.cost,
                    grade: base.grade,
                    text: base.text,
                    armor: form.querySelector("#extra_a_" + card.id).value,
                    bless: form.querySelector("#extra_b_" + card.id).value
                });
            } else {
                card.applyChanges({
                    name: base.name,
                    desc: base.desc,
                    cost: base.cost,
                    grade: base.grade,
                    text: base.text,
                    souls: form.querySelector("#extra_a_" + card.id).value,
                    ritual: form.querySelector("#extra_b_" + card.id).value
                });
            }

            saveToStorage();
            renderApp();
        } catch (err) {
            showMsg(msg, err.message, true);
        }
    }

    function extraFields(card) {
        if (card instanceof Berserker) {
            return [
                numberField("extra_a_" + card.id, "Атака", 1, 99, card.attack, true),
                inputField("extra_b_" + card.id, "Оружие", card.weapon, true)
            ];
        }
        if (card instanceof Guardian) {
            return [
                numberField("extra_a_" + card.id, "Защита", 1, 99, card.armor, true),
                inputField("extra_b_" + card.id, "Благословение", card.bless, true)
            ];
        }
        return [
            numberField("extra_a_" + card.id, "Души", 1, 99, card.souls, true),
            inputField("extra_b_" + card.id, "Ритуал", card.ritual, true)
        ];
    }

    function inputField(id, label, val, filled) {
        var div = document.createElement("div");
        div.className = "field";
        div.innerHTML = '<label for="' + id + '">' + label + '</label><input type="text" id="' + id + '" name="' + id + '">';
        var inp = div.querySelector("input");
        if (filled) {
            inp.value = val;
        } else {
            inp.placeholder = val || "";
        }
        return div;
    }

    function textareaField(id, label, val, filled) {
        var div = document.createElement("div");
        div.className = "field";
        div.innerHTML = '<label for="' + id + '">' + label + '</label><textarea id="' + id + '" name="' + id + '"></textarea>';
        var ta = div.querySelector("textarea");
        if (filled) {
            ta.value = val;
        } else {
            ta.placeholder = val || "";
        }
        return div;
    }

    function numberField(id, label, min, max, val, filled) {
        var div = document.createElement("div");
        div.className = "field";
        div.innerHTML = '<label for="' + id + '">' + label + '</label><input type="number" id="' + id + '" name="' + id + '" min="' + min + '" max="' + max + '">';
        var inp = div.querySelector("input");
        if (filled) {
            inp.value = val;
        } else {
            inp.placeholder = val || "";
        }
        return div;
    }

    function selectField(id, label, items) {
        var div = document.createElement("div");
        div.className = "field";
        div.innerHTML = '<label for="' + id + '">' + label + '</label><select id="' + id + '" name="' + id + '"></select>';
        var sel = div.querySelector("select");
        for (var i = 0; i < items.length; i++) {
            var opt = document.createElement("option");
            opt.value = items[i][0];
            opt.textContent = items[i][1];
            sel.appendChild(opt);
        }
        return div;
    }

    function createButton(text, cls, handler, type) {
        var btn = document.createElement("button");
        btn.className = cls;
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
        div.className = "msg-block";
        return div;
    }

    function showMsg(el, text, isErr) {
        el.textContent = text;
        el.className = "msg-block " + (isErr ? "error" : "ok");
    }

    function clearMsg(el) {
        el.textContent = "";
        el.className = "msg-block";
    }

    loadFromStorage();
    renderApp();
})();
