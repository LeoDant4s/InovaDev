import React from "react";
import "./BemVindo.css";

export const BemVindoPage = ({ pageState }) => {
  const { setCurrentPage } = pageState;

  return (
    <div className="all">
      <div>
        <div className="tx1">
          <center>
            <h2>Equipe InovaDev</h2>
          </center>
        </div>

        <div className="tx-center">
          <center>
            <h1>
              Monte seu <br /> cronograma de <br /> estudos
            </h1>
          </center>

          <button className="BemVindo-botao" onClick={() => setCurrentPage(1)}>
            <h2>
              <a href="#">Comece já!</a>
            </h2>
          </button>

          <h2>
            Estamos aqui para facilitar sua vida. <br />
            Monte seu cronograma de estudos de maneira fácil e rápida
          </h2>
        </div>
      </div>
    </div>
  );
};
