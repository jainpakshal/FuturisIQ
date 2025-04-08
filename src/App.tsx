
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CareerDNA } from './pages/CareerDNA';
import { CareerPaths } from './pages/CareerPaths';
import { AImentor } from './pages/AImentor';
import { Roadmap } from './pages/Roadmap';
import { Wellness } from './pages/Wellness';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/career-dna" element={<CareerDNA />} />
            <Route path="/career-paths" element={<CareerPaths />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/ai-mentor" element={<AImentor />} />
            <Route path="/wellness" element={<Wellness />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
