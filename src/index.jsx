import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import MainView from "./components/main-view/main-view";
import { Container } from "react-bootstrap";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// Finds the roof of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
