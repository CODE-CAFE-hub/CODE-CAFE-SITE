import React from "react";
import Head from "next/head";

const PageName = () => {
  return (
    <div>
      <Head>
        <title>Your Page Title</title>
        <meta name="description" content="Your page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Page content goes here */}
      <h1>Your Page Content</h1>
    </div>
  );
};

export default PageName;
