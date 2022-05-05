import "../styles/cardQuestions.scss";
import { ReactNode } from "react";

type CardQuestionsType = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode
}

export function CardQuestions({
  content,
  author,
  children
}: CardQuestionsType) {
  return(
    <div className="card-questions">
      <p>{content}</p>
      <footer>
        <div>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="box-like">
         {children}
        </div>
      </footer>
    </div>
  );
}
