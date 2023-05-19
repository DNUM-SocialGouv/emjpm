import logo from "~public/images/Ministere_Solidarite_Autonomie_Personnes_Handicapees.png";

function LogoEtat(props) {
  return (
    <img src={logo} alt="Ministère des Solidarités et de la Santé" {...props} />
  );
}

export default LogoEtat;

