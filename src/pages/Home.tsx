import illustrationimg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { useNavigate } from "react-router-dom";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {

  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Romm does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room alredy closed.");
      return;
    }

    navigate(`/rooms/${roomCode}`);
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
          <form className="content-form" onSubmit={handleJoinRoom}>
            <input
              type="text"
              name=""
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value)}
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
