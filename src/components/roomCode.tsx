import iconCopy from "../assets/images/copy.svg";
import "../styles/room-code.scss";

type RoomCodeType = {
  code: string;
}

export function RoomCode(props: RoomCodeType) {
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code);
  }
  return(
    <div className="box-copy" onClick={copyRoomCodeToClipboard}>
      <img src={iconCopy} alt="icon copy" />
      <span>Sala #{props.code}</span>
    </div>
  );
}
