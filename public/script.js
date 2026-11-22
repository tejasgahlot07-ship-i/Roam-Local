// ==========================================
// ROAM LOCAL - GLOBAL JAVASCRIPT CONTROLLER
// (Evaluation 2 & 3: DOM interactions, form validation,
//  Express local JSON APIs, MongoDB CRUD APIs, and Open-Meteo External API)
// ==========================================

const DESTINATIONS = [
    {
        id: "cyber-hub",
        name: "Cyber Hub & Horizon Center",
        region: "gurugram",
        regionLabel: "Gurugram",
        lat: 28.4950,
        lon: 77.0895,
        rating: 4.8,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3lf5oZMHvSFZifzUvfYp5Ip5XZIMziAPVD_wERHLPhQ&s=10",
        desc: "High-end dining, open-air amphitheatres, and cosmopolitan nightlife hub in DLF Phase 2.",
        about: "Cyber Hub is Gurugram's social and dining nerve centre, set beside the glass towers of DLF Cyber City. Expect an open-air amphitheatre, rooftop bars, live music nights and dozens of restaurants within walking distance of each other.",
        bestTime: "Evenings, from 6 PM onwards",
        entry: "Free to walk around",
        access: "Rapid Metro to Belvedere Towers, then a short walk",
        idealFor: "Friends, nightlife, food lovers",
        map: "https://maps.google.com/?q=Cyber+Hub+Gurugram"
    },
    {
        id: "qutub-minar",
        name: "Qutub Complex & Mehrauli",
        region: "south-delhi",
        regionLabel: "South Delhi",
        lat: 28.5245,
        lon: 77.1855,
        rating: 4.9,
        img: "https://media.istockphoto.com/id/165204592/photo/qutub-minar-delhi-india.jpg?s=612x612&w=0&k=20&c=YvFLPmQmlgCyX7RGZA1VpKctdC6QsChINzLSMDPNI9k=",
        desc: "UNESCO World Heritage minaret, ancient ruins, and chic design cafes in Mehrauli.",
        about: "The red-sandstone Qutub Minar anchors a UNESCO World Heritage complex of medieval ruins, including the famed Iron Pillar. Mehrauli village next door adds heritage walks and design-led cafes.",
        bestTime: "Early morning or late afternoon",
        entry: "Ticketed (ASI monument)",
        access: "Yellow Line to Qutub Minar station",
        idealFor: "History buffs, photographers",
        map: "https://maps.google.com/?q=Qutub+Minar+Delhi"
    },
    {
        id: "hauz-khas",
        name: "Hauz Khas Village & Lake",
        region: "south-delhi",
        regionLabel: "South Delhi",
        lat: 28.5494,
        lon: 77.2001,
        rating: 4.7,
        img: "https://www.backpackingwithmylens.com/wp-content/uploads/2017/12/hauz-khas-fort-view-from-the-lake-side.jpg",
        desc: "14th-century reservoir paired with contemporary art galleries, indie boutiques, and rooftop bars.",
        about: "A 14th-century reservoir and monument complex sits beside a lively village of art galleries, indie boutiques and rooftop bars. The lake views make it a favourite for sunset walks.",
        bestTime: "Late afternoon into evening",
        entry: "Free to wander; cafes and bars are paid",
        access: "Yellow or Magenta Line to Hauz Khas station",
        idealFor: "Couples, art lovers, nightlife",
        map: "https://maps.google.com/?q=Hauz+Khas+Village+Delhi"
    },
    {
        id: "leisure-valley",
        name: "Leisure Valley & Kingdom of Dreams",
        region: "gurugram",
        regionLabel: "Gurugram",
        lat: 28.4675,
        lon: 77.0689,
        rating: 4.6,
        img: "https://media-cdn.tripadvisor.com/media/photo-s/0d/d9/33/02/park-view.jpg",
        desc: "Sprawling 25-acre urban green space featuring musical fountains, jogger tracks, and seasonal flower displays.",
        about: "Leisure Valley is a long green belt in the heart of Gurugram with jogging tracks, musical fountains and seasonal flower displays. Kingdom of Dreams, a live-entertainment venue, is close by.",
        bestTime: "Early morning or evening",
        entry: "Free entry to the park",
        access: "Best reached by cab or auto-rickshaw",
        idealFor: "Families, joggers, picnics",
        map: "https://maps.google.com/?q=Leisure+Valley+Park+Gurugram"
    },
    {
        id: "sundar-nursery",
        name: "Sundar Nursery Heritage Park",
        region: "central-delhi",
        regionLabel: "Central Delhi",
        lat: 28.5961,
        lon: 77.2450,
        rating: 4.9,
        img: "https://images.indianexpress.com/2018/02/asa-20180220-sunder-nursery-011.jpg",
        desc: "Restored 16th-century Mughal garden park with over 300 tree species and serene marble water bodies.",
        about: "A restored Mughal-era garden complex beside Humayun's Tomb, with heritage monuments, landscaped lawns and hundreds of tree species. One of the calmest corners of central Delhi.",
        bestTime: "Morning or late afternoon",
        entry: "Small entry fee",
        access: "Violet Line to JLN Stadium station, then a short ride",
        idealFor: "Nature lovers, photographers, families",
        map: "https://maps.google.com/?q=Sundar+Nursery+Delhi"
    },
    {
        id: "32nd-avenue",
        name: "32nd Avenue (Milestone)",
        region: "gurugram",
        regionLabel: "Gurugram",
        lat: 28.4586,
        lon: 77.0432,
        rating: 4.8,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1HdwyVSSzCw2ClWtV7i1kcSKkUrnVdr1lQgesoRnaLwTxJzwLywqEoeY&s=10",
        desc: "Charming cobblestone alleyways filled with artisanal bakeries, specialty coffee shops, and gourmet dining.",
        about: "32nd Avenue, on Milestone Road, is a compact open-air market of cafes, bakeries and boutique restaurants. It is best enjoyed slowly, with a coffee and no fixed plans.",
        bestTime: "Weekend mornings and evenings",
        entry: "Free to walk around",
        access: "Best reached by cab or auto-rickshaw",
        idealFor: "Foodies, brunch crowd",
        map: "https://maps.google.com/?q=32nd+Avenue+Milestone+Gurugram"
    }
];

