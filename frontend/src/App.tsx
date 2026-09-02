import { contexts, relationships, technologies } from "./data/portfolio-data";

function App() {
  return (
    <main
      aria-label="Application"
      data-canonical-collection-count={
        technologies.length + contexts.length + relationships.length
      }
    >
      <h1>Hello, world!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </main>
  );
}

export default App;
