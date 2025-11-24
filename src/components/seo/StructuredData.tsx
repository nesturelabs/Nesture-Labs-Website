import React from 'react';
import { Helmet } from 'react-helmet-async';

export const OrganizationStructuredData: React.FC = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nesturelabs",
    "url": "https://nesturelabs.com",
    "logo": "https://nesturelabs.com/logo.png",
    "description": "Leading technology company specializing in web development, mobile apps, and AI solutions",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Innovation Drive",
      "addressLocality": "Colombo",
      "addressRegion": "Western Province",
      "postalCode": "00100",
      "addressCountry": "LK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94-77-975-3202",
      "contactType": "customer service",
      "email": "info@nesturelabs.com",
      "availableLanguage": ["English", "Sinhala", "Tamil"]
    },
    "sameAs": [
      "https://facebook.com/nesturelabs",
      "https://twitter.com/nesturelabs",
      "https://linkedin.com/company/nesturelabs",
      "https://instagram.com/nesturelabs",
      "https://github.com/nesturelabs"
    ],
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Charm Thiekshana"
    },
    "numberOfEmployees": "10-50",
    "industry": "Software Development",
    "areaServed": {
      "@type": "Country",
      "name": "Sri Lanka"
    },
    "serviceType": [
      "Web Development",
      "Mobile App Development",
      "AI Solutions",
      "UI/UX Design",
      "Cloud Services"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
    </Helmet>
  );
};

export const LocalBusinessStructuredData: React.FC = () => {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nesturelabs",
    "image": "https://nesturelabs.com/logo.png",
    "telephone": "+94-77-975-3202",
    "email": "info@nesturelabs.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Innovation Drive",
      "addressLocality": "Colombo",
      "addressRegion": "Western Province",
      "postalCode": "00100",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "6.9271",
      "longitude": "79.8612"
    },
    "url": "https://nesturelabs.com",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessData)}
      </script>
    </Helmet>
  );
};

interface ServiceProps {
  service: {
    title: string;
    description: string;
    features: string[];
  };
}

export const ServiceStructuredData: React.FC<ServiceProps> = ({ service }) => {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Nesturelabs"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Sri Lanka"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.features.map((feature: string) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feature
        }
      }))
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(serviceData)}
      </script>
    </Helmet>
  );
};