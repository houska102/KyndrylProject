import { Fragment } from "react";
import Documents from "./components/Documents/Documents";
import Header from "./components/Layout/Header";
import DocumentContextProvider from "./store/document-context";

const App = () => {
  return (
    <Fragment>
      <Header />
      <DocumentContextProvider>
        <Documents />
      </DocumentContextProvider>
    </Fragment>
  );
};

export default App;
