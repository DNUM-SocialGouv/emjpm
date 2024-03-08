import logo from "~public/images/logo.png";

function LogoEtat(props) {
  return (
    <img
      src={logo}
      height="100px"
      alt="Ministère des Solidarités et de la Santé"
      {...props}
    />
  );
}

export default LogoEtat;
