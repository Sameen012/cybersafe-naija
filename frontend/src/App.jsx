import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ScamLibrary from './pages/ScamLibrary.jsx';
import Simulator from './pages/Simulator.jsx';
import ReportScam from './pages/ReportScam.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import RecoveryGuide from './pages/RecoveryGuide.jsx';
import ScamDictionary from './pages/ScamDictionary.jsx';
import ProtectionChecklist from './pages/ProtectionChecklist.jsx';

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-brand-light text-slate-900">
      <Navbar />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<ScamLibrary />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/report" element={<ReportScam />} />
          <Route path="/recovery" element={<RecoveryGuide />} />
          <Route path="/dictionary" element={<ScamDictionary />} />
          <Route path="/checklist" element={<ProtectionChecklist />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
