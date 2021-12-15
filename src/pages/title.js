/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import Logo from "../static/images/gameLogo.png"
import { css } from "@emotion/react";

export default function Title() {
  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      `}>
      <img css={css`width: 40%;`} src={Logo} alt="logo"/>
        <div>by Luis Raul Talavera Llerena</div>
      <Link to="/config">Continuar</Link>
    </div>
  );
}