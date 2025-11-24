import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/layout/ThemeProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingElements } from './components/layout/FloatingElements';
import { SocialMediaBar } from './components/layout/SocialMediaBar';
import { OrganizationStructuredData, LocalBusinessStructuredData } from './components/seo/StructuredData';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <OrganizationStructuredData />
            <LocalBusinessStructuredData />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <FloatingElements />
            <SocialMediaBar />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;