from collections import defaultdict


def parse_edges(edges):
    graph = defaultdict(list)
    nodes = set()
    for edge in edges:
        if "," in edge:
            src, dst = [part.strip() for part in edge.split(",", 1)]
        elif "->" in edge:
            src, dst = [part.strip() for part in edge.split("->", 1)]
        else:
            continue
        if not src or not dst:
            continue
        graph[src].append(dst)
        nodes.update([src, dst])
    return graph, sorted(nodes)


def pagerank(edges, iterations=20, damping=0.85):
    graph, nodes = parse_edges(edges)
    if not nodes:
        return []
    n = len(nodes)
    ranks = {node: 1.0 / n for node in nodes}
    outbound = {node: len(graph.get(node, [])) for node in nodes}

    for _ in range(iterations):
        new_ranks = {node: (1 - damping) / n for node in nodes}
        for node in nodes:
            neighbors = graph.get(node, [])
            if not neighbors:
                for target in nodes:
                    new_ranks[target] += damping * (ranks[node] / n)
            else:
                share = ranks[node] / outbound[node]
                for target in neighbors:
                    new_ranks[target] += damping * share
        ranks = new_ranks

    return sorted(
        [{"node": node, "score": round(score, 4)} for node, score in ranks.items()],
        key=lambda item: item["score"],
        reverse=True,
    )
