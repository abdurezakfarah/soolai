import React from 'react';

import {
  useRouteError
} from "react-router-dom"

const Error: React.FC = () => {
  const error: any = useRouteError();
  
  console.log(error)
  return (
    <div className="h-[50vh] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-red-600">Error</h1>
      <p className="text-red-600">{error?.message}</p>
    </div>
  );
};

export default Error;
