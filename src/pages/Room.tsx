import letmeaskLogo from "../assets/images/logo.svg";
import iconCopy from "../assets/images/copy.svg";

import "../styles/room.scss";

export function Room(){
  return(
    <div id="page-room">
      <header className="container-header">
        <div className="content">
          <img src={letmeaskLogo} alt="letmeask" />
          <div className="box-copy">
            <img src={iconCopy} alt="icon copy" />
            <span>Código</span>
          </div>
        </div>
      </header>
      <span className="bottom-line" />
      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form className="form-content">
          <textarea
            placeholder=" O que você quer pertuntar?"
          />

          <div className="box-submit">
            <div className="form-footer">
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            </div>

            <button type="submit">Enviar pergunta</button>
          </div>

        </form>
      </main>
    </div>
  );
}
