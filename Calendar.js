// =======================
// DATA (replace with real games)
// =======================
const games = [
  {
    id: 1,
    teamA: "Sand Kings",
    teamB: "Beach Bums",
    date: "2026-05-01T18:00:00",
    location: "Court 1"
  },
  {
    id: 2,
    teamA: "Spike Squad",
    teamB: "Sand Kings",
    date: "2026-05-02T19:00:00",
    location: "Court 2"
  }
];

// =======================
// ELEMENTS
// =======================
const container = document.getElementById("gamesContainer");
const filter = document.getElementById("teamFilter");
const searchInput = document.getElementById("searchInput");
const sortOrder = document.getElementById("sortOrder");

// =======================
// RENDER
// =======================
function renderGames(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No games found</p>";
    return;
  }

  list.forEach(game => {
    const div = document.createElement("div");
    div.classList.add("game");

    const dateObj = new Date(game.date);

    div.innerHTML = `
      <h3>${game.teamA} vs ${game.teamB}</h3>
      <p>${dateObj.toLocaleDateString()} - ${dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
      <p>${game.location}</p>
    `;

    container.appendChild(div);
  });
}

// =======================
// LOAD TEAMS INTO DROPDOWN
// =======================
function loadTeams() {
  const teams = new Set();

  games.forEach(g => {
    teams.add(g.teamA);
    teams.add(g.teamB);
  });

  teams.forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    filter.appendChild(option);
  });
}

// =======================
// FILTER + SORT (CORE LOGIC)
// =======================
function updateView() {
  let filtered = [...games];

  const selectedTeam = filter.value;
  const searchText = searchInput.value.toLowerCase();
  const sort = sortOrder.value;

  // Filter dropdown
  if (selectedTeam !== "all") {
    filtered = filtered.filter(g =>
      g.teamA === selectedTeam || g.teamB === selectedTeam
    );
  }

  // Search filter
  if (searchText !== "") {
    filtered = filtered.filter(g =>
      g.teamA.toLowerCase().includes(searchText) ||
      g.teamB.toLowerCase().includes(searchText)
    );
  }

  // Sort
  filtered.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sort === "asc" ? dateA - dateB : dateB - dateA;
  });

  renderGames(filtered);
}

// =======================
// EVENTS
// =======================
filter.addEventListener("change", updateView);
searchInput.addEventListener("input", updateView);
sortOrder.addEventListener("change", updateView);

// =======================
// INIT
// =======================
loadTeams();
updateView();