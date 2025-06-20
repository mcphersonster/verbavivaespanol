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
  }, []);

  return (
    <div className={cn("text-center min-h-[50px]", className)}>
       <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3344588854972492"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
