# 🗺️ Shortest Path Simulation

[Live Demo 🚀](https://shripad735.github.io/shortest-path-simulation/)

Welcome to the **Shortest Path Simulation** web app! This interactive React-based application allows you to explore and visualize the traversal of three popular pathfinding algorithms: **Breadth-First Search (BFS)**, **Depth-First Search (DFS)**, and **Dijkstra's Algorithm** on a fictional grid map.

### 🎯 Key Features
- 🗺️ **Interactive Map**: Users can select start and end locations on a grid representing a fictional city.
- ⚙️ **Algorithm Selection**: Choose between BFS, DFS, or Dijkstra's Algorithm.
- 👀 **Step-by-Step Visualization**: Watch the algorithms explore the grid in real-time, highlighting the nodes and paths.
- 📊 **Algorithm Comparison**: Compare the efficiency of each algorithm in terms of steps taken and time complexity.
- ✨ **Modern UI**: Built with React and styled using **Tailwind CSS** for a clean and responsive user experience.

---

## 📽️ Live Demo

You can explore the live version of this project at: [Live Demo](https://shripad735.github.io/shortest-path-simulation/)

---

## 🚀 Installation & Setup

To run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shripad735/shortest-path-simulation.git
   cd shortest-path-simulation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` to see the app in action.

---

## ⚙️ Technologies Used

- **React**: For building the UI components and managing state.
- **Tailwind CSS**: For modern and responsive styling.
- **JavaScript**: Core language for algorithm implementation and functionality.
- **HTML5 & CSS3**: Basic structure and style.
- **React Hooks**: For managing state and side effects (e.g., `useState`, `useEffect`).

---

## 🔍 Pathfinding Algorithms

This project implements three core algorithms that simulate pathfinding between two points on a grid. Here's a brief overview:

1. **Breadth-First Search (BFS)**:
   - A **queue-based** approach to explore all nodes at the current depth before moving deeper.
   - **Time Complexity**: O(V + E) (where V = vertices, E = edges).
   - Ensures finding the **shortest path** in an unweighted grid.

2. **Depth-First Search (DFS)**:
   - A **stack-based** approach that explores as far as possible down a branch before backtracking.
   - **Time Complexity**: O(V + E).
   - Does not guarantee the shortest path, but explores more deeply first.

3. **Dijkstra’s Algorithm**:
   - A **priority queue-based** approach for finding the shortest path in weighted graphs.
   - **Time Complexity**: O(E + V log V).
   - Finds the shortest path even on weighted grids by evaluating the cost of each move.

### Data Structures Involved:
- **Queue (BFS)**: To keep track of the current level of nodes to explore.
- **Stack (DFS)**: For storing and backtracking through nodes.
- **Priority Queue (Dijkstra)**: To ensure the lowest-cost node is always processed next.
- **Set**: To store visited nodes and avoid revisiting them.
- **Array**: For representing the grid, and maintaining the current path during exploration.
- **Dictionary (Object)**: For storing node distances and previous nodes in Dijkstra's algorithm.

---

## 🧠 How It Works

### BFS Example (from code):
```js
const bfs = async (start, end, setPath, setVisited) => {
  const queue = [[start]];
  const visitedSet = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node.x === end.x && node.y === end.y) {
      setPath(path);  // Shortest path found!
      return;
    }

    if (!visitedSet.has(`${node.x},${node.y}`)) {
      visitedSet.add(`${node.x},${node.y}`);
      setVisited(prevVisited => [...prevVisited, node]);
      await delay(50);  // Slow down visualization for user engagement

      for (const neighbor of getNeighbors(node)) {
        if (!visitedSet.has(`${neighbor.x},${neighbor.y}`)) {
          queue.push([...path, neighbor]);
        }
      }
    }
  }

  setPath([]);  // No path found
};
```

### Dijkstra's Example:
```js
const dijkstra = async (start, end, setPath, setVisited) => {
  const distances = {};
  const previous = {};
  const pq = new PriorityQueue();
  const visitedSet = new Set();

  // Initialize distances to Infinity and set start node distance to 0
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
      const path = [];  // Trace the shortest path
      let current = end;
      while (current) {
        path.unshift(current);
        current = previous[`${current.x},${current.y}`];
      }
      setPath(path);  // Shortest path found!
      return;
    }

    if (visitedSet.has(`${x},${y}`)) continue;
    visitedSet.add(`${x},${y}`);
    setVisited(prevVisited => [...prevVisited, { x, y }]);
    await delay(50);

    for (const neighbor of getNeighbors({ x, y })) {
      const alt = distances[`${x},${y}`] + 1;
      if (alt < distances[`${neighbor.x},${neighbor.y}`]) {
        distances[`${neighbor.x},${neighbor.y}`] = alt;
        previous[`${neighbor.x},${neighbor.y}`] = { x, y };
        pq.enqueue(neighbor, alt);
      }
    }
  }

  setPath([]);  // No path found
};
```

---

## 🧑‍💻 Contribution

We welcome contributions! Feel free to fork the repo, create feature branches, and submit pull requests. 

---

## 📜 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute as needed!

---

Thanks for checking out the project! 🎉 Let me know if you have any feedback or suggestions!
