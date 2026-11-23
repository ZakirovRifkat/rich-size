/* Rich Size mock-ups: shared behaviour. Each variant supplies its own markup and <template>s. */
(function () {
  'use strict';

  const P = window.RS_PRODUCTS || [];
  const C = window.RS_COLORS || {};
  const CATS = window.RS_CATEGORIES || [];
  const PHOTO_DIR = document.documentElement.dataset.photos || '../assets/photos/';
  const SIZES = [50, 52, 54, 56, 58, 60];

  // Approximate body measurements (cm) by RU size. Not from the client; marked as approximate in the UI.
  const SIZE_CHART = SIZES.map((s) => ({ size: s, bust: s * 2, waist: s * 2 - 18, hips: s * 2 + 8 }));
  window.RS_SIZE_CHART = SIZE_CHART;

  const I18N = {
    ru: {
      catalog: 'Каталог', new: 'Новинки', stores: 'Магазины', delivery: 'Доставка', cart: 'Корзина', search: 'Поиск', favourites: 'Избранное', menu: 'Меню',
      yourSize: 'Ваш размер', size: 'Размер', sizes: 'Размеры', colors: 'Расцветки', modelHeight: 'Рост модели', modelSize: 'Размер на модели',
      add: 'Добавить в корзину', added: 'Добавлено в корзину', stylist: 'Спросить стилиста в WhatsApp', kaspi: 'в рассрочку Kaspi', perMonth: '₸/мес.',
      checkout: 'Оформить заказ', checkoutWa: 'Заказать через WhatsApp', total: 'Итого', empty: 'Корзина пуста', emptyHint: 'Выберите размер и добавьте вещь — она появится здесь.',
      all: 'Все', onlyMine: 'Только в размере', sort: 'Сортировка', sortNew: 'Сначала новые', sortAsc: 'Сначала дешевле', sortDesc: 'Сначала дороже',
      items: 'вещей', seeAll: 'Смотреть всё', sizeChart: 'Таблица размеров', bust: 'Грудь', waist: 'Талия', hips: 'Бёдра', approx: 'Мерки ориентировочные, см',
      pickSize: 'Выберите размер', notInSize: 'Нет в вашем размере', inStock: 'Есть в магазинах', daily: 'Ежедневно', badgeNew: 'Новинка', badgeSale: 'Скидка',
      close: 'Закрыть', remove: 'Удалить', qty: 'Количество', example: 'Цена, размеры и данные модели — пример для макета', allSizes: 'Все размеры', noResults: 'В этом разделе нет вещей выбранного размера.', showAll: 'Показать все размеры'
    },
    kk: {
      catalog: 'Каталог', new: 'Жаңа түсімдер', stores: 'Дүкендер', delivery: 'Жеткізу', cart: 'Себет', search: 'Іздеу', favourites: 'Таңдаулылар', menu: 'Мәзір',
      yourSize: 'Сіздің өлшеміңіз', size: 'Өлшемі', sizes: 'Өлшемдері', colors: 'Түс нұсқалары', modelHeight: 'Модельдің бойы', modelSize: 'Модельдегі өлшем',
      add: 'Себетке қосу', added: 'Себетке қосылды', stylist: 'WhatsApp арқылы стилистен сұрау', kaspi: 'Kaspi бөліп төлеу', perMonth: '₸/ай',
      checkout: 'Тапсырыс беру', checkoutWa: 'WhatsApp арқылы тапсырыс беру', total: 'Барлығы', empty: 'Себет бос', emptyHint: 'Өлшемді таңдап, затты қосыңыз — ол осында пайда болады.',
      all: 'Барлығы', onlyMine: 'Тек менің өлшемім', sort: 'Сұрыптау', sortNew: 'Алдымен жаңалары', sortAsc: 'Алдымен арзандары', sortDesc: 'Алдымен қымбаттары',
      items: 'зат', seeAll: 'Барлығын көру', sizeChart: 'Өлшемдер кестесі', bust: 'Кеуде', waist: 'Бел', hips: 'Жамбас', approx: 'Өлшемдер шамамен, см',
      pickSize: 'Өлшемді таңдаңыз', notInSize: 'Сіздің өлшеміңізде жоқ', inStock: 'Дүкендерде бар', daily: 'Күн сайын', badgeNew: 'Жаңа', badgeSale: 'Жеңілдік',
      close: 'Жабу', remove: 'Өшіру', qty: 'Саны', example: 'Баға, өлшемдер мен модель деректері — макетке арналған мысал', allSizes: 'Барлық өлшемдер', noResults: 'Бұл өлшемде әзірге ештеңе жоқ. Барлық өлшемдерді көрсетейік пе?', showAll: 'Барлығын көрсету'
    }
  };

  /* ---------- storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };

  let lang = store.get('rs-lang', 'ru');
  let mySize = store.get('rs-size', null);
  let cart = store.get('rs-cart', []);

  const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.ru[k] || k;
  const itemsWord = (n) => { if (lang === 'kk') return 'зат'; const a = n % 10, b = n % 100; if (a === 1 && b !== 11) return 'вещь'; if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return 'вещи'; return 'вещей'; };
  const nm = (o) => (o && (o[lang] || o.ru)) || '';
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';
  const kaspi = (n) => fmt(Math.round(n / 12)).replace(' ₸', '') + ' ' + t('perMonth') + ' × 12';
  const photo = (id) => PHOTO_DIR + id + '.jpg';
  const byId = (id) => P.find((p) => p.id === id);
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const slot = (root, name) => root.querySelector('[data-slot="' + name + '"]');

  window.RS = { t, fmt, kaspi, photo, byId, products: P, colors: C, sizes: SIZES, get lang() { return lang; }, get size() { return mySize; } };

  /* ---------- language ---------- */
  function applyLang() {
    document.documentElement.lang = lang === 'kk' ? 'kk' : 'ru';
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-kk]').forEach((el) => {
      if (el.dataset.ru === undefined) el.dataset.ru = el.innerHTML;
      el.innerHTML = lang === 'kk' ? el.dataset.kk : el.dataset.ru;
    });
    $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$('[data-cat-name]').forEach((el) => { const c = CATS.find((x) => x.id === el.dataset.catName); if (c) el.textContent = nm(c); });
    $$('[data-store-city]').forEach((el) => { el.textContent = nm((window.RS_STORES || [])[+el.dataset.storeCity].city); });
    $$('[data-cat-alt]').forEach((el) => { const c = CATS.find((x) => x.id === el.dataset.catAlt); if (c) el.textContent = lang === 'kk' ? c.ru : c.kk; });
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang]');
    if (!b) return;
    lang = b.dataset.lang; store.set('rs-lang', lang);
    applyLang(); applySize(); renderAll();
  });

  /* ---------- size preference ---------- */
  function applySize() {
    document.body.dataset.size = mySize || '';
    $$('[data-size-set]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.sizeSet === mySize)));
    $$('[data-size-current]').forEach((el) => { el.textContent = mySize || '—'; });
    $$('[data-size-count]').forEach((el) => { const n = P.filter((p) => p.sizes.includes(+el.dataset.sizeCount)).length; el.textContent = n + ' ' + itemsWord(n) + '*'; });
    $$('[data-size-state]').forEach((el) => {
      if (mySize) el.dataset.on = ''; else delete el.dataset.on;
      if (!mySize) { el.textContent = lang === 'kk' ? 'Өлшемді таңдаңыз — тек сізге келетінін көрсетеміз' : 'Каталог покажет только вещи выбранного размера.'; return; }
      const n = P.filter((p) => p.sizes.includes(mySize)).length;
      el.textContent = lang === 'kk' ? mySize + ' өлшемінде ' + n + ' ' + itemsWord(n) + ' бар' : 'В размере ' + mySize + ' — ' + n + ' ' + itemsWord(n);
    });
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-size-set]');
    if (!b) return;
    const s = +b.dataset.sizeSet;
    mySize = mySize === s && b.hasAttribute('data-size-toggle') ? null : s;
    store.set('rs-size', mySize);
    applySize(); renderAll();
    document.dispatchEvent(new CustomEvent('rs:size', { detail: mySize }));
  });

  /* ---------- product cards ---------- */
  function fillCard(tpl, p) {
    const node = tpl.content.firstElementChild.cloneNode(true);
    const href = 'product.html?id=' + p.id;
    $$('a[data-slot="link"], [data-slot="link"]', node).concat(node.matches('[data-slot="link"]') ? [node] : []).forEach((a) => { a.href = href; });
    const img = slot(node, 'img');
    if (img) { img.src = photo(p.photos[0]); img.alt = nm(p); img.loading = 'lazy'; img.decoding = 'async'; }
    const img2 = slot(node, 'img2');
    if (img2) { if (p.photos[1]) { img2.src = photo(p.photos[1]); img2.alt = ''; img2.loading = 'lazy'; } else img2.remove(); }
    const set = (n, v) => { const el = slot(node, n); if (el) el.textContent = v; };
    set('name', nm(p));
    set('price', fmt(p.price));
    const old = slot(node, 'old');
    if (old) { if (p.oldPrice) old.textContent = fmt(p.oldPrice); else old.remove(); }
    set('kaspi', kaspi(p.price));
    set('model', t('modelHeight').toLowerCase() + ' ' + p.model.height + ' · ' + t('size').toLowerCase() + ' ' + p.model.size);
    set('model-height', p.model.height);
    set('model-size', p.model.size);
    set('fit-short', p.model.height + ' см, ' + p.model.size);
    set('fit', (lang === 'kk' ? 'Модель: бойы ' + p.model.height + ', өлшемі ' : 'Модель: рост ' + p.model.height + ', размер ') + p.model.size);
    set('sizes', p.sizes.length === SIZES.length ? SIZES[0] + '–' + SIZES[SIZES.length - 1] : p.sizes.join(' · '));
    set('cat', nm(CATS.find((c) => c.id === p.cat)));
    const sizesList = slot(node, 'size-list');
    if (sizesList) {
      sizesList.innerHTML = '';
      Array.from(new Set(SIZES.concat(p.sizes))).sort((a, b) => a - b).forEach((s) => {
        const li = document.createElement('li');
        li.textContent = s;
        if (!p.sizes.includes(s)) li.dataset.off = '';
        if (s === mySize) li.dataset.mine = '';
        sizesList.appendChild(li);
      });
    }
    const badge = slot(node, 'badge');
    if (badge) { if (p.badge) { badge.textContent = t(p.badge === 'sale' ? 'badgeSale' : 'badgeNew'); badge.dataset.kind = p.badge; } else badge.remove(); }
    const sw = slot(node, 'swatches');
    if (sw) {
      sw.innerHTML = '';
      p.colors.forEach((c) => { const i = document.createElement('i'); i.style.setProperty('--c', C[c].hex); i.title = nm(C[c]); sw.appendChild(i); });
    }
    const miss = slot(node, 'miss'); if (miss) { if (mySize && !p.sizes.includes(mySize)) miss.textContent = (lang === 'kk' ? 'Өлшемде жоқ: ' : 'Нет в размере ') + mySize; else miss.remove(); }
    if (mySize && !p.sizes.includes(mySize)) { node.dataset.notMine = ''; node.querySelector('.card__media, [data-slot="media"]')?.setAttribute('data-miss', (lang === 'kk' ? 'Өлшемде жоқ: ' : 'Нет в размере ') + mySize); }
    if (!p.real) node.dataset.example = '';
    node.dataset.id = p.id;
    return node;
  }

  function listFor(spec) {
    if (!spec) return P.slice();
    if (spec === 'new') return P.filter((p) => p.badge === 'new');
    if (spec.startsWith('cat:')) return P.filter((p) => p.cat === spec.slice(4));
    if (spec.startsWith('ids:')) return spec.slice(4).split(',').map(byId).filter(Boolean);
    if (spec.startsWith('related:')) {
      const cur = byId(new URLSearchParams(location.search).get('id') || 'jacket-classic');
      const out = spec.slice(8).split(',').map(byId).filter((p) => p && (!cur || p.id !== cur.id));
      if (cur) P.filter((p) => p.cat === cur.cat && p.id !== cur.id && !out.includes(p)).forEach((p) => out.push(p));
      return out;
    }
    if (spec === 'mine') return mySize ? P.filter((p) => p.sizes.includes(mySize)) : P.filter((p) => p.badge === 'new');
    return P.slice();
  }

  function renderLists() {
    $$('[data-products]').forEach((box) => {
      const tpl = document.getElementById(box.dataset.template || 'tpl-card');
      if (!tpl) return;
      const limit = +box.dataset.limit || 99;
      box.innerHTML = '';
      listFor(box.dataset.products).slice(0, limit).forEach((p) => box.appendChild(fillCard(tpl, p)));
    });
  }

  /* ---------- catalogue ---------- */
  const cat = { c: new URLSearchParams(location.search).get('cat') || '', sort: 'new', only: true };
  function renderCatalog() {
    const box = $('[data-catalog]');
    if (!box) return;
    const tpl = document.getElementById(box.dataset.template || 'tpl-card');
    let list = P.filter((p) => !cat.c || p.cat === cat.c);
    if (cat.only && mySize) list = list.filter((p) => p.sizes.includes(mySize));
    if (cat.sort === 'asc') list.sort((a, b) => a.price - b.price);
    if (cat.sort === 'desc') list.sort((a, b) => b.price - a.price);
    box.innerHTML = '';
    list.forEach((p) => box.appendChild(fillCard(tpl, p)));
    $$('[data-count]').forEach((el) => { el.textContent = list.length ? list.length + ' ' + itemsWord(list.length) : ''; });
    $$('[data-cat-title]').forEach((el) => { const c = CATS.find((x) => x.id === cat.c); el.textContent = c ? nm(c) : t('catalog'); });
    $$('[data-cat]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === cat.c)));
    $$('[data-only-size]').forEach((b) => { b.setAttribute('aria-pressed', String(cat.only && !!mySize)); b.disabled = !mySize; });
    const empty = $('[data-catalog-empty]');
    if (empty) empty.hidden = list.length > 0;
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (b) { cat.c = b.dataset.cat; renderCatalog(); return; }
    const o = e.target.closest('[data-only-size]');
    if (o) { cat.only = !cat.only; renderCatalog(); return; }
    const s = e.target.closest('[data-show-all]');
    if (s) { cat.only = false; renderCatalog(); }
  });
  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-sort]')) { cat.sort = e.target.value; renderCatalog(); }
  });

  /* ---------- product page ---------- */
  const pdp = { id: new URLSearchParams(location.search).get('id') || 'jacket-classic', size: null, color: null, photo: 0 };
  function renderPdp() {
    const root = $('[data-pdp]');
    if (!root) return;
    const p = byId(pdp.id) || P[1];
    if (pdp.color === null) pdp.color = p.colors[0];
    if (pdp.size === null && mySize && p.sizes.includes(mySize)) pdp.size = mySize;
    document.title = nm(p) + ' — Rich Size';
    const set = (n, v) => $$('[data-pdp-' + n + ']', root).forEach((el) => { el.textContent = v; });
    set('name', nm(p));
    set('name-alt', lang === 'kk' ? p.ru : p.kk);
    set('price', fmt(p.price));
    set('kaspi', kaspi(p.price));
    set('model-height', p.model.height);
    set('model-size', p.model.size);
    set('color-name', nm(C[pdp.color]));
    set('cat', nm(CATS.find((c) => c.id === p.cat)));
    $$('[data-pdp-old]', root).forEach((el) => { el.textContent = p.oldPrice ? fmt(p.oldPrice) : ''; el.hidden = !p.oldPrice; });
    $$('[data-pdp-example]', root).forEach((el) => { el.hidden = !!p.real; });
    root.style.setProperty('--pick', C[pdp.color].hex);

    const main = $('[data-pdp-main]', root);
    if (main) { main.src = photo(p.photos[pdp.photo] || p.photos[0]); main.alt = nm(p); }
    const stack = $('[data-pdp-stack]', root);
    if (stack && stack.dataset.for !== p.id) {
      stack.dataset.for = p.id; stack.innerHTML = '';
      p.photos.forEach((ph, i) => { const im = document.createElement('img'); im.src = photo(ph); im.alt = i ? '' : nm(p); if (i) im.loading = 'lazy'; stack.appendChild(im); });
    }
    const thumbs = $('[data-pdp-thumbs]', root);
    if (thumbs) {
      thumbs.innerHTML = '';
      p.photos.forEach((ph, i) => {
        const b = document.createElement('button');
        b.type = 'button'; b.dataset.photo = i; b.setAttribute('aria-pressed', String(i === pdp.photo));
        b.setAttribute('aria-label', (i + 1) + ' / ' + p.photos.length);
        const im = document.createElement('img'); im.src = photo(ph); im.alt = ''; b.appendChild(im);
        thumbs.appendChild(b);
      });
      thumbs.hidden = p.photos.length < 2;
    }
    const sizes = $('[data-pdp-sizes]', root);
    if (sizes) {
      sizes.innerHTML = '';
      Array.from(new Set(SIZES.concat(p.sizes))).sort((a, b) => a - b).forEach((s) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'size-btn'; b.textContent = s; b.dataset.pick = s;
        b.disabled = !p.sizes.includes(s);
        b.setAttribute('aria-pressed', String(s === pdp.size));
        if (s === mySize) b.dataset.mine = '';
        sizes.appendChild(b);
      });
    }
    const colors = $('[data-pdp-colors]', root);
    if (colors) {
      colors.innerHTML = '';
      p.colors.forEach((c) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'swatch'; b.dataset.color = c; b.style.setProperty('--c', C[c].hex);
        b.setAttribute('aria-label', nm(C[c])); b.setAttribute('aria-pressed', String(c === pdp.color));
        colors.appendChild(b);
      });
    }
    const add = $('[data-pdp-add]', root);
    if (add) { add.dataset.state = pdp.size ? 'ready' : 'need-size'; const l = add.querySelector('[data-add-label]'); if (l) l.textContent = pdp.size ? t('add') : t('pickSize'); }
    set('sizes-text', p.sizes.join(', '));
    set('size-note', pdp.size ? t('size') + ' ' + pdp.size : t('size'));
    const wa = $('[data-pdp-wa]', root);
    if (wa) wa.href = waLink('Здравствуйте! Хочу спросить о товаре «' + p.ru + '»' + (pdp.size ? ', размер ' + pdp.size : '') + '.');
    renderSizeChart();
  }
  document.addEventListener('click', (e) => {
    const ph = e.target.closest('[data-photo]');
    if (ph) { pdp.photo = +ph.dataset.photo; renderPdp(); return; }
    const pk = e.target.closest('[data-pick]');
    if (pk) { pdp.size = +pk.dataset.pick; renderPdp(); return; }
    const co = e.target.closest('[data-color]');
    if (co) { pdp.color = co.dataset.color; renderPdp(); return; }
    const add = e.target.closest('[data-pdp-add]');
    if (add) {
      if (!pdp.size) {
        const s = $('[data-pdp-sizes]'); if (s) { s.dataset.shake = ''; setTimeout(() => delete s.dataset.shake, 500); s.querySelector('button:not(:disabled)')?.focus(); }
        return;
      }
      addToCart(pdp.id, pdp.size, pdp.color);
    }
  });

  function renderSizeChart() {
    $$('[data-size-chart]').forEach((box) => {
      box.innerHTML = '';
      const head = document.createElement('div'); head.className = 'sc-row sc-head';
      head.innerHTML = '<span>' + t('size') + '</span><span>' + t('bust') + '</span><span>' + t('waist') + '</span><span>' + t('hips') + '</span>';
      box.appendChild(head);
      SIZE_CHART.forEach((r) => {
        const row = document.createElement('div'); row.className = 'sc-row';
        if (r.size === mySize || r.size === pdp.size) row.dataset.mine = '';
        row.innerHTML = '<b>' + r.size + '</b>' + ['bust', 'waist', 'hips'].map((k) => '<span class="sc-cell"><em>' + r[k] + '</em></span>').join('');
        box.appendChild(row);
      });
    });
  }

  /* ---------- cart ---------- */
  function waLink(text) { return 'https://wa.me/' + window.RS_WHATSAPP + '?text=' + encodeURIComponent(text); }
  function saveCart() { store.set('rs-cart', cart); }
  function addToCart(id, size, color) {
    const hit = cart.find((i) => i.id === id && i.size === size && i.color === color);
    if (hit) hit.qty += 1; else cart.push({ id, size, color, qty: 1 });
    saveCart(); renderCart(); openCart(true);
  }
  function renderCart() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    $$('[data-cart-count]').forEach((el) => { el.textContent = count; el.hidden = count === 0; });
    const list = $('[data-cart-list]');
    if (!list) return;
    const tpl = document.getElementById('tpl-cart-item');
    list.innerHTML = '';
    let total = 0;
    cart.forEach((i, idx) => {
      const p = byId(i.id); if (!p || !tpl) return;
      total += p.price * i.qty;
      const n = tpl.content.firstElementChild.cloneNode(true);
      const img = slot(n, 'img'); if (img) { img.src = photo(p.photos[0]); img.alt = ''; }
      const set = (k, v) => { const el = slot(n, k); if (el) el.textContent = v; };
      set('name', nm(p));
      set('meta', t('size') + ' ' + i.size + ', ' + nm(C[i.color]));
      set('price', fmt(p.price * i.qty));
      set('qty', i.qty);
      n.dataset.idx = idx;
      list.appendChild(n);
    });
    $$('[data-cart-total]').forEach((el) => { el.textContent = fmt(total); });
    $$('[data-cart-kaspi]').forEach((el) => { el.textContent = kaspi(total); });
    $$('[data-cart-empty]').forEach((el) => { el.hidden = cart.length > 0; });
    $$('[data-cart-full]').forEach((el) => { el.hidden = cart.length === 0; });
    const wa = $('[data-cart-wa]');
    if (wa) wa.href = waLink('Здравствуйте! Хочу заказать:\n' + cart.map((i) => { const p = byId(i.id); return '— ' + p.ru + ', размер ' + i.size + ', ' + C[i.color].ru + ' × ' + i.qty; }).join('\n'));
  }
  document.addEventListener('click', (e) => {
    const row = e.target.closest('[data-idx]');
    if (row) {
      const i = cart[+row.dataset.idx];
      if (e.target.closest('[data-qty-inc]')) { i.qty += 1; }
      else if (e.target.closest('[data-qty-dec]')) { i.qty -= 1; if (i.qty < 1) cart.splice(+row.dataset.idx, 1); }
      else if (e.target.closest('[data-remove]')) { cart.splice(+row.dataset.idx, 1); }
      else return;
      saveCart(); renderCart();
    }
  });

  let lastFocus = null;
  function openCart(fromAdd) {
    const c = $('[data-cart]'); if (!c) return;
    lastFocus = document.activeElement;
    c.dataset.open = ''; document.body.dataset.drawer = 'cart';
    c.removeAttribute('inert');
    if (!fromAdd) setTimeout(() => $('[data-cart-close]', c)?.focus(), 30);
  }
  function closeDrawers() {
    $$('[data-cart], [data-menu]').forEach((d) => { delete d.dataset.open; d.setAttribute('inert', ''); });
    delete document.body.dataset.drawer;
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-cart-open]')) { e.preventDefault(); openCart(); }
    else if (e.target.closest('[data-menu-open]')) {
      const m = $('[data-menu]'); if (!m) return;
      lastFocus = document.activeElement; m.dataset.open = ''; m.removeAttribute('inert'); document.body.dataset.drawer = 'menu';
      setTimeout(() => $('[data-menu-close]', m)?.focus(), 30);
    }
    else if (e.target.closest('[data-cart-close], [data-menu-close], [data-scrim]')) closeDrawers();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (document.body.dataset.drawer) closeDrawers();
    $$('[data-popover]:not([hidden])').forEach((p) => { p.hidden = true; $$('[data-toggle="' + p.id + '"]').forEach((b) => b.setAttribute('aria-expanded', 'false')); });
  });

  /* ---------- tabs: [data-tab] inside [role=tablist]; [data-tab-go] jumps to one ---------- */
  function selectTab(id) {
    $$('[data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
    $$('[role="tabpanel"]').forEach((p) => { p.hidden = p.id !== 'tab-' + id; });
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tab]');
    if (b) { selectTab(b.dataset.tab); return; }
    const g = e.target.closest('[data-tab-go]');
    if (g) { e.preventDefault(); selectTab(g.dataset.tabGo); $('[role="tablist"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });
  if (location.hash && location.hash.startsWith('#') && document.getElementById('tab-' + location.hash.slice(1))) selectTab(location.hash.slice(1));

  /* ---------- popovers: [data-toggle="id"] shows/hides #id[data-popover] ---------- */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-toggle]');
    $$('[data-popover]:not([hidden])').forEach((p) => {
      if (b && b.dataset.toggle === p.id) return;
      if (p.contains(e.target) && !e.target.closest('[data-size-set]')) return;
      p.hidden = true; $$('[data-toggle="' + p.id + '"]').forEach((x) => x.setAttribute('aria-expanded', 'false'));
    });
    if (!b) return;
    const p = document.getElementById(b.dataset.toggle); if (!p) return;
    p.hidden = !p.hidden; b.setAttribute('aria-expanded', String(!p.hidden));
  });

  /* ---------- solid header after the hero ---------- */
  const head = $('[data-head]');
  if (head && head.hasAttribute('data-head-over')) {
    const onScroll = () => head.toggleAttribute('data-solid', window.scrollY > 24);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $('[data-toast]'); if (!el) return;
    el.textContent = msg; el.dataset.show = '';
    clearTimeout(toastTimer); toastTimer = setTimeout(() => delete el.dataset.show, 2200);
  }


  /* ---------- store status by Almaty time ---------- */
  function almatyMinutes() {
    try {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Almaty', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      const h = +parts.find((x) => x.type === 'hour').value, m = +parts.find((x) => x.type === 'minute').value;
      return (h % 24) * 60 + m;
    } catch (e) { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
  }
  function storeStatus(hours) {
    const m = hours.match(/(\d{2}):(\d{2})\D+(\d{2}):(\d{2})/);
    if (!m) return { open: false, text: '' };
    const from = +m[1] * 60 + +m[2], to = +m[3] * 60 + +m[4], now = almatyMinutes();
    const open = now >= from && now < to;
    const text = open ? (lang === 'kk' ? m[3] + ':' + m[4] + '-ге дейін ашық' : 'Открыто до ' + m[3] + ':' + m[4])
                      : (lang === 'kk' ? 'Жабық, ' + m[1] + ':' + m[2] + '-де ашылады' : 'Закрыто, откроется в ' + m[1] + ':' + m[2]);
    return { open, text };
  }
  window.RS.storeStatus = storeStatus;

  /* ---------- stores ---------- */
  function renderStores() {
    $$('[data-stores]').forEach((box) => {
      const tpl = document.getElementById(box.dataset.template || 'tpl-store');
      if (!tpl) return;
      box.innerHTML = '';
      (window.RS_STORES || []).forEach((s, i) => {
        const n = tpl.content.firstElementChild.cloneNode(true);
        const set = (k, v) => { const el = slot(n, k); if (el) el.textContent = v; };
        set('city', nm(s.city)); set('place', s.place); set('addr', s.addr); set('hours', s.hours ? t('daily') + ' ' + s.hours : (lang === 'kk' ? 'Жұмыс уақыты нақтыланады' : 'Часы уточним'));
        const c = slot(n, 'city'); if (c) c.dataset.storeCity = i;
        const st = slot(n, 'status'); if (st) { if (!s.hours) st.remove(); else { const r = storeStatus(s.hours); st.textContent = r.text; st.dataset.open = r.open ? 'yes' : 'no'; } }
        box.appendChild(n);
      });
    });
  }

  function renderOpenNow() {
    $$('[data-open-now]').forEach((el) => {
      const list = (window.RS_STORES || []).filter((x) => x.hours);
      const n = list.filter((x) => storeStatus(x.hours).open).length;
      el.dataset.open = n ? 'yes' : 'no';
      el.textContent = n ? (lang === 'kk' ? 'Алматыда қазір ' + list.length + ' дүкеннің ' + n + '-і ашық' : 'В Алматы сейчас открыто ' + n + ' из ' + list.length)
                         : (lang === 'kk' ? 'Алматыда қазір жабық, 09:00-де ашыламыз' : 'В Алматы сейчас закрыто, откроемся в 09:00');
    });
  }
  function renderAll() { renderLists(); renderCatalog(); renderPdp(); renderCart(); renderStores(); renderSizeChart(); renderOpenNow(); }

  function init() {
    $$('[data-cart], [data-menu]').forEach((d) => d.setAttribute('inert', ''));
    applyLang(); applySize(); renderAll();
    $$('[data-wa]').forEach((a) => { a.href = waLink(a.dataset.wa || 'Здравствуйте!'); a.target = '_blank'; a.rel = 'noopener'; });
    document.documentElement.dataset.ready = '';
    // a scrolling row fades at the edge only while more items are hidden there
    $$('.cats').forEach((row) => {
      const more = () => row.toggleAttribute('data-more', row.scrollLeft + row.clientWidth < row.scrollWidth - 2);
      row.addEventListener('scroll', more, { passive: true }); window.addEventListener('resize', more); more();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
