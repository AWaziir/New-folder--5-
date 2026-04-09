import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdPlaceholder from './AdPlaceholder';

export default function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-layout">
      <Header />
      
      {/* Global Ad 1: Below Header (Everywhere except Home since home has hero) */}
      {!isHomePage && (
         <div className="container mt-6 print-hide">
            <AdPlaceholder text="Global Top Leaderboard Ad" />
         </div>
      )}

      <main className="main-content">
        <Outlet />
      </main>

      {/* Global Ad 2 & 3: Before Footer */}
      <div className="container mb-12 print-hide">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdPlaceholder text="Bottom Content Ad 1" />
            <AdPlaceholder text="Bottom Content Ad 2" />
         </div>
      </div>

      <Footer />
    </div>
  );
}
