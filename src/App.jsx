import './normalize.css';
import './skeleton.css';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import { UserContext } from './context';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="container">
          <Navbar />

          <AppRouter />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
