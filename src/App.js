// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import HomePage from './pages/HomePage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar.tsx';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage.tsx';
import CreateAccountPage from './pages/CreateAccountPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />
        <div className="container-md mt-5" id='page-body'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/create-account' element={<CreateAccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
