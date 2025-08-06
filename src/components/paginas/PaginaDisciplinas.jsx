import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginaBase from "../layouts/PaginaBase";

const PaginaDisciplinas = () => {
  return (
    <PaginaBase
      botaoDireito={
        <Link to="/inicial">
          <button className="botao-navbar">Voltar</button>
        </Link>
      }
    ></PaginaBase>
  );
};

export default PaginaDisciplinas;
