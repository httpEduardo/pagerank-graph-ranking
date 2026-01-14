"use strict";
const results = document.getElementById("results");
const rankButton = document.getElementById("rankButton");
function renderRanks(ranks) {
    results.innerHTML = "";
    if (!ranks.length) {
        results.innerHTML = "<li>No nodes yet.</li>";
        return;
    }
    ranks.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.node}: ${item.score}`;
        results.appendChild(li);
    });
}
rankButton.addEventListener("click", () => {
    const edges = document.getElementById("edgesInput").value;
    const iterations = parseInt(document.getElementById("iterInput").value, 10);
    const damping = parseFloat(document.getElementById("dampingInput").value);
    fetch("/api/pagerank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edges, iterations, damping }),
    })
        .then((res) => res.json())
        .then((data) => renderRanks(data.ranks || []));
});
