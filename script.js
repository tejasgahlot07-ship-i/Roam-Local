// ==========================================
// ROAM LOCAL - GLOBAL JAVASCRIPT CONTROLLER
// (Evaluation 2: forms, DOM manipulation, events, localStorage + JSON export)
// ==========================================

// ----------------------------------------------------
// SHARED DATA: one source of truth for every destination.
// Used by the detail page, saved page and related-spots list.
// ----------------------------------------------------
const DESTINATIONS = [
    {
        "id": "cyber-hub",
        "name": "Cyber Hub & Horizon Center",
        "region": "gurugram",
        "regionLabel": "Gurugram",
        "rating": 4.8,
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3lf5oZMHvSFZifzUvfYp5Ip5XZIMziAPVD_wERHLPhQ&s=10",
        "desc": "High-end dining, open-air amphitheatres, and cosmopolitan nightlife hub in DLF Phase 2.",
        "about": "Cyber Hub is Gurugram's social and dining nerve centre, set beside the glass towers of DLF Cyber City. Expect an open-air amphitheatre, rooftop bars, live music nights and dozens of restaurants within walking distance of each other.",
        "bestTime": "Evenings, from 6 PM onwards",
        "entry": "Free to walk around",
        "access": "Rapid Metro to Belvedere Towers, then a short walk",
        "idealFor": "Friends, nightlife, food lovers",
        "map": "https://maps.google.com/?q=Cyber+Hub+Gurugram"
    },
    {
        "id": "qutub-minar",
        "name": "Qutub Complex & Mehrauli",
        "region": "south-delhi",
        "regionLabel": "South Delhi",
        "rating": 4.9,
        "img": "https://media.istockphoto.com/id/165204592/photo/qutub-minar-delhi-india.jpg?s=612x612&w=0&k=20&c=YvFLPmQmlgCyX7RGZA1VpKctdC6QsChINzLSMDPNI9k=",
        "desc": "UNESCO World Heritage minaret, ancient ruins, and chic design cafes in Mehrauli.",
        "about": "The red-sandstone Qutub Minar anchors a UNESCO World Heritage complex of medieval ruins, including the famed Iron Pillar. Mehrauli village next door adds heritage walks and design-led cafes.",
        "bestTime": "Early morning or late afternoon",
        "entry": "Ticketed (ASI monument)",
        "access": "Yellow Line to Qutub Minar station",
        "idealFor": "History buffs, photographers",
        "map": "https://maps.google.com/?q=Qutub+Minar+Delhi"
    },
    {
        "id": "hauz-khas",
        "name": "Hauz Khas Village & Lake",
        "region": "south-delhi",
        "regionLabel": "South Delhi",
        "rating": 4.7,
        "img": "https://www.backpackingwithmylens.com/wp-content/uploads/2017/12/hauz-khas-fort-view-from-the-lake-side.jpg",
        "desc": "14th-century reservoir paired with contemporary art galleries, indie boutiques, and rooftop bars.",
        "about": "A 14th-century reservoir and monument complex sits beside a lively village of art galleries, indie boutiques and rooftop bars. The lake views make it a favourite for sunset walks.",
        "bestTime": "Late afternoon into evening",
        "entry": "Free to wander; cafes and bars are paid",
        "access": "Yellow or Magenta Line to Hauz Khas station",
        "idealFor": "Couples, art lovers, nightlife",
        "map": "https://maps.google.com/?q=Hauz+Khas+Village+Delhi"
    },
    {
        "id": "leisure-valley",
        "name": "Leisure Valley & Kingdom of Dreams",
        "region": "gurugram",
        "regionLabel": "Gurugram",
        "rating": 4.6,
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/0d/d9/33/02/park-view.jpg",
        "desc": "Sprawling 25-acre urban green space featuring musical fountains, jogger tracks, and seasonal flower displays.",
        "about": "Leisure Valley is a long green belt in the heart of Gurugram with jogging tracks, musical fountains and seasonal flower displays. Kingdom of Dreams, a live-entertainment venue, is close by.",
        "bestTime": "Early morning or evening",
        "entry": "Free entry to the park",
        "access": "Best reached by cab or auto-rickshaw",
        "idealFor": "Families, joggers, picnics",
        "map": "https://maps.google.com/?q=Leisure+Valley+Park+Gurugram"
    },
    {
        "id": "sundar-nursery",
        "name": "Sundar Nursery Heritage Park",
        "region": "central-delhi",
        "regionLabel": "Central Delhi",
        "rating": 4.9,
        "img": "https://images.indianexpress.com/2018/02/asa-20180220-sunder-nursery-011.jpg",
        "desc": "Restored 16th-century Mughal garden park with over 300 tree species and serene marble water bodies.",
        "about": "A restored Mughal-era garden complex beside Humayun's Tomb, with heritage monuments, landscaped lawns and hundreds of tree species. One of the calmest corners of central Delhi.",
        "bestTime": "Morning or late afternoon",
        "entry": "Small entry fee",
        "access": "Violet Line to JLN Stadium station, then a short ride",
        "idealFor": "Nature lovers, photographers, families",
        "map": "https://maps.google.com/?q=Sundar+Nursery+Delhi"
    },
    {
        "id": "32nd-avenue",
        "name": "32nd Avenue (Milestone)",
        "region": "gurugram",
        "regionLabel": "Gurugram",
        "rating": 4.8,
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1HdwyVSSzCw2ClWtV7i1kcSKkUrnVdr1lQgesoRnaLwTxJzwLywqEoeY&s=10",
        "desc": "Charming cobblestone alleyways filled with artisanal bakeries, specialty coffee shops, and gourmet dining.",
        "about": "32nd Avenue, on Milestone Road, is a compact open-air market of cafes, bakeries and boutique restaurants. It is best enjoyed slowly, with a coffee and no fixed plans.",
        "bestTime": "Weekend mornings and evenings",
        "entry": "Free to walk around",
        "access": "Best reached by cab or auto-rickshaw",
        "idealFor": "Foodies, brunch crowd",
        "map": "https://maps.google.com/?q=32nd+Avenue+Milestone+Gurugram"
    }
];

