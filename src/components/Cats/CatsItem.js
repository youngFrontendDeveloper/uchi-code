import styles from "./CatsItem.module.css";
import { useState } from "react";
import { ReactComponent as IconHeartHover } from "../img/icon-like-hover.svg";
import { ReactComponent as IconHeartClicked } from "../img/icon-like-clicked.svg";

function CatsItem({ cat, i, likeCat, filter }) {
  const [isLiked, setLiked] = useState(false);

  const liked = () => {
    likeCat(cat, i);
    setLiked(!isLiked);
  };

  return (
    <>
      <div
        className={
          filter == "All"
            ? isLiked
              ? styles.cat__itemActive
              : styles.cat__item
            : styles.cat__item
        }
      >
        <img
          src={cat.url}
          className={styles.cat__img}
          alt="Изображение кошки"
        />
        <IconHeartHover className={styles.cat__iconHeartHover} />
        <IconHeartClicked
          className={
            filter == "All"
              ? isLiked
                ? styles.cat__iconHeartClickedActive
                : styles.cat__iconHeartClicked
              : styles.cat__iconHeartClicked
          }
          onClick={liked}
        />
      </div>
    </>
  );
}

export default CatsItem;
