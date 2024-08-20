
import { Routes,Route } from 'react-router-dom';
import './App.css';

import Home from './component/Home';
import Loby from './component/Loby';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/lobby" element={<Loby />}></Route>
      
     
      
      </Routes>

     
      
    </div>
  );
}

export default App;