// localStorage keys (browsers cannot silently write real files,
// so "saving to JSON" = localStorage + a downloadable .json export)
const KEYS = {
    messages: 'roam_local_messages',
    tips: 'roam_local_tips',
    votes: 'roam_local_votes',
    favorites: 'roam_local_favorites'
};

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------
const storage = {
    get(key, fallback) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value === null || value === undefined ? fallback : value;
        } catch (err) {
            return fallback;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (err) {
            return false;
        }
    }
};

// Prevents user text from being treated as HTML (XSS protection)
const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (ch) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));

// Triggers a browser download of any data as a .json file
const downloadJSON = (filename, data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const getFavorites = () => storage.get(KEYS.favorites, []);

// Builds a destination card (used on Saved page and "related spots")
const buildCardHTML = (d) => `
    <div class="card" data-id="${d.id}">
        <button type="button" class="fav-btn" data-id="${d.id}" aria-label="Save ${escapeHTML(d.name)} to favorites" aria-pressed="false">♡</button>
        <div style="overflow: hidden;">
            <img src="${d.img}" alt="${escapeHTML(d.name)}">
        </div>
        <div class="card-content">
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span class="badge">${escapeHTML(d.regionLabel.toUpperCase())}</span>
                    <span style="font-size: 0.8rem; color: var(--accent-color); font-weight: 600;">★ ${d.rating.toFixed(1)}</span>
                </div>
                <h4>${escapeHTML(d.name)}</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">${escapeHTML(d.desc)}</p>
            </div>
            <div class="card-actions">
                <a href="destination.html?id=${d.id}" class="map-btn">View details →</a>
            </div>
        </div>
    </div>`;

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. GLOBAL NAVIGATION: ACTIVE LINK + MOBILE TOGGLE
    // ----------------------------------------------------
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    const header = document.querySelector('header');
    const nav = header ? header.querySelector('nav') : null;

    if (header && nav) {
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-label', 'Toggle navigation menu');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
        header.insertBefore(toggle, nav);

        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.textContent = isOpen ? '✕' : '☰';
        });
    }

    // ----------------------------------------------------
    // 2. FAVORITES (works on every page with a .fav-btn / .fav-toggle)
    // ----------------------------------------------------
    const syncFavoriteButtons = () => {
        const favs = getFavorites();

        document.querySelectorAll('.fav-btn, .fav-toggle').forEach(btn => {
            const isSaved = favs.includes(btn.dataset.id);
            btn.classList.toggle('active', isSaved);
            btn.setAttribute('aria-pressed', String(isSaved));

            if (btn.classList.contains('fav-toggle')) {
                btn.textContent = isSaved ? '♥ Saved to favorites' : '♡ Save to favorites';
            } else {
                btn.textContent = isSaved ? '♥' : '♡';
            }
        });

        // Counter badge on the "Saved" nav link
        const savedLink = document.querySelector('nav a[href="saved.html"]');
        if (savedLink) {
            let badge = savedLink.querySelector('.nav-count');
            if (favs.length > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'nav-count';
                    savedLink.appendChild(badge);
                }
                badge.textContent = favs.length;
            } else if (badge) {
                badge.remove();
            }
        }
    };

    // Event delegation: one listener handles every heart button on the page
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.fav-btn, .fav-toggle');
        if (!btn) return;
        e.preventDefault();

        let favs = getFavorites();
        if (favs.includes(btn.dataset.id)) {
            favs = favs.filter(id => id !== btn.dataset.id);
        } else {
            favs.push(btn.dataset.id);
        }
        storage.set(KEYS.favorites, favs);

        document.dispatchEvent(new CustomEvent('favoritesChanged'));
        syncFavoriteButtons();
    });

    // ----------------------------------------------------
    // 3. EXPLORE PAGE: SEARCH + REGION FILTER + SORT
    // ----------------------------------------------------
    const exploreGrid = document.getElementById('exploreGrid');
    const searchInput = document.getElementById('searchInput');

    if (exploreGrid && searchInput) {
        const cards = Array.from(exploreGrid.querySelectorAll('.card[data-region]'));
        const filterButtons = document.querySelectorAll('.filter-btn');
        const sortSelect = document.getElementById('sortSelect');
        const resultsCount = document.getElementById('resultsCount');
        const noResults = document.getElementById('noResults');
        const resetBtn = document.getElementById('resetFilters');
        let activeCategory = 'all';

        cards.forEach((card, index) => { card.dataset.order = index; });

        const cardTitle = (card) => card.querySelector('h4').textContent;

        const applyFilters = () => {
            const query = searchInput.value.toLowerCase().trim();
            let visible = 0;

            cards.forEach(card => {
                const title = cardTitle(card).toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                const regionName = card.querySelector('.badge').textContent.toLowerCase();
                const region = card.dataset.region;

                const matchesSearch = `${title} ${desc} ${regionName}`.includes(query);
                const matchesCategory = activeCategory === 'all' || region === activeCategory;
                const show = matchesSearch && matchesCategory;

                card.hidden = !show;
                if (show) visible++;
            });

            resultsCount.textContent = `Showing ${visible} of ${cards.length} destinations`;
            noResults.hidden = visible > 0;
        };

        const sorters = {
            'default': (a, b) => Number(a.dataset.order) - Number(b.dataset.order),
            'rating-desc': (a, b) => Number(b.dataset.rating) - Number(a.dataset.rating),
            'rating-asc': (a, b) => Number(a.dataset.rating) - Number(b.dataset.rating),
            'name-asc': (a, b) => cardTitle(a).localeCompare(cardTitle(b))
        };

        const applySort = () => {
            const sorted = [...cards].sort(sorters[sortSelect.value] || sorters.default);
            sorted.forEach(card => exploreGrid.appendChild(card)); // re-order in the DOM
        };

        const setCategory = (category) => {
            activeCategory = category;
            filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === category);
            });
            applyFilters();
        };

        searchInput.addEventListener('input', applyFilters);
        sortSelect.addEventListener('change', applySort);
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => setCategory(btn.dataset.filter));
        });

        resetBtn.addEventListener('click', () => {
            searchInput.value = '';
            sortSelect.value = 'default';
            applySort();
            setCategory('all');
        });

        // Footer links can open Explore pre-filtered: explore.html?region=gurugram
        const presetRegion = new URLSearchParams(window.location.search).get('region');
        const validRegion = presetRegion && Array.from(filterButtons).some(b => b.dataset.filter === presetRegion);
        setCategory(validRegion ? presetRegion : 'all');
    }

    // ----------------------------------------------------
    // 4. DESTINATION DETAIL PAGE (built from URL ?id=...)
    // ----------------------------------------------------
    const detail = document.getElementById('destinationDetail');

    if (detail) {
        const id = new URLSearchParams(window.location.search).get('id');
        const d = DESTINATIONS.find(item => item.id === id);

        if (!d) {
            document.title = 'Destination not found - Roam Local';
            detail.innerHTML = `
                <div class="empty-state">
                    <h3>We couldn't find that destination</h3>
                    <p>The link may be broken or the spot may have been removed.</p>
                    <a href="explore.html" class="btn">Browse all destinations →</a>
                </div>`;
        } else {
            document.title = `${d.name} - Roam Local`;

            detail.innerHTML = `
                <a href="explore.html" class="back-link">← Back to all destinations</a>
                <div class="detail-hero">
                    <img src="${d.img}" alt="${escapeHTML(d.name)}">
                    <div class="detail-info">
                        <div class="detail-meta">
                            <span class="badge">${escapeHTML(d.regionLabel.toUpperCase())}</span>
                            <span style="font-size: 0.9rem; color: var(--accent-color); font-weight: 600;">★ ${d.rating.toFixed(1)}</span>
                        </div>
                        <h1>${escapeHTML(d.name)}</h1>
                        <p>${escapeHTML(d.about)}</p>
                        <ul class="info-list">
                            <li><span>Best time</span><span>${escapeHTML(d.bestTime)}</span></li>
                            <li><span>Entry</span><span>${escapeHTML(d.entry)}</span></li>
                            <li><span>Getting there</span><span>${escapeHTML(d.access)}</span></li>
                            <li><span>Ideal for</span><span>${escapeHTML(d.idealFor)}</span></li>
                        </ul>
                        <div class="detail-actions">
                            <button type="button" class="btn fav-toggle" data-id="${d.id}">♡ Save to favorites</button>
                            <a href="${d.map}" target="_blank" rel="noopener" class="btn btn-outline">Open in Google Maps</a>
                        </div>
                    </div>
                </div>`;

            // Related spots: same region first, otherwise other top-rated places
            const relatedSection = document.getElementById('relatedSection');
            const relatedGrid = document.getElementById('relatedGrid');
            const relatedTitle = document.getElementById('relatedTitle');

            let related = DESTINATIONS.filter(item => item.region === d.region && item.id !== d.id);
            relatedTitle.textContent = `More in ${d.regionLabel}`;

            if (related.length === 0) {
                related = DESTINATIONS.filter(item => item.id !== d.id)
                    .sort((a, b) => b.rating - a.rating);
                relatedTitle.textContent = 'You might also like';
            }

            relatedGrid.innerHTML = related.slice(0, 3).map(buildCardHTML).join('');
            relatedSection.hidden = false;
        }
    }

    // ----------------------------------------------------
    // 5. SAVED PLACES PAGE
    // ----------------------------------------------------
    const savedGrid = document.getElementById('savedGrid');

    if (savedGrid) {
        const savedEmpty = document.getElementById('savedEmpty');
        const savedSummary = document.getElementById('savedSummary');
        const clearBtn = document.getElementById('clearSavedBtn');
        const exportSavedBtn = document.getElementById('exportSavedBtn');

        const getSavedItems = () =>
            getFavorites().map(id => DESTINATIONS.find(d => d.id === id)).filter(Boolean);

        const renderSaved = () => {
            const items = getSavedItems();
            savedGrid.innerHTML = items.map(buildCardHTML).join('');
            savedEmpty.hidden = items.length > 0;
            clearBtn.hidden = items.length === 0;
            exportSavedBtn.hidden = items.length === 0;
            savedSummary.textContent = items.length === 0
                ? 'You haven\'t saved any places yet.'
                : `You have ${items.length} saved ${items.length === 1 ? 'place' : 'places'}, stored on this device.`;
        };

        document.addEventListener('favoritesChanged', renderSaved);

        clearBtn.addEventListener('click', () => {
            if (confirm('Remove all saved places?')) {
                storage.set(KEYS.favorites, []);
                renderSaved();
                syncFavoriteButtons();
            }
        });

        exportSavedBtn.addEventListener('click', () => {
            downloadJSON('roam_local_saved_places.json', getSavedItems());
        });

        renderSaved();
    }

    // ----------------------------------------------------
    // 6. COMMUNITY PAGE: UPVOTES, TIP FORM, PERSISTENCE
    // ----------------------------------------------------
    const communityGrid = document.getElementById('communityGrid');

    if (communityGrid) {
        const BASE_TIP_COUNT = 1420;
        let tips = storage.get(KEYS.tips, []);
        let votes = storage.get(KEYS.votes, {});

        const tipForm = document.getElementById('tipForm');
        const totalTipsMetric = document.getElementById('totalTipsMetric');
        const tipStatus = document.getElementById('tipStatus');
        const tipText = document.getElementById('tipText');
        const tipCounter = document.getElementById('tipTextCounter');
        const exportTipsBtn = document.getElementById('exportTipsBtn');

        const updateMetric = () => {
            totalTipsMetric.textContent = `${(BASE_TIP_COUNT + tips.length).toLocaleString()}+`;
        };

        const setVoteUI = (card, count, voted) => {
            const btn = card.querySelector('.upvote-btn');
            btn.setAttribute('data-count', count);
            btn.classList.toggle('voted', voted);
            btn.querySelector('.upvote-count').textContent = `👍 ${count}`;
        };

        const createTipCard = (tip) => {
            const card = document.createElement('div');
            card.className = 'community-card';
            card.dataset.tipId = tip.id;
            card.dataset.userTip = 'true';
            const posted = new Date(tip.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between;">
                    <span class="badge">💡 ${escapeHTML(tip.category)}</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Posted ${posted}</span>
                </div>
                <h3>${escapeHTML(tip.title)}</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted);">${escapeHTML(tip.text)}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; border-top: 1px solid var(--border-color); padding-top: 12px;">
                    <span style="font-size: 0.85rem; font-weight: 600;">${escapeHTML(tip.author)}</span>
                    <div class="tip-actions">
                        <button type="button" class="delete-tip">Remove</button>
                        <button type="button" class="upvote-btn" data-count="0">
                            <span class="upvote-count">👍 0</span>
                        </button>
                    </div>
                </div>`;
            return card;
        };

        // Restore saved tips (newest first) and saved votes on page load
        communityGrid.prepend(...tips.map(createTipCard));
        communityGrid.querySelectorAll('.community-card[data-tip-id]').forEach(card => {
            const saved = votes[card.dataset.tipId];
            if (saved) setVoteUI(card, saved.count, saved.voted);
        });
        updateMetric();

        // Upvote + delete (event delegation on the grid)
        communityGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.community-card');
            if (!card) return;

            const deleteBtn = e.target.closest('.delete-tip');
            if (deleteBtn) {
                if (!confirm('Remove your tip?')) return;
                tips = tips.filter(t => t.id !== card.dataset.tipId);
                delete votes[card.dataset.tipId];
                storage.set(KEYS.tips, tips);
                storage.set(KEYS.votes, votes);
                card.remove();
                updateMetric();
                return;
            }

            const upvoteBtn = e.target.closest('.upvote-btn');
            if (!upvoteBtn) return;

            let count = parseInt(upvoteBtn.getAttribute('data-count'), 10) || 0;
            const voted = !upvoteBtn.classList.contains('voted');
            count += voted ? 1 : -1;

            setVoteUI(card, count, voted);
            votes[card.dataset.tipId] = { count, voted };
            storage.set(KEYS.votes, votes);
        });

        // Tip form: validation, saving, rendering
        if (tipForm) {
            const authorInput = document.getElementById('tipAuthor');
            const categoryInput = document.getElementById('tipCategory');
            const titleInput = document.getElementById('tipTitle');

            const rules = [
                { input: authorInput, group: 'tipAuthorGroup', test: v => v.trim().length >= 2 },
                { input: titleInput, group: 'tipTitleGroup', test: v => v.trim().length >= 3 },
                { input: tipText, group: 'tipTextGroup', test: v => v.trim().length >= 10 }
            ];

            const validateField = (rule) => {
                const ok = rule.test(rule.input.value);
                document.getElementById(rule.group).classList.toggle('error', !ok);
                return ok;
            };

            rules.forEach(rule => {
                rule.input.addEventListener('blur', () => validateField(rule));
                rule.input.addEventListener('input', () => {
                    tipStatus.style.display = 'none';
                    if (document.getElementById(rule.group).classList.contains('error')) validateField(rule);
                });
            });

            // Live character counter
            const updateCounter = () => {
                const max = tipText.maxLength;
                tipCounter.textContent = `${tipText.value.length} / ${max}`;
                tipCounter.classList.toggle('limit', tipText.value.length >= max);
            };
            tipText.addEventListener('input', updateCounter);
            updateCounter();

            tipForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const valid = rules.map(validateField).every(Boolean);
                if (!valid) {
                    tipStatus.className = 'form-status error-summary';
                    tipStatus.textContent = 'Please fix the highlighted fields before posting.';
                    tipStatus.style.display = 'block';
                    return;
                }

                const tip = {
                    id: `tip-${Date.now()}`,
                    author: authorInput.value.trim(),
                    category: categoryInput.value.trim().toUpperCase() || 'LOCAL TIP',
                    title: titleInput.value.trim(),
                    text: tipText.value.trim(),
                    createdAt: new Date().toISOString()
                };

                tips.unshift(tip);
                storage.set(KEYS.tips, tips);
                communityGrid.prepend(createTipCard(tip));
                updateMetric();

                tipForm.reset();
                updateCounter();

                tipStatus.className = 'form-status success';
                tipStatus.textContent = 'Thanks! Your tip is live and saved on this device.';
                tipStatus.style.display = 'block';
            });
        }

        if (exportTipsBtn) {
            exportTipsBtn.addEventListener('click', () => {
                if (tips.length === 0) {
                    alert('You haven\'t posted any tips yet, so there is nothing to export.');
                    return;
                }
                downloadJSON('roam_local_tips.json', tips);
            });
        }
    }

    // ----------------------------------------------------
    // 7. CONTACT PAGE: VALIDATION, SAVING & JSON EXPORT
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const messageCounter = document.getElementById('messageCounter');
        const formStatus = document.getElementById('formStatus');
        const exportBtn = document.getElementById('exportJsonBtn');
        const savedCount = document.getElementById('savedCount');

        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

        const fields = [
            { input: nameInput, group: 'nameGroup', test: v => v.trim().length >= 2 },
            { input: emailInput, group: 'emailGroup', test: v => validateEmail(v.trim()) },
            { input: messageInput, group: 'messageGroup', test: v => v.trim().length >= 10 }
        ];

        const validateField = (field) => {
            const ok = field.test(field.input.value);
            document.getElementById(field.group).classList.toggle('error', !ok);
            return ok;
        };

        const updateSavedCount = () => {
            const total = storage.get(KEYS.messages, []).length;
            savedCount.textContent = total === 0
                ? 'No messages saved on this device yet.'
                : `${total} ${total === 1 ? 'message' : 'messages'} saved on this device.`;
        };

        const updateCounter = () => {
            const max = messageInput.maxLength;
            messageCounter.textContent = `${messageInput.value.length} / ${max}`;
            messageCounter.classList.toggle('limit', messageInput.value.length >= max);
        };

        fields.forEach(field => {
            field.input.addEventListener('blur', () => validateField(field));
            field.input.addEventListener('input', () => {
                formStatus.style.display = 'none';
                if (document.getElementById(field.group).classList.contains('error')) validateField(field);
            });
        });

        messageInput.addEventListener('input', updateCounter);

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const valid = fields.map(validateField).every(Boolean);

            if (valid) {
                const submission = {
                    id: Date.now(),
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim(),
                    submittedAt: new Date().toISOString()
                };

                const messages = storage.get(KEYS.messages, []);
                messages.push(submission);
                storage.set(KEYS.messages, messages);

                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been saved locally.';
                formStatus.style.display = 'block';

                contactForm.reset();
                updateCounter();
                updateSavedCount();
            } else {
                formStatus.className = 'form-status error-summary';
                formStatus.textContent = 'Please fix the errors above before submitting.';
                formStatus.style.display = 'block';
            }
        });

        exportBtn.addEventListener('click', () => {
            const messages = storage.get(KEYS.messages, []);
            if (messages.length === 0) {
                alert('No submitted messages found in local storage to export.');
                return;
            }
            downloadJSON('roam_local_submissions.json', messages);
        });

        updateCounter();
        updateSavedCount();
    }

    // Final pass: make every heart button reflect saved favorites
    syncFavoriteButtons();
});
