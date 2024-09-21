import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-black-dark">
            404
          </h1>
          <p className="mb-4 text-3xl md:text-4xl text-black-light tracking-tight font-bold">
            Something's missing .
          </p>
          <p className="mb-4 text-black-light text-lg font-light">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>

          <Link to="/" className="btn bg-secondary">
            Back To Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
