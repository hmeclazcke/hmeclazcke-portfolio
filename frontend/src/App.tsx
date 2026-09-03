import HomeHero from "./components/home/HomeHero";
import SiteShell from "./components/shell/SiteShell";
import StorySection from "./components/story/StorySection";

function App() {
  return (
    <SiteShell contentWidth="wide">
      <HomeHero />
      <StorySection />
    </SiteShell>
  );
}

export default App;
