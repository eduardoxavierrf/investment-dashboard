import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Order from './pages/Order';
import SignIn from './pages/SignIn';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto">
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/order' element={<Order />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
};

export default App;
