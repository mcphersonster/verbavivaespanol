'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  adSlot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
    adsbygoogle_pushed_page_path: string;
  }
}

const AdBanner = ({ adSlot, className }: AdBannerProps) => {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const pathname = usePathname();

  useEffect(() => {
    // We only want to push ads once per page view. We use a global window
    // variable to track if ads have been pushed for the current path.
    if (typeof window !== 'undefined' && window.adsbygoogle_pushed_page_path !== pathname) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        window.adsbygoogle_pushed_page_path = pathname;
      } catch (err) {
        // This error can occur in development and is safe to ignore.
      }
    }
  }, [pathname]);

  if (!adClient) {
    return (
      <div className={cn("relative text-center min-h-[90px] bg-muted/20 border border-dashed rounded-lg flex items-center justify-center overflow-hidden", className)}>
        <p className="text-muted-foreground text-sm p-4">Advertisement Placeholder</p>
      </div>
    );
  }

  // A unique key based on the page path and the specific ad slot ensures
  // that React replaces the component entirely on navigation, preventing
  // conflicts with the AdSense script.
  return (
    <div key={`${pathname}-${adSlot}`} className={cn("relative text-center min-h-[90px] bg-muted/20 border border-dashed rounded-lg flex items-center justify-center overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none">
        <p>Advertisement</p>
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
