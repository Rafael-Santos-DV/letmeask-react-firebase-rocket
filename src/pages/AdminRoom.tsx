import letmeaskLogo from "../assets/images/logo.svg";
import { RoomCode } from "../components/roomCode";
import { useParams } from "react-router-dom";

import imgDelete from "../assets/images/delete.svg";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import { CardQuestions } from "../components/cardQuestions";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";

type RoomParamsType = {
  id: string;
}

export function AdminRoom(){

  const { user } = useAuth();

  const { id } = useParams<RoomParamsType>();

  const {questions, title} = useRoom(String(id));

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }
  }

  return(
    <div id="page-room">
      <header className="container-header">
        <div className="content">
          <img src={letmeaskLogo} alt="letmeask" />

          <div>
            <RoomCode code={String(id)} />
            <button>Encerrar sala</button>
          </div>
        </div>
      </header>
      <span className="bottom-line" />
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 1 && <span>{questions.length} pergunta(s)</span>}
        </div>
        {questions.length && questions.map((value) => (
          <CardQuestions
            key={value.id}
            author={value.author}
            content={value.content}
          >
            <button
              className="like-button"
              type="button"
              aria-label="Marcar como gostei"
              onClick={() => handleDeleteQuestion(value.id)}
            >
              <img src={imgDelete} alt="icon de deletar" />

            </button>
          </CardQuestions>
        ))}
      </main>
    </div>
  );
}
