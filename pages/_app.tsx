import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import Title from '../src/components/Title';
import About from '../src/components/About';
import Footer from '../src/components/Footer';
import FormSection from '../src/components/FormSection';

function App() {
  useEffect(() => {
    const bootstrap = require('bootstrap');
  }, []);

  return (
    <div id="App">
      <Title />
      <About />
      <FormSection />
      <Footer />
    </div>
  );
}
export default App;
