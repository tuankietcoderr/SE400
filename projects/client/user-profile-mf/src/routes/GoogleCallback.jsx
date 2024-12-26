import { useSearchParams } from "@solidjs/router";
import { onMount } from "solid-js";
const GoogleCallback = () => {
  const [searchParams] = useSearchParams();

  onMount(() => {
    localStorage.setItem("accessToken", searchParams.token);
    window.location.href = "/";
  });

  return null;
};

export default GoogleCallback;
