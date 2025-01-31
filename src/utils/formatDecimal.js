const formatDecimal = (value) => {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value;
};

export default formatDecimal;
