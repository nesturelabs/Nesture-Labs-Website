import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Hero } from '../components/home/Hero';
import { Services } from '../components/home/Services';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { HowWeWork } from '../components/home/HowWeWork';
// import { Testimonials } from '../components/home/Testimonials';
import { TechStack } from '../components/home/TechStack';
import { FinalCTA } from '../components/home/FinalCTA';
import { BrandLogosSection } from '../components/home/BrandLogosSection';

export const Home: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Nesturelabs - Web, Mobile & AI Development Company",
    "description": "Leading technology company in Sri Lanka specializing in web development, mobile apps, and AI solutions.",
    "url": "https://nesturelabs.com",
    "mainEntity": {
      "@type": "Organization",
      "name": "Nesturelabs"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nesturelabs.com"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Nesturelabs - Web, Mobile & AI Development Company | Sri Lanka"
        description="Leading technology company in Sri Lanka specializing in web development, mobile apps, and AI solutions. Transform your business with cutting-edge digital solutions. Get a free consultation today."
        keywords="web development Sri Lanka, mobile app development, AI solutions, software company, digital transformation, React development, Flutter apps, machine learning, Colombo tech company"
        url="https://nesturelabs.com"
        structuredData={structuredData}
      />
      <div className="min-h-screen">
        <Hero />
        <Services />
        <BrandLogosSection />
        <WhyChooseUs />
        <HowWeWork />
        {/* <Testimonials /> */}
        <TechStack />
        <FinalCTA />
      </div>
    </>
  );
};