import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Inter } from 'next/font/google';

import Title from '../src/components/Title';
import Footer from '../src/components/Footer';
import FormSection from '../src/components/FormSection';

const inter = Inter({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default function App() {
  useEffect(() => {
    const bootstrap = require('bootstrap');
  }, []);

  return (
    <div className={inter.className} id="App">
      <Title />
      {/* <FormSection />
      <Footer /> */}
    </div>
  );
}
