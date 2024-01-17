import './css/App.css';
import { LoginForm } from './components/login/LoginForm';
import { MainPage } from './components/MainPage';
import logo from './images/logo.webp';

function App() {
  return (
    <div className="App">
        <div className="header">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="sidebar">
            <LoginForm />
        </div>
        <MainPage />
        <div className="footer">
            &copy; Copyright 2023 Prokeep, Inc. All rights reserved. &nbsp;
            <a href="https://prokeep.com/legal?hsLang=en">Legal</a>
            &nbsp; | &nbsp;
            <a href="https://prokeep.com/privacy-policy?hsLang=en">Privacy Policy</a>
        </div>
    </div>
  );
}

export default App;
