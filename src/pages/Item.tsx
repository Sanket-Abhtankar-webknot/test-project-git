import Button from "../components/Button";
import style from "./Item.module.scss";
import { BiArrowBack } from "react-icons/bi";
import useAPIData from "../Hooks/useAPIData";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../Hooks/useTheme";

interface SubInfoType {
  left: string;
  right: string;
}

export default function Item() {
  const { theme } = useTheme();
  const { countryID } = useParams();
  const [data, apiLoading] = useAPIData({ name: countryID });
  const navigate = useNavigate();
  let countryData = data ? data[0] : null;
  const themeClass = theme === "dark" ? style.dark : style.default;
  //console.log(countryID, countryData, "**");

  function handleBack(): void {
    navigate(-1);
  }

  function handleToCountry(item: string) {
    navigate(`/country/${item}`);
  }

  const detailsDataList: SubInfoType[] = countryData
    ? [
        {
          left: "Native Name: ",
          right: (() => {
            let keys = Object.keys(countryData?.name?.nativeName);
            let property: any = keys[0];
            return countryData?.name?.nativeName[property]?.common;
          })(),
        },
        { left: "Top Level Domain:  ", right: countryData?.tld[0] },
        { left: "Population: ", right: countryData?.population },
        {
          left: "Currencies: ",
          right: (() => {
            let keys = Object.keys(countryData?.currencies);
            let property: any = keys[0];
            return countryData?.currencies[property]?.name;
          })(),
        },
        { left: "Region: ", right: countryData?.region },
        {
          left: "Languages: ",
          right: (() => {
            let keys = Object.keys(countryData.languages);
            let property: any = keys[0];
            return countryData?.languages[property];
          })(),
        },
        { left: "Sub Region: ", right: countryData?.subregion },
        {
          left: "Capital: ",
          right: countryData.capital ? countryData.capital[0] : "N/A",
        },
      ]
    : [];

  return (
    countryData && (
      <main className={`${style.ItemMain} ${themeClass}`}>
        <div className={style.ItemNavigation}>
          <Button
            mode={theme === 'dark'}
            buttonText="Back"
            icon={() => <BiArrowBack style={{ marginRight: "1rem" }} />}
            onClick={handleBack}
          />
        </div>

        <section className={style.ItemBody}>
          <div className={style.ItemImage}>
            <img
              loading="lazy"
              alt={countryData.flags.alt}
              src={countryData.flags.svg}
            />
          </div>
          <div className={style.ItemDescription}>
            <h2>{countryData.name.common}</h2>
            <div className={style.ItemDetails}>
              {detailsDataList.map((item) => (
                <p key={item.left}>
                  <span>{item.left}</span>
                  {item.right}
                </p>
              ))}
            </div>
            <div className={style.itemBorderCountriesLinks}>
              <span>Border Countries:</span>
              <span>
                { countryData?.borders ? countryData?.borders?.map((item: string) => (
                  <Button
                    key={item}
                    cs={{ fontWeight: 300, padding: "5px 10px" }}
                    onClick={() => handleToCountry(item)}
                    buttonText={item}
                  />
                )): 'N/A'}
              </span>
            </div>
          </div>
        </section>
      </main>
    )
  );
}
