import { Provider } from "react-redux";
import { store } from "./store/store";
import { Outlet } from "react-router-dom";

import "./App.css";
import { withAuthProvider } from "./providers/Auth";

const App = withAuthProvider(() => {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
});

export default App;
