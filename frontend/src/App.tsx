import HomeHero from "./components/home/HomeHero";
import SiteShell from "./components/shell/SiteShell";
import SectionNavigation from "./components/shell/SectionNavigation";
import StorySection from "./components/story/StorySection";
import TechnologyGraph from "./components/technology-graph/TechnologyGraph";

function App() {
  return (
    <SiteShell contentWidth="wide" floatingNavigation={<SectionNavigation />}>
      <HomeHero />
      <StorySection />
      <TechnologyGraph />
    </SiteShell>
  );
}

export default App;
