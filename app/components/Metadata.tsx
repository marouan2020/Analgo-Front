
'use client';

export default function Metadata() {
    const metaImage = "https://cdn.analgo.tech/logo.png";
    const metaTitle = "Analgo - Digital Experience Monitoring (DEM) for Web, Mobile & IA";
    const ogUrl = 'https://www.analgo.tech/';
    const metaDescription = "Analgo uniquely enables you to understand and improve every software experience for customers and employees—whether on web, mobile, SaaS, AI, or agent platforms.";
    const metaKeywords = "software experience analytics, digital experience monitoring, DEM, RUM, EUEM, APM, monitoring SaaS, analyse expérience utilisateur, amélioration performance logicielle, Real User Monitoring, UX analytics, web mobile AI";

    return (
        <>
            <title>{metaTitle}</title>
            <meta name="title" content={metaTitle}/>
            <meta name="description" content={metaDescription}/>
            <meta name="keywords" content={metaKeywords}/>
            <meta name="robots" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"/>
            <meta property="og:url" content={ogUrl}/>
            <meta property="og:site_name" content="AnalGo"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:title" content={metaTitle}/>
            <meta property="og:description" content={metaDescription}/>
            <meta property="og:image" content={metaImage}/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={metaTitle}/>
            <meta name="twitter:description" content={metaDescription}/>
            <meta name="twitter:image" content={metaImage}/>
        </>
    );
}