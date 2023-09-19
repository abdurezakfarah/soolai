import React from 'react';

export interface PageHeadProps {
  title: string;
  subtitle?: string;
}

const PageHead: React.FC<PageHeadProps> = ({ title, subtitle }) => {
 
  return (
    <section>
      <h1
        className="text-black-dark font-extrabold text-[32px] md:text-4xl lg:text-5xl leading-none tracking-tight"
      >
        {title}
      </h1>
      <p
        className="my-2 text-black-light text-[16px] md:text-xl lg:text-2xl tracking-tight leading-none max-w-[500px]"
      >
        {subtitle}
      </p>
    </section>
  );
}

export default PageHead;
