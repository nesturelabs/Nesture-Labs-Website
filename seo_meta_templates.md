# Nesturelabs SEO & JSON-LD snippets (templates)

## Homepage meta example
<title>Nesture Labs — AI, Web & Mobile Development | Colombo, Sri Lanka</title>
<meta name="description" content="Nesture Labs builds AI-driven web, mobile, and digital growth solutions for global businesses. Contact info@nesturelabs.com.">

## Open Graph example
<meta property="og:title" content="Nesture Labs — AI, Web & Mobile Development"/>
<meta property="og:description" content="Nesture Labs builds AI-driven web, mobile, and digital growth solutions for global businesses."/>
<meta property="og:image" content="https://www.nesturelabs.com/og-image.jpg"/>
<meta property="og:url" content="https://www.nesturelabs.com/"/>
<meta property="og:type" content="website"/>

## JSON-LD Organization (paste into <head>)
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nesture Labs",
  "url": "https://www.nesturelabs.com",
  "logo": "https://www.nesturelabs.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "27/14 Ananda Rajakaruna Road",
    "addressLocality": "Colombo",
    "postalCode": "",
    "addressCountry": "LK"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+94 72 975 5955",
      "contactType": "customer service",
      "email": "info@nesturelabs.com"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/nesturelabs"
  ]
}
</script>

## FAQ schema example (replace Q/A)
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    {
      "@type":"Question",
      "name":"What services does Nesture Labs offer?",
      "acceptedAnswer":{"@type":"Answer","text":"Nesture Labs offers AI Solutions, Web Development, Mobile App Development, Digital Growth Strategy, and Social Media Marketing."}
    }
  ]
}
</script>
