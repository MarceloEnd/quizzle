import React, { useEffect } from 'react';

export const AdComponent = ({ adSlot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ overflow: 'hidden', textAlign: 'center', height: '10vh' }}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6486557001399248" // Your Publisher ID
        data-ad-slot={"f08c47fec0942fa0"}                    // The specific Ad Unit ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};