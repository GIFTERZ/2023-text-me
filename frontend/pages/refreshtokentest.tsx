import axios from "axios";
import React, { useEffect } from "react";
import { useAccessToken } from "../auth/useAccessToken";

function refreshtokentest() {
  const { getAccessToken, accessToken } = useAccessToken();
  useEffect(() => {
    axios.get("/api/test").then((res) => console.log(res));
  }, []);
  return <div>refreshtokentest</div>;
}

export default refreshtokentest;
