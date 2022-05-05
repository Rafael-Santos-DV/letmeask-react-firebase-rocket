import letmeaskLogo from "../assets/images/logo.svg";
import { RoomCode } from "../components/roomCode";
import { useParams } from "react-router-dom";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/room.scss";
import { UserInfo } from "../components/userInfo";

type RoomParamsType = {
  id: string;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}>

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}

export function Room(){

  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState('');
  const { id } = useParams<RoomParamsType>();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);

    roomRef.once("value", (room) => {

      const databaseRoom = room.val();

      const firebaseQuestion = databaseRoom.questions as FirebaseQuestions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered
        };

      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);

    })
  }, [id]);

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
      </main>
    </div>
  );
}
