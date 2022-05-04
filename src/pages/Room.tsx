import letmeaskLogo from "../assets/images/logo.svg";
import { RoomCode } from "../components/roomCode";
import { useParams } from "react-router-dom";

import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/room.scss";

type RoomParamsType = {
  id: string;
}

export function Room(){

  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState('');
  const { id } = useParams<RoomParamsType>();

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") return;

    if (!user) {
      throw new Error("You must be logged in");
    }

    const questions = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHightLighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${id}/questions`).push(questions);
  }

  return(
    <div id="page-room">
      <header className="container-header">
        <div className="content">
          <img src={letmeaskLogo} alt="letmeask" />
          <RoomCode code={String(id)} />
        </div>
      </header>
      <span className="bottom-line" />
      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form className="form-content" onSubmit={handleSendQuestion}>
          <textarea
            placeholder=" O que você quer pertuntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
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