// Point to Express backend on port 4000 even if opened via Live Server or file://
const API_BASE =
    window.location.protocol === "file:" || ["5500", "5501", "5173"].includes(window.location.port)
        ? "http://localhost:4000/api/v1"
        : "/api/v1";

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------
const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));

const weatherCodeLabel = (code) => {
    if (code === 0) return "Clear Sky";
    if ([1, 2, 3].includes(code)) return "Partly Cloudy";
    if ([45, 48].includes(code)) return "Hazy / Foggy";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "Rain Showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Pleasant";
};

// In-memory cache synced with backend data/favorites.json
let favoriteIds = [];

const fetchFavoritesFromServer = async () => {
    try {
        const res = await fetch(`${API_BASE}/json/favorites`);
        if (res.ok) {
            favoriteIds = await res.json();
        }
    } catch (err) {
        console.warn("Could not load favorites from server:", err.message);
    }
    return favoriteIds;
};

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

document.addEventListener("DOMContentLoaded", async () => {

    // ----------------------------------------------------
    // 1. GLOBAL NAVIGATION: ACTIVE LINK + MOBILE TOGGLE
    // ----------------------------------------------------
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a").forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });

    const header = document.querySelector("header");
    const nav = header ? header.querySelector("nav") : null;

    if (header && nav) {
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "nav-toggle";
        toggle.setAttribute("aria-label", "Toggle navigation menu");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
        header.insertBefore(toggle, nav);

        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.textContent = isOpen ? "✕" : "☰";
        });
    }

    // ----------------------------------------------------
    // 2. FAVORITES (Persisted on server in data/favorites.json)
    // ----------------------------------------------------
    const syncFavoriteButtons = () => {
        document.querySelectorAll(".fav-btn, .fav-toggle").forEach((btn) => {
            const isSaved = favoriteIds.includes(btn.dataset.id);
            btn.classList.toggle("active", isSaved);
            btn.setAttribute("aria-pressed", String(isSaved));

            if (btn.classList.contains("fav-toggle")) {
                btn.textContent = isSaved ? "♥ Saved to favorites" : "♡ Save to favorites";
            } else {
                btn.textContent = isSaved ? "♥" : "♡";
            }
        });

        const savedLink = document.querySelector('nav a[href="saved.html"]');
        if (savedLink) {
            let badge = savedLink.querySelector(".nav-count");
            if (favoriteIds.length > 0) {
                if (!badge) {
                    badge = document.createElement("span");
                    badge.className = "nav-count";
                    savedLink.appendChild(badge);
                }
                badge.textContent = favoriteIds.length;
            } else if (badge) {
                badge.remove();
            }
        }
    };

    document.addEventListener("click", async (e) => {
        const btn = e.target.closest(".fav-btn, .fav-toggle");
        if (!btn) return;
        e.preventDefault();

        const id = btn.dataset.id;
        try {
            const res = await fetch(`${API_BASE}/json/favorites/toggle`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                const data = await res.json();
                favoriteIds = data.favorites;
                document.dispatchEvent(new CustomEvent("favoritesChanged"));
                syncFavoriteButtons();
            }
        } catch (err) {
            alert("Server not reachable. Make sure 'npm start' is running on port 4000.");
        }
    });

    await fetchFavoritesFromServer();

    // ----------------------------------------------------
    // 3. EXPLORE PAGE: SEARCH + REGION FILTER + SORT
    // ----------------------------------------------------
    const exploreGrid = document.getElementById("exploreGrid");
    const searchInput = document.getElementById("searchInput");

    if (exploreGrid && searchInput) {
        const cards = Array.from(exploreGrid.querySelectorAll(".card[data-region]"));
        const filterButtons = document.querySelectorAll(".filter-btn");
        const sortSelect = document.getElementById("sortSelect");
        const resultsCount = document.getElementById("resultsCount");
        const noResults = document.getElementById("noResults");
        const resetBtn = document.getElementById("resetFilters");
        let activeCategory = "all";

        cards.forEach((card, index) => { card.dataset.order = index; });
        const cardTitle = (card) => card.querySelector("h4").textContent;

        const applyFilters = () => {
            const query = searchInput.value.toLowerCase().trim();
            let visible = 0;

            cards.forEach((card) => {
                const title = cardTitle(card).toLowerCase();
                const desc = card.querySelector("p").textContent.toLowerCase();
                const regionName = card.querySelector(".badge").textContent.toLowerCase();
                const region = card.dataset.region;

                const matchesSearch = `${title} ${desc} ${regionName}`.includes(query);
                const matchesCategory = activeCategory === "all" || region === activeCategory;
                const show = matchesSearch && matchesCategory;

                card.hidden = !show;
                if (show) visible++;
            });

            resultsCount.textContent = `Showing ${visible} of ${cards.length} destinations`;
            noResults.hidden = visible > 0;
        };

        const sorters = {
            "default": (a, b) => Number(a.dataset.order) - Number(b.dataset.order),
            "rating-desc": (a, b) => Number(b.dataset.rating) - Number(a.dataset.rating),
            "rating-asc": (a, b) => Number(a.dataset.rating) - Number(b.dataset.rating),
            "name-asc": (a, b) => cardTitle(a).localeCompare(cardTitle(b))
        };

        const applySort = () => {
            const sorted = [...cards].sort(sorters[sortSelect.value] || sorters.default);
            sorted.forEach((card) => exploreGrid.appendChild(card));
        };

        const setCategory = (category) => {
            activeCategory = category;
            filterButtons.forEach((btn) => {
                btn.classList.toggle("active", btn.dataset.filter === category);
            });
            applyFilters();
        };

        searchInput.addEventListener("input", applyFilters);
        sortSelect.addEventListener("change", applySort);
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => setCategory(btn.dataset.filter));
        });

        resetBtn.addEventListener("click", () => {
            searchInput.value = "";
            sortSelect.value = "default";
            applySort();
            setCategory("all");
        });

        const presetRegion = new URLSearchParams(window.location.search).get("region");
        const validRegion = presetRegion && Array.from(filterButtons).some((b) => b.dataset.filter === presetRegion);
        setCategory(validRegion ? presetRegion : "all");
    }

    // ----------------------------------------------------
    // 4. DESTINATION DETAIL PAGE + LIVE EXTERNAL WEATHER API (Open-Meteo)
    // ----------------------------------------------------
    const detail = document.getElementById("destinationDetail");

    if (detail) {
        const id = new URLSearchParams(window.location.search).get("id");
        const d = DESTINATIONS.find((item) => item.id === id);

        if (!d) {
            document.title = "Destination not found - Roam Local";
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
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span id="liveWeatherBadge" class="weather-pill">🌤️ Loading live weather...</span>
                                <span style="font-size: 0.9rem; color: var(--accent-color); font-weight: 600;">★ ${d.rating.toFixed(1)}</span>
                            </div>
                        </div>
                        <h1>${escapeHTML(d.name)}</h1>
                        <p>${escapeHTML(d.about)}</p>
                        <ul class="info-list">
                            <li><span>Live Weather</span><span id="liveWeatherRow">Fetching from Open-Meteo API...</span></li>
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

            // External API call: Open-Meteo real-time weather for destination coordinates
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}&current_weather=true`)
                .then((res) => res.json())
                .then((weatherData) => {
                    const cw = weatherData.current_weather;
                    const badge = document.getElementById("liveWeatherBadge");
                    const row = document.getElementById("liveWeatherRow");
                    if (cw && badge && row) {
                        const label = weatherCodeLabel(cw.weathercode);
                        badge.textContent = `🌡️ ${cw.temperature}°C • ${label}`;
                        row.textContent = `${cw.temperature}°C, ${label} (Wind: ${cw.windspeed} km/h)`;
                    }
                })
                .catch(() => {
                    const badge = document.getElementById("liveWeatherBadge");
                    const row = document.getElementById("liveWeatherRow");
                    if (badge) badge.textContent = "🌤️ Weather unavailable";
                    if (row) row.textContent = "Could not reach weather service";
                });

            const relatedSection = document.getElementById("relatedSection");
            const relatedGrid = document.getElementById("relatedGrid");
            const relatedTitle = document.getElementById("relatedTitle");

            let related = DESTINATIONS.filter((item) => item.region === d.region && item.id !== d.id);
            relatedTitle.textContent = `More in ${d.regionLabel}`;

            if (related.length === 0) {
                related = DESTINATIONS.filter((item) => item.id !== d.id)
                    .sort((a, b) => b.rating - a.rating);
                relatedTitle.textContent = "You might also like";
            }

            relatedGrid.innerHTML = related.slice(0, 3).map(buildCardHTML).join("");
            relatedSection.hidden = false;
        }
    }

    // ----------------------------------------------------
    // 5. SAVED PLACES PAGE (Reads/Clears data/favorites.json via Express)
    // ----------------------------------------------------
    const savedGrid = document.getElementById("savedGrid");

    if (savedGrid) {
        const savedEmpty = document.getElementById("savedEmpty");
        const savedSummary = document.getElementById("savedSummary");
        const clearBtn = document.getElementById("clearSavedBtn");

        const getSavedItems = () =>
            favoriteIds.map((id) => DESTINATIONS.find((d) => d.id === id)).filter(Boolean);

        const renderSaved = () => {
            const items = getSavedItems();
            savedGrid.innerHTML = items.map(buildCardHTML).join("");
            savedEmpty.hidden = items.length > 0;
            clearBtn.hidden = items.length === 0;
            savedSummary.textContent = items.length === 0
                ? "You haven't saved any places yet."
                : `You have ${items.length} saved ${items.length === 1 ? "place" : "places"}, stored on the server.`;
            syncFavoriteButtons();
        };

        document.addEventListener("favoritesChanged", renderSaved);

        clearBtn.addEventListener("click", async () => {
            if (!confirm("Remove all saved places from the server?")) return;
            try {
                const res = await fetch(`${API_BASE}/json/favorites`, { method: "DELETE" });
                if (res.ok) {
                    favoriteIds = [];
                    renderSaved();
                }
            } catch (err) {
                alert("Could not clear saved places on server.");
            }
        });

        renderSaved();
    }

    // ----------------------------------------------------
    // 6. COMMUNITY PAGE: FULL CRUD WITH MONGODB (/api/v1/tips)
    // ----------------------------------------------------
    const communityGrid = document.getElementById("communityGrid");

    if (communityGrid) {
        const BASE_TIP_COUNT = 1418;
        let tips = [];
        const votedTipIds = new Set();

        const tipForm = document.getElementById("tipForm");
        const totalTipsMetric = document.getElementById("totalTipsMetric");
        const tipStatus = document.getElementById("tipStatus");
        const tipText = document.getElementById("tipText");
        const tipCounter = document.getElementById("tipTextCounter");

        const updateMetric = () => {
            totalTipsMetric.textContent = `${(BASE_TIP_COUNT + tips.length).toLocaleString()}+`;
        };

        const createTipCard = (tip) => {
            const card = document.createElement("div");
            card.className = "community-card";
            card.dataset.tipId = tip._id;

            const posted = tip.createdAt
                ? new Date(tip.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                : "Recently";
            const isVoted = votedTipIds.has(tip._id);

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between;">
                    <span class="badge">💡 ${escapeHTML(tip.category || "LOCAL TIP")}</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Posted ${posted}</span>
                </div>
                <h3>${escapeHTML(tip.title)}</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted);">${escapeHTML(tip.text)}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; border-top: 1px solid var(--border-color); padding-top: 12px;">
                    <span style="font-size: 0.85rem; font-weight: 600;">${escapeHTML(tip.author)}</span>
                    <div class="tip-actions">
                        <button type="button" class="edit-tip">Edit</button>
                        <button type="button" class="delete-tip">Remove</button>
                        <button type="button" class="upvote-btn ${isVoted ? "voted" : ""}" data-count="${tip.upvotes || 0}">
                            <span class="upvote-count">👍 ${tip.upvotes || 0}</span>
                        </button>
                    </div>
                </div>`;
            return card;
        };

        const renderTips = () => {
            if (tips.length === 0) {
                communityGrid.innerHTML = `<p style="color: var(--text-muted);">No community tips yet. Be the first to post one below!</p>`;
            } else {
                communityGrid.innerHTML = "";
                communityGrid.append(...tips.map(createTipCard));
            }
            updateMetric();
        };

        // READ (GET /api/v1/tips)
        const loadTips = async () => {
            try {
                const res = await fetch(`${API_BASE}/tips`);
                if (!res.ok) throw new Error("Failed to load tips");
                tips = await res.json();
                renderTips();
            } catch (err) {
                communityGrid.innerHTML = `<p style="color: #e63946;">Could not connect to server. Run <strong>npm start</strong> and refresh.</p>`;
            }
        };

        await loadTips();

        // UPDATE (PUT /api/v1/tips/:id) & DELETE (DELETE /api/v1/tips/:id)
        communityGrid.addEventListener("click", async (e) => {
            const card = e.target.closest(".community-card");
            if (!card) return;
            const tipId = card.dataset.tipId;
            const currentTip = tips.find((t) => String(t._id) === String(tipId));
            if (!currentTip) return;

            // DELETE
            if (e.target.closest(".delete-tip")) {
                if (!confirm("Delete this tip from MongoDB?")) return;
                try {
                    const res = await fetch(`${API_BASE}/tips/${tipId}`, { method: "DELETE" });
                    if (res.ok) {
                        tips = tips.filter((t) => String(t._id) !== String(tipId));
                        renderTips();
                    }
                } catch (err) {
                    alert("Failed to delete tip from server.");
                }
                return;
            }

            // EDIT (PUT)
            if (e.target.closest(".edit-tip")) {
                const newTitle = prompt("Edit tip title:", currentTip.title);
                if (newTitle === null) return;
                const newText = prompt("Edit insider advice (min 10 characters):", currentTip.text);
                if (newText === null) return;

                if (newTitle.trim().length < 3 || newText.trim().length < 10) {
                    alert("Title must be at least 3 characters and advice at least 10 characters.");
                    return;
                }

                try {
                    const res = await fetch(`${API_BASE}/tips/${tipId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            title: newTitle.trim(),
                            text: newText.trim(),
                        }),
                    });
                    if (res.ok) {
                        const data = await res.json();
                        const idx = tips.findIndex((t) => String(t._id) === String(tipId));
                        if (idx !== -1) tips[idx] = data.tip;
                        renderTips();
                    }
                } catch (err) {
                    alert("Failed to update tip in database.");
                }
                return;
            }

            // UPVOTE (PUT)
            const upvoteBtn = e.target.closest(".upvote-btn");
            if (!upvoteBtn) return;

            const alreadyVoted = votedTipIds.has(tipId);
            const updatedVotes = Math.max(0, (currentTip.upvotes || 0) + (alreadyVoted ? -1 : 1));

            try {
                const res = await fetch(`${API_BASE}/tips/${tipId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ upvotes: updatedVotes }),
                });
                if (res.ok) {
                    const data = await res.json();
                    if (alreadyVoted) votedTipIds.delete(tipId);
                    else votedTipIds.add(tipId);

                    const idx = tips.findIndex((t) => String(t._id) === String(tipId));
                    if (idx !== -1) tips[idx] = data.tip;
                    renderTips();
                }
            } catch (err) {
                alert("Failed to update upvote on server.");
            }
        });

        // CREATE (POST /api/v1/tips)
        if (tipForm) {
            const authorInput = document.getElementById("tipAuthor");
            const categoryInput = document.getElementById("tipCategory");
            const titleInput = document.getElementById("tipTitle");

            const rules = [
                { input: authorInput, group: "tipAuthorGroup", test: (v) => v.trim().length >= 2 },
                { input: titleInput, group: "tipTitleGroup", test: (v) => v.trim().length >= 3 },
                { input: tipText, group: "tipTextGroup", test: (v) => v.trim().length >= 10 }
            ];

            const validateField = (rule) => {
                const ok = rule.test(rule.input.value);
                document.getElementById(rule.group).classList.toggle("error", !ok);
                return ok;
            };

            rules.forEach((rule) => {
                rule.input.addEventListener("blur", () => validateField(rule));
                rule.input.addEventListener("input", () => {
                    tipStatus.style.display = "none";
                    if (document.getElementById(rule.group).classList.contains("error")) validateField(rule);
                });
            });

            const updateCounter = () => {
                const max = tipText.maxLength;
                tipCounter.textContent = `${tipText.value.length} / ${max}`;
                tipCounter.classList.toggle("limit", tipText.value.length >= max);
            };
            tipText.addEventListener("input", updateCounter);
            updateCounter();

            tipForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const valid = rules.map(validateField).every(Boolean);
                if (!valid) {
                    tipStatus.className = "form-status error-summary";
                    tipStatus.textContent = "Please fix the highlighted fields before posting.";
                    tipStatus.style.display = "block";
                    return;
                }

                try {
                    const res = await fetch(`${API_BASE}/tips`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            author: authorInput.value.trim(),
                            category: categoryInput.value.trim().toUpperCase() || "LOCAL TIP",
                            title: titleInput.value.trim(),
                            text: tipText.value.trim(),
                        }),
                    });

                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.message || "Failed to post tip");
                    }

                    tips.unshift(data.tip);
                    renderTips();

                    tipForm.reset();
                    updateCounter();

                    tipStatus.className = "form-status success";
                    tipStatus.textContent = "Thanks! Your tip is live and saved to MongoDB.";
                    tipStatus.style.display = "block";
                } catch (err) {
                    tipStatus.className = "form-status error-summary";
                    tipStatus.textContent = err.message || "Could not save tip to server.";
                    tipStatus.style.display = "block";
                }
            });
        }
    }

    // ----------------------------------------------------
    // 7. CONTACT PAGE: VALIDATION & LOCAL JSON FILE API (/api/v1/json/messages)
    // ----------------------------------------------------
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const messageCounter = document.getElementById("messageCounter");
        const formStatus = document.getElementById("formStatus");
        const savedCount = document.getElementById("savedCount");

        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

        const fields = [
            { input: nameInput, group: "nameGroup", test: (v) => v.trim().length >= 2 },
            { input: emailInput, group: "emailGroup", test: (v) => validateEmail(v.trim()) },
            { input: messageInput, group: "messageGroup", test: (v) => v.trim().length >= 10 }
        ];

        const validateField = (field) => {
            const ok = field.test(field.input.value);
            document.getElementById(field.group).classList.toggle("error", !ok);
            return ok;
        };

        const refreshSavedCount = async () => {
            try {
                const res = await fetch(`${API_BASE}/json/messages`);
                if (res.ok) {
                    const messages = await res.json();
                    const total = messages.length;
                    savedCount.textContent = total === 0
                        ? "No messages saved in data/messages.json yet."
                        : `${total} ${total === 1 ? "message" : "messages"} saved on the server in data/messages.json.`;
                }
            } catch {
                savedCount.textContent = "Start the Node.js server (npm start) to view saved messages.";
            }
        };

        const updateCounter = () => {
            const max = messageInput.maxLength;
            messageCounter.textContent = `${messageInput.value.length} / ${max}`;
            messageCounter.classList.toggle("limit", messageInput.value.length >= max);
        };

        fields.forEach((field) => {
            field.input.addEventListener("blur", () => validateField(field));
            field.input.addEventListener("input", () => {
                formStatus.style.display = "none";
                if (document.getElementById(field.group).classList.contains("error")) validateField(field);
            });
        });

        messageInput.addEventListener("input", updateCounter);

        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const valid = fields.map(validateField).every(Boolean);
            if (!valid) {
                formStatus.className = "form-status error-summary";
                formStatus.textContent = "Please fix the errors above before submitting.";
                formStatus.style.display = "block";
                return;
            }

            try {
                const res = await fetch(`${API_BASE}/json/messages`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: nameInput.value.trim(),
                        email: emailInput.value.trim(),
                        message: messageInput.value.trim(),
                    }),
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || "Failed to save message");
                }

                formStatus.className = "form-status success";
                formStatus.textContent = "Thank you! Your message has been saved to data/messages.json on the server.";
                formStatus.style.display = "block";

                contactForm.reset();
                updateCounter();
                await refreshSavedCount();
            } catch (err) {
                formStatus.className = "form-status error-summary";
                formStatus.textContent = err.message || "Could not reach server. Make sure 'npm start' is running.";
                formStatus.style.display = "block";
            }
        });

        updateCounter();
        await refreshSavedCount();
    }

    syncFavoriteButtons();
});
