import React, { useEffect, useRef } from "react";
import authButtonMount from "user_profile_mf/authButtonMount";

const Header = () => {
  const authButtonRef = useRef(null);

  useEffect(() => {
    authButtonMount(authButtonRef.current);
  }, []);

  return (
    <header className="flex justify-between p-5 bg-white/60 border-b border-gray-200 items-center min-h-24 sticky top-0 z-[9999] backdrop-filter backdrop-blur-lg">
      <a href="/">
        <h1 className="text-4xl font-bold text-green-500">Booking</h1>
      </a>
      <nav>
        <div ref={authButtonRef} />
      </nav>
    </header>
  );
};

export default Header;
