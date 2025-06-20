'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  adSlot: string;
  className?: string;
}

const AdBanner = ({ adSlot, className }: AdBannerProps) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adSlot]);

  return (
    <div className={cn("relative text-center min-h-[90px] bg-muted/20 border border-dashed rounded-lg flex items-center justify-center overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none">
        <p>Advertisement</p>
      </div>
       <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-3344588854972492"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
