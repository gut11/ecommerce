import "./App.scss"
import Carousel from "./components/carousel/Carousel";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
	  <Carousel imgs={[1,2,3,4,5]}/>
    </div>
  );
}

export default App;
