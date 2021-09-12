import "./App.css";
import Quote from "./components/Quote";
import Todos from "./components/Todos";
import logo from "./images/todo.png";

function App() {
  return (
    <div className="app">
      <header>
        <nav className="navbar">
          <img src={logo} alt="logo" className="navbar__logo" />
        </nav>
      </header>
      <Quote />
      <Todos />
    </div>
  );
}

export default App;
