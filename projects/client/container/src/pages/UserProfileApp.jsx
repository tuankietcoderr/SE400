import React, { lazy, useEffect, useRef } from "react";
import { mount } from "user_profile_mf/UserProfileApp";
const UserProfileApp = () => {
  const ref = useRef(null);
  useEffect(() => {
    mount(ref.current);
  }, []);
  return <div ref={ref} />;
};

export default UserProfileApp;
