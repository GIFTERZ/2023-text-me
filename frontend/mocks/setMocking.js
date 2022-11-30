const setMocking = () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    require(".");
  }
};

export { setMocking };
