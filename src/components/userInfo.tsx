import "../styles/userInfo.scss";

type UserInfoType = {
  avatar: string;
  name: string;
  id: string;
}

export function UserInfo(props: UserInfoType){
  return(
    <div className="user-info">
      <img src={props.avatar} alt={props.name} />
      <span>{props.name}</span>
    </div>
  );
}
