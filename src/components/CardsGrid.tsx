import { Link } from "react-router-dom";
import Cards from "./Cards";
interface IState {
  ref: any;
  style: any;
  dataList: any;
  theme: any;
}
export default function CardsGrid({ state }: { state: IState }) {
  return (
    <section ref={state.ref} className={state.style}>
      {state.dataList.map((item: any, index: number) => (
        <Link key={item.area} to={`country/${item.name.common}`}>
          <Cards
            data={item}
            refData={{
              theme: state.theme,
              index: index,
              length: state.dataList.length,
              ref: index == state.dataList.length - 1 ? state.ref : null,
            }}
          />
        </Link>
      ))}
    </section>
  );
}
