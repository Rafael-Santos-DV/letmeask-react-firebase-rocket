import "../styles/cardQuestions.scss";
import { ReactNode } from "react";

import cx from "classnames";

type CardQuestionsType = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode
  isHighLighted?: boolean,
  isAnswered?: boolean
}

export function CardQuestions({
  content,
  author,
  children,
  isAnswered = false,
  isHighLighted = false,
}: CardQuestionsType) {
  console.log(isAnswered, isHighLighted)
  return(
    <div className={cx("card-questions",
      { answered: isAnswered },
      { highlighted: isHighLighted && !isAnswered})}
    >
      <p>{content}</p>
      <footer>
        <div>
          <img src={author.avatar} alt={author.name} />
          <span className="user-info">{author.name}</span>
        </div>
        <div className="box-like">
         {children}
        </div>
      </footer>
    </div>
  );
}
