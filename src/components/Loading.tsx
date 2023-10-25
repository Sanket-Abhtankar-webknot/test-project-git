import style from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={style.loading}>
      <h3>Loading more flags, one pixel at a time...</h3>
      <div className={style.loadingAnimation}>
        <div className={style.dot_1}>🟥</div>
        <div className={style.dot_2}>🟧</div>
        <div className={style.dot_3}>🟨</div>
        <div className={style.dot_4}>🟩</div>
        <div className={style.dot_5}>🟦</div>
        <div className={style.dot_6}>🟪</div>
      </div>
    </div>
  );
}
