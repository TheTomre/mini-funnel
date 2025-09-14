import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { EmailPage } from "./pages/EmailPage";
import { NamePage } from "./pages/NamePage";
import { ProductPage } from "./pages/ProductPage";
import { SuccessPage } from "./pages/SuccessPage";
import "./app.css";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<EmailPage />} />
            <Route path="/name" element={<NamePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
