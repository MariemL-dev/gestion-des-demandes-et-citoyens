import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Citizens from "./pages/Citizens";
import Demandes from "./pages/Demandes";
import Status from "./pages/Status";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import SearchPage from "./pages/SearchPage";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [searchText, setSearchText] = useState("");
  const [language, setLanguage] = useState("EN");
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    const openHelp = () => setActivePage("help");

    window.addEventListener("openHelpPage", openHelp);

    return () => {
      window.removeEventListener("openHelpPage", openHelp);
    };
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard language={language} />;
      case "citizens":
        return <Citizens language={language} />;
      case "demandes":
        return <Demandes language={language} />;
      case "status":
        return <Status language={language} />;
      case "analytics":
        return <Analytics language={language} />;
      case "settings":
        return <Settings language={language} />;
      case "help":
        return <Help language={language} />;
      case "search":
        return <SearchPage searchText={searchText} language={language} />;
      default:
        return <Dashboard language={language} />;
    }
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
      />

      <div className="main">
        <Navbar
          searchText={searchText}
          onSearchChange={setSearchText}
          onSearchFocus={() => setActivePage("search")}
          language={language}
          setLanguage={setLanguage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="main-page">{renderPage()}</div>
      </div>
    </div>
  );
}

export default App;
