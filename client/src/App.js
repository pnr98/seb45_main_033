import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppContainer } from './style/App.styled';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import MyPage from './pages/MyPage/MyPage';
import RecipeDetailPage from './pages/RecipeDetailPage/RecipeDetailPage';
import RecipeSearchPage from './pages/RecipeSearchPage/RecipeSearchPage';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/recipe/:recipe_id" element={<RecipeDetailPage />} />
        <Route path="/search" element={<RecipeSearchPage />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
      </Routes>
      <Footer />
    </AppContainer>
  );
}

export default App;
