import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import Signin from "./components/Signin";
import Detail from "./components/Detail";
import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background: #e9ecef;
    color: black;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle/>
      <Signin />

      <Header />
    </>
  );
}

export default App;
