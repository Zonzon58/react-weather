import loader from "./assets/loader.svg";

import "./App.css";

function App() {
  return (
    <main>
      <div className="loader-container">
        <img src={loader} alt="loader icon" />
      </div>
      <p className="city-name">Paris</p>
      <p className="country-name">France</p>
      <p className="temperature">17°</p>
      <div className="info-icon-container">
        <img src="/icons/02d.svg" alt="weathericon" />
      </div>
    </main>
  );
}

export default App;
