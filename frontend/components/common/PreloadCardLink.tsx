import React from "react";

function PreloadCardLink() {
  return (
    <>
      <link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/static/images/card-1.webp"
      />
      <link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/static/images/card-2.webp"
      />
      <link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/static/images/card-3.webp"
      />
      <link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/static/images/card-4.webp"
      />
    </>
  );
}

export default PreloadCardLink;
