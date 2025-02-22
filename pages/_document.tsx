import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Smarter FRC data insights" />
        <meta
          name="keywords"
          content="frc,robotics,6070,mississauga,ontario,peel,pdsb,scoutmachine"
        />
        <meta name="og:title" content="Scout Machine" />
        <meta name="og:description" content="Smarter FRC data insights" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scout Machine" />
        <meta name="twitter:description" content="Smarter FRC data insights" />
        {/* <meta name="twitter:image" content="/meta-img.png" /> */}
        {/* <meta name="og:image" content="/meta-img.png" /> */}
        <meta name="theme-color" content="#FBBB04" />
        <link rel="shortcut icon" href="/smLogo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
