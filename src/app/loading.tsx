import React from "react";
import Loaders from "@/components/Loaders";
const loading = () => {
  return (
    <div className="h-dvh w-full flex justify-center items-center">
      <Loaders />
    </div>
  );
};

export default loading;
