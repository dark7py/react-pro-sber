import { TaskPage } from "pages/index";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <TaskPage />
    </Provider>
  );
}

export default App;
