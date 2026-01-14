const results = document.getElementById("results") as HTMLUListElement;
const rankButton = document.getElementById("rankButton") as HTMLButtonElement;

function renderRanks(ranks: Array<{ node: string; score: number }>): void {
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
  const edges = (document.getElementById("edgesInput") as HTMLTextAreaElement).value;
  const iterations = parseInt((document.getElementById("iterInput") as HTMLInputElement).value, 10);
  const damping = parseFloat((document.getElementById("dampingInput") as HTMLInputElement).value);
  fetch("/api/pagerank", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ edges, iterations, damping }),
  })
    .then((res) => res.json())
    .then((data) => renderRanks(data.ranks || []));
});
