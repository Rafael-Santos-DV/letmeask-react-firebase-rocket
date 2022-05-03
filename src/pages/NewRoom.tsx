import { Link } from "react-router-dom";
import illustrationimg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/auth.scss";

export default function NewRoom() {
  return(
    <div id="container">
      <aside className="side-bar-illustration">
        <img src={illustrationimg} alt="Ilustração simbolizando perguntas e respostas." />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvias da sua audiência em tempo real</p>
      </aside>
      <main className="content-main">
        <div className="content-main-login">
          <img src={logoImg} alt="LetMeask" />
          <h2>Criar uma nova sala</h2>
          <form className="content-form">
            <input
              type="text"
              name=""
              placeholder="Nome da sala"
            />
            <button type="submit">
              Criar Sala
            </button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
