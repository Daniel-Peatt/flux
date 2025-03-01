// Import for multipage functionality
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importing Pages
import CreateAccountPage from './pages/CreateAccount.js'
import  Home  from './pages/Home';
import NoPage from './pages/NoPage.js';
import Dashboard from './pages/Dashboard.js';
import CreateTitle from './pages/CreateChallenge.js';

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* index means the default path when the webpage is loaded */}
          <Route index element={<Home />} /> 
          <Route path="/createAccount" element={<CreateAccountPage />} />
          <Route path="/CreateChallenge/:email" element={<CreateTitle />} /> 
          {/* Path = * ... means if page is not found go to this ... 404 Page */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
