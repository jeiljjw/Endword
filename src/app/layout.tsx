import "./globals.css";
import React from "react";
import Script from "next/script";
import Image from "next/image";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="description" content="끝말잇기 게임! 단어를 이어 말하세요~" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Gemmini" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <title> 끝말잇기 게임! </title>
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body>
        {/* 좌측 고정 광고 */}
        <div className="ad-container" style={{
          position: 'fixed',
          left: 9,
          top: 30,
          height: '100vh',
          width: 160,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 1000,
          pointerEvents: 'auto',
        }}>
          <ins className="kakao_ad_area"
            style={{ display: 'block', width: 160, height: 600 }}
            data-ad-unit="DAN-ZybNET6eWUrlFD8Z"
            data-ad-width="160"
            data-ad-height="600"
          ></ins>
          <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="afterInteractive" />
          {/* 좌측 프로모션 배너 (PC 전용) */}
          <a
            href="https://ui7gwmf8ww.sens.kr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: 160,
              marginTop: 12,
            }}
            className="left-promo-banner"
          >
            <Image src="/magabogam.png" alt="좌측 프로모션 배너" width={160} height={120} />
          </a>
        </div>
        {/* 우측 고정 광고 */}
        <div className="ad-container" style={{
          position: 'fixed',
          right: 16,
          top: 30,
          height: '100vh',
          width: 160,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 1000,
          pointerEvents: 'auto',
        }}>
          <ins className="kakao_ad_area"
            style={{ display: 'block', width: 160, height: 600 }}
            data-ad-unit="DAN-r2yVQG1CBItuDqNP"
            data-ad-width="160"
            data-ad-height="600"
          ></ins>
          <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="afterInteractive" />
          {/* 우측 프로모션 배너 (PC 전용) */}
          <a
            href="https://ui7gwmf8ww.sens.kr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: 160,
              marginTop: 12,
            }}
            className="right-promo-banner"
          >
            <Image src="/magabogam.png" alt="우측 프로모션 배너" width={160} height={120} />
          </a>
        </div>
        {/* 메인 컨텐츠 */}
        {children}
      </body>
    </html>
  );
}
