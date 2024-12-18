import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import useValue from "../components/Value";
import SuggestHotels from "../components/SuggestHotels";
import useBanner from "../components/Banner";

const Home = () => {
  useEffect(() => {
    useBanner();
    useValue();
  }, []);

  return (
    <div>
      <app-banner />
      <div className="mt-8 flex gap-8 flex-col">
        <SearchBar />
        <app-value />
        <SuggestHotels />
      </div>
    </div>
  );
};

export default Home;
