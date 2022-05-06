import letmeaskLogo from "../assets/images/logo.svg";
import answer from "../assets/images/answer.svg";
import check from "../assets/images/check.svg";

import { RoomCode } from "../components/roomCode";
import { useNavigate, useParams } from "react-router-dom";

import imgDelete from "../assets/images/delete.svg";
import { database } from "../services/firebase";

import { CardQuestions } from "../components/cardQuestions";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";
import React from "react";

type RoomParamsType = {
  id: string;
}

export function AdminRoom(){
  const navigate = useNavigate();

  const { id } = useParams<RoomParamsType>();

  const {questions, title} = useRoom(String(id));

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${id}`).update({
      endedAt: new Date()
    });

    navigate("/");
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isAnswered: true,
    });

  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isHighLighted: true,
    });
  }

  return(
    <div id="page-room">
      <header className="container-header">
        <div className="content">
          <img src={letmeaskLogo} alt="letmeask" />

          <div>
            <RoomCode code={String(id)} />
            <button onClick={handleEndRoom}>Encerrar sala</button>
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
            isAnswered={value.isAnswered}
            isHighLighted={value.isHighLighted}
          >
            {!value.isAnswered && (
              <React.Fragment>
                <button
                  className="check"
                  type="button"
                  aria-label="checkar pergunta"
                  onClick={() => handleCheckQuestionAsAnswered(value.id)}
                >
                  <img src={check} alt="checkar pergunta" />

                </button>
                <button
                  className="highlighted"
                  type="button"
                  aria-label="deletar pergunta"
                  onClick={() => handleHighLightQuestion(value.id)}
                >
                  <img src={answer} alt="icon de deletar" />

                </button>
              </React.Fragment>
            )}
            <button
              className="deletar"
              type="button"
              aria-label="deletar pergunta"
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
