import styles from "./App.module.css";
import Routing from "./components/Routing/Routing";
import Header from "./components/Header/Header";
import Cats from "./components/Cats/Cats";

function App() {

  return (
      <div className={ styles.app }>
        <Cats />
        {/*<Header />*/}
        {/*<Routing/>*/}
      </div>
  );
}

export default App;
