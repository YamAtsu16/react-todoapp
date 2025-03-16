import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Add from './pages/Add/Add';
import Detail from './pages/Detail/Detail';
import { TodoProvider } from './contexts/TodoContext';

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/detail/:todoId" element={<Detail />} />
        </Routes>
      </div>
    </TodoProvider>
  );
}

export default App;
