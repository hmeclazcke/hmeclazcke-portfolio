import { contexts, relationships, technologies } from "./data/portfolio-data";
import SiteShell from "./components/shell/SiteShell";

function App() {
  return (
    <SiteShell>
      <div
        data-canonical-collection-count={
          technologies.length + contexts.length + relationships.length
        }
      >
        <h1>Hello, world!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </SiteShell>
  );
}

export default App;
