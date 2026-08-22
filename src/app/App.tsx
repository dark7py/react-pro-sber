import { Provider } from "react-redux";
import { store } from "./store/store";
import { Outlet } from "react-router-dom";

import "./App.css";
import { withAuthProvider } from "./providers/Auth";
import { getRandomInt } from "shared/utils";
import { Header } from "widgets/Header";
import { Suspense } from "react";

const App = withAuthProvider(() => {
  const randomNumber = getRandomInt(1, 100);
  console.log(randomNumber);

  return (
    <Provider store={store}>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Provider>
  );
});

export default App;
