import { Fragment } from 'react';
import Documents from './components/Documents/Documents';
import Header from './components/Layout/Header';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Documents />
    </Fragment>
  );
}

export default App;
