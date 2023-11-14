import "./BemVindo.css"

export const BemVindoPage = ({ pageState }) => {
  const { setCurrentPage } = pageState;

  return (
    <div className="BemVindo-bg">
      Olá, Qual o seu nome?
      <button className="BemVindo-botao" onClick={() => setCurrentPage(1)}>Clique para continuar</button>
    </div>
  )
}