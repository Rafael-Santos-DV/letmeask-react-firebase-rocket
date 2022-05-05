import "../styles/cardQuestions.scss";
import like from "../assets/images/like.svg";

type CardQuestionsType = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
}

export function CardQuestions({
  content,
  author,
}: CardQuestionsType) {
  return(
    <div className="card-questions">
      <p>{content}</p>
      <footer>
        <div>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          <div className="box-like">
            <span>1</span>
            <img src={like} alt="icon like" />
          </div>
        </div>
      </footer>
    </div>
  );
}
