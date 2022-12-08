const deviceSizes = {
  small: "300px",
  large: "500px",
};

const device = {
  small: `screen and (max-width: ${deviceSizes.small})`,
  large: `screen and (min-width: ${deviceSizes.large})`,
};

const theme = {
  device,
};

export default theme;
