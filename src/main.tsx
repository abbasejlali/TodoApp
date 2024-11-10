import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

//spa
import { BrowserRouter } from "react-router-dom";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux
import { Provider } from "react-redux";
import store from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);
