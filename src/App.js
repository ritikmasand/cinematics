import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
