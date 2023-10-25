import style from "./Cards.module.scss";
import { useInView } from "react-intersection-observer";

const options = {
  threshold: 0.3,
  rootMargin: "0px",
};

export default function Cards({ data, refData }: { data: any, refData?: any }) {
  const { ref, inView } = useInView(options);
  
  // console.log(data?.capital);
  const themeClass = refData.theme === 'dark' ? style.dark : style.default 
  return (
    <div ref={refData.ref} className={`${style.cardsMainContainer} ${themeClass}`}>
      <div ref={ref} className={style.cardImgContainer}>
        <img loading="lazy" src={data.flags.svg} alt={data.flags.alt} />
      </div>
      <div className={style.cardInfoContainer}>
        <h3>{data.name.common}</h3>
        <div className={style.cardSubInfo}>
          <p><span className="subText">Population:</span> {data?.population}</p>
          <p><span className="subText">Region:</span> {data?.region}</p>
          <p><span className="subText">Capital:</span> { data?.capital ? data?.capital[0] : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
