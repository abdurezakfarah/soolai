import React from "react";

export interface PageHeadProps {
  title: string;
  subtitle?: string;
}

const PageHead: React.FC<PageHeadProps> = ({ title, subtitle }) => {
  return (
    <section className="max-w-3x">
      <h1 className="text-black-dark l text-pretty font-extrabold text-3xl md:text-4xl lg:text-5xl leading-none tracking-tight">
        {title}
      </h1>
      <p className="mt-4 text-black-light text-pretty md:text-xl lg:text-2xl tracking-tight leading-none">
        {subtitle}
      </p>
    </section>
  );
};

export default PageHead;
