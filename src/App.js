import styles from "./App.module.css";
import Cats from "./components/Cats/Cats";

function App() {
  return (
    <div className={styles.app}>
      <Cats />
    </div>
  );
}

export default App;
