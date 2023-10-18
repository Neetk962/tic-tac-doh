import { useRef, useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import JoinLink from "../JoinLink";

const PlayerTwo = ({ result }) => {
  const [option, setOption] = useState("rock");
  const [score, setScore] = useState(0);
  const rockHand = useRef();
  const { room, player_2 } = useContext(SocketContext);

  useEffect(() => {
    if (result.show) {
      setOption(room.players[player_2].option);
      setScore(room.players[player_2].score);
      rockHand.current.style.transform = `rotate(${result.rotate}deg)`;
    } else if (result.reset) {
      setOption("rock");
    } else {
      if (rockHand.current)
        rockHand.current.style.transform = `rotate(${result.rotate}deg)`;
    }
  }, [result]);

  return (
    <div className={styles.container}>
      {!player_2 && room.type === "friend" && (
        <JoinLink
          link={`${process.env.REACT_APP_BASE_URL}room/${room.roomId}`}
        />
      )}
      {!player_2 && (
        <div className={styles.opponent_container}>
          <div className={styles.opponent_card}>
            <PersonIcon />
          </div>
          <p className={styles.opponent_text}>
            waiting for opponent connection...
          </p>
        </div>
      )}
      {player_2 && (
        <div className={styles.player_info}>
          <div className={styles.star_container}>
            {[...Array(3).keys()].map((ele, index) =>
              index + 1 <= score ? (
                <StarIcon
                  key={index}
                  className={`${styles.star} ${styles.active_star}`}
                />
              ) : (
                <StarIcon key={index} className={styles.star} />
              )
            )}
          </div>
          <div className={styles.person}>
            <PersonIcon />
          </div>
        </div>
      )}
      {option === "rock" && player_2 && (
        <img
          src={rock_right_hand_img}
          alt="rock_right_hand_img"
          className={styles.rock_right_hand_img}
          ref={rockHand}
        />
      )}
      {option === "paper" && player_2 && (
        <img
          src={paper_right_hand_img}
          alt="paper_right_hand_img"
          className={styles.paper_right_hand_img}
        />
      )}
      {option === "scissors" && player_2 && (
        <img
          src={scissors_right_hand_img}
          alt="scissors_right_hand_img"
          className={styles.scissors_right_hand_img}
        />
      )}
    </div>
  );
};

export default PlayerTwo;
