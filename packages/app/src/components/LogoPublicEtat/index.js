import logo from "~public/images/MIN_SOLIDARITES ET FAMILLES_RVB.png";

function LogoPublicEtat(props) {
  return (
    <img
      src={logo}
      width="120px"
      height="86px"
      alt="Ministère des Solidarités et de la Santé"
      {...props}
    />
  );
}

export default LogoPublicEtat;
