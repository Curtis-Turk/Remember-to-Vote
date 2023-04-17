import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import Title from '../src/components/Title';
import About from '../src/components/About';
import Footer from '../src/components/Footer';
import FormSection from '../src/components/FormSection';
import Head from 'next/head';

function App() {
  useEffect(() => {
    const bootstrap = require('bootstrap');
  }, []);

  return (
    <div id="App">
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        </style>
      </Head>
      <Title />
      <FormSection />
      <Footer />
    </div>
  );
}
export default App;
