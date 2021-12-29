import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import ScrollToTop from "./config/ScrollToTop";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<App />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
