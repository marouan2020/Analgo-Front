'use client';

import '../lib/fontawesome';
import "./globals.css";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import Script from "next/script";
import Topbar from "@/app/components/Topbar";
import Metadata from "./components/Metadata";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useIsLoggedIn();
  return (
    <html lang="en">
      <head>
        <Metadata/>
        <Script
          src={process.env.NEXT_PUBLIC_URL_GSI_CLIENT_GOOGLE!}
          strategy="afterInteractive"
          async
        />
        <Script
          src={process.env.NEXT_PUBLIC_URL_GOOGLE_TAGMANAGER!}
          strategy="afterInteractive"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XTLPCVZMNE');
            `}
        </Script>
          <Script id="pendo" strategy="afterInteractive">
              {`
              /*let idv = crypto.randomUUID();
                (function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
        o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]); y=e.createElement(n);y.async=!0;y.src='https://cdn.eu.pendo.io/agent/static/'+apiKey+'/pendo.js';
        z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
        pendo.initialize({
            visitor: {id:idv},
            account: {id:idv}
        });
})('8bb24f07-554d-42a1-b93e-a43a5467e8b0');*/
            `}
          </Script>
      </head>
      <body className='bg-dark'>
          <main className='h-100 bg-gradient-to-tr from-sky-100 via-sky-200 to-blue-300'>
              {!isLoggedIn && <Header />}
              <div className='col-12'>
                  {isLoggedIn && <Topbar />}
                  <div className='d-flex'>
                      {isLoggedIn && <Sidebar />}
                      <div className="flex-grow-1 mt-2">
                          {children}
                      </div>
                  </div>
              </div>
              {!isLoggedIn && <Footer />}
          </main>
      </body>
    </html>
  );
}
