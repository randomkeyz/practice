import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='dashboard' element={<Dashboard />}></Route>
          <Route path='signup' element={<SignUp />}></Route>
        </Route>
      </Routes>

      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
