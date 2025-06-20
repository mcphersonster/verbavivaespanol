'use client';

import React, { useEffect, useId } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  adSlot: string;
  className?: string;
}

const AdBanner = ({ adSlot, className }: AdBannerProps) => {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const pathname = usePathname();
  const id = useId();

  useEffect(() => {
    if (adClient) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // This error is common in development due to React's Strict Mode & Fast Refresh.
        // It can be safely ignored.
      }
    }
  }, [pathname, adSlot]);

  if (!adClient || adClient === 'ca-pub-3344588854972492') {
    return (
       <div className={cn("relative text-center min-h-[90px] bg-muted/20 border border-dashed rounded-lg flex items-center justify-center overflow-hidden", className)}>
        <p className="text-muted-foreground text-sm p-4">Advertisement Placeholder</p>
      </div>
    )
  }

  return (
    <div className={cn("relative text-center min-h-[90px] bg-muted/20 border border-dashed rounded-lg flex items-center justify-center overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none">
        <p>Advertisement</p>
      </div>
       <ins
        key={`${id}-${pathname}-${adSlot}`}
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
