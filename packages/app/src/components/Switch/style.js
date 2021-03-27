function SwitchInputStyle() {
  return {
    border: "0",
    clip: "rect(0 0 0 0)",
    clippath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  };
}

function SwitchWrapperStyle() {
  return {
    display: "inline-block",
    fontFamily: "body",
    fontWeight: "600",
    verticalAlign: "middle",
  };
}

export { SwitchInputStyle, SwitchWrapperStyle };
