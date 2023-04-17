import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import Title from '../src/components/Title';
import About from '../src/components/About';
import Footer from '../src/components/Footer';
import FormSection from '../src/components/FormSection';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

function App() {
  useEffect(() => {
    const bootstrap = require('bootstrap');
  }, []);

  return (
    <div className={inter.className} id="App">
      <Title />
      <FormSection />
      <Footer />
    </div>
  );
}
export default App;
