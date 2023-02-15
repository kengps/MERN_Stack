
import './App.css'
import{ BrowserRouter, Route, Routes } from 'react-router-dom'
import MyRouter from './MyRouter';
import BlogComponent from './components/BlogComponent';
import SingleComponent from './components/SingleComponent';



function App() {

  return (
    <BrowserRouter>
      
      <Routes>
          <Route path='/'  element={<MyRouter/>}/>
          <Route path='/create'  element={<BlogComponent/>}/>
          <Route path='/blog/:slug'  element={<SingleComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
