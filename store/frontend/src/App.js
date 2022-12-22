

import './App.css';
import data from './data';
import {Link, Route, Router, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
function App() {
  return (
    <div>
      <header>
     <Link to ="/">amazona</Link>
     </header>
     <main>
      <Routes>
        <Route path='/product/:slug' element={<ProductScreen />}></Route>
        <Route path ="/" element={<HomeScreen />}></Route>
      </Routes>
      
     </main>
    
    </div>
  );
}

export default App;
