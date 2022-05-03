import illustrationimg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { auth, firebase } from "../services/firebase";
import { useNavigate } from "react-router-dom";

import "../styles/auth.scss";

export function Home() {
  const navigate = useNavigate();

  function handleCreateRoom(): void {
    const provider =  new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
      console.log(result);

      navigate("/rooms/new");
    })
  }
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
          <button onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </button>
          <div>ou entre uma sala</div>
          <form className="content-form">
            <input
              type="text"
              name=""
              placeholder="Digite o código da sala"
            />
            <button type="submit">
              Entrar na sala
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
