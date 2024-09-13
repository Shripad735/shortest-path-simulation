import { useState } from 'react';

const gridSize = 10;

const getNeighbors = (node) => {
  const { x, y } = node;
  const neighbors = [];
  if (x > 0) neighbors.push({ x: x - 1, y });
  if (x < gridSize - 1) neighbors.push({ x: x + 1, y });
  if (y > 0) neighbors.push({ x, y: y - 1 });
  if (y < gridSize - 1) neighbors.push({ x, y: y + 1 });
  return neighbors;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const useBFS = () => {
  const bfs = async (start, end, setPath, setVisited) => {
    const queue = [[start]];
    const visitedSet = new Set();

    while (queue.length > 0) {
      const path = queue.shift();
      const node = path[path.length - 1];

      if (node.x === end.x && node.y === end.y) {
        setPath(path);
        return;
      }

      if (!visitedSet.has(`${node.x},${node.y}`)) {
        visitedSet.add(`${node.x},${node.y}`);
        setVisited(prevVisited => [...prevVisited, node]);
        await delay(50); // Slow down the simulation

        for (const neighbor of getNeighbors(node)) {
          if (!visitedSet.has(`${neighbor.x},${neighbor.y}`)) {
            queue.push([...path, neighbor]);
          }
        }
      }
    }

    setPath([]);
  };

  return bfs;
};

export const useDFS = () => {
  const dfs = async (start, end, setPath, setVisited) => {
    const stack = [[start]];
    const visitedSet = new Set();

    while (stack.length > 0) {
      const path = stack.pop();
      const node = path[path.length - 1];

      if (node.x === end.x && node.y === end.y) {
        setPath(path);
        return;
      }

      if (!visitedSet.has(`${node.x},${node.y}`)) {
        visitedSet.add(`${node.x},${node.y}`);
        setVisited(prevVisited => [...prevVisited, node]);
        await delay(50); // Slow down the simulation

        for (const neighbor of getNeighbors(node)) {
          if (!visitedSet.has(`${neighbor.x},${neighbor.y}`)) {
            stack.push([...path, neighbor]);
          }
        }
      }
    }

    setPath([]);
  };

  return dfs;
};

export const useDijkstra = () => {
  const dijkstra = async (start, end, setPath, setVisited) => {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    const visitedSet = new Set();

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        distances[`${x},${y}`] = Infinity;
      }
    }

    distances[`${start.x},${start.y}`] = 0;
    pq.enqueue({ x: start.x, y: start.y }, 0);

    while (!pq.isEmpty()) {
      const { x, y } = pq.dequeue().element;

      if (x === end.x && y === end.y) {
        const path = [];
        let current = end;
        while (current) {
          path.unshift(current);
          current = previous[`${current.x},${current.y}`];
        }
        setPath(path);
        return;
      }

      if (visitedSet.has(`${x},${y}`)) continue;

      visitedSet.add(`${x},${y}`);
      setVisited(prevVisited => [...prevVisited, { x, y }]);
      await delay(50); // Slow down the simulation

      for (const neighbor of getNeighbors({ x, y })) {
        const alt = distances[`${x},${y}`] + 1;
        if (alt < distances[`${neighbor.x},${neighbor.y}`]) {
          distances[`${neighbor.x},${neighbor.y}`] = alt;
          previous[`${neighbor.x},${neighbor.y}`] = { x, y };
          pq.enqueue(neighbor, alt);
        }
      }
    }

    setPath([]);
  };

  return dijkstra;
};

class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}