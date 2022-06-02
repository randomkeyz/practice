import { Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout';
import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Dashboard from './routes/Dashboard';
import WatchList from './routes/WatchList';
import Assets from './routes/Assets';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route 
          path='dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
        </Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route 
          path='watchlist' 
          element={
            <ProtectedRoute>
              <WatchList />
            </ProtectedRoute>
          }>
        </Route>
        <Route 
          path='assets' 
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }>  
          </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;