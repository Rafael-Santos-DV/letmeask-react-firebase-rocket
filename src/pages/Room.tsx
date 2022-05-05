import letmeaskLogo from "../assets/images/logo.svg";
import { RoomCode } from "../components/roomCode";
import { useParams } from "react-router-dom";

import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/room.scss";
import { UserInfo } from "../components/userInfo";
import { CardQuestions } from "../components/cardQuestions";
import { useRoom } from "../hooks/useRoom";

type RoomParamsType = {
  id: string;
}

export function Room(){

  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState('');
  const { id } = useParams<RoomParamsType>();

  const {questions, title} = useRoom(String(id));

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
    setNewQuestion('');

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
          <h1>Sala {title}</h1>
          {questions.length > 1 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <form className="form-content" onSubmit={handleSendQuestion}>
          <textarea
            placeholder=" O que você quer pertuntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="box-submit">
            <div className="form-footer">
              { user ? (
               <UserInfo
                avatar={user.avatar}
                id={user.id}
                name={user.name}
               />
              ) : (
                  <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
              )}

            </div>

            <button type="submit">Enviar pergunta</button>
          </div>

        </form>
        {questions.length && questions.map((value) => (
          <CardQuestions
            key={value.id}
            author={value.author}
            content={value.content}
          />
        ))}
      </main>
    </div>
  );
}
