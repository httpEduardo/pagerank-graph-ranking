# GraphPulse

GraphPulse ranks nodes with PageRank and highlights influence in a directed graph.

## Quick start

```bash
python -m app.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/pagerank` `{ "edges": ["A,B", "B,C"], "iterations": 20, "damping": 0.85 }`

