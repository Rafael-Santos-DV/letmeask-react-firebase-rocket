import illustrationimg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

export function Home() {
  return(
    <div>
      <aside>
        <img src={illustrationimg} alt="Ilustração simbolizando perguntas e respostas." />
        <strong>Crie salas de Q&clamp;A ao vivo</strong>
        <p>Tire as dúvias da sua audiência em tempo real</p>
      </aside>
      <main>
        <div>
          <img src={logoImg} alt="LetMeask" />
          <button>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </button>
          <div>ou entre uma sala</div>
          <form>
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