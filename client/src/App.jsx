
import './App.css'
import{ BrowserRouter, Route, Routes } from 'react-router-dom'
import MyRouter from './MyRouter';
import BlogComponent from './components/BlogComponent';



function App() {

  return (
    <BrowserRouter>
      
      <Routes>
          <Route end path='/' element={<MyRouter/>}/>
          <Route path='/create' element={<BlogComponent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
