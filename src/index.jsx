import { createRoot } from "react-dom/client";
import MainView from "./components/main-view/main-view";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const App = () => {
  return (
    <Container fluid className="px-0">
      <MainView/>
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
