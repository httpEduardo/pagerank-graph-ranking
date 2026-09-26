# Pagerank Graph Ranking

![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)

Pagerank Graph Ranking ranks nodes with PageRank and highlights influence in a directed graph.

## Quick start

```bash
python -m pagerank_graph_ranking.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/pagerank` `{ "edges": ["A,B", "B,C"], "iterations": 20, "damping": 0.85 }`

