import axios from "axios";
import React, { useEffect } from "react";

function refreshtokentest() {
  useEffect(() => {
    axios.get("/api/test").then((res) => console.log(res));
  }, []);
  return <div>refreshtokentest</div>;
}

export default refreshtokentest;