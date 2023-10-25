import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../Hooks/useDebounce";
import style from "./Home.module.scss";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import useAPIData from "../Hooks/useAPIData";
import { useInView } from "react-intersection-observer";
import useLocalStorage from "../Hooks/useLocalStorage";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { MdArrowUpward } from "react-icons/md";
import useTheme from "../Hooks/useTheme";
import axios from "axios";
import { baseURL } from "../utils/utils";
import CardsGrid from "../components/CardsGrid";

const useInViewOptions = {
  threshold: 1,
  rootMargin: "0px",
};

async function callSearch(string: string) {
  const base = `${baseURL}name/`;
  let data;
  try {
    const response = await axios.get(`${base}${string}`);
    if (response.status === 200) {
      data = response.data;
    }
  } catch (error) {
    //error
  }
  return data;
}

export default function Home() {
  const { query, queryRegion } = useParams();
  const { ref, inView, entry } = useInView(useInViewOptions);
  const [value, delayed, setValue] = useDebounce();
  const [CountriesList, apiLoad] = useAPIData({name : query, region: queryRegion});
  // const [CountriesRegionList] = useAPIData({ name: undefined, region: queryRegion });
  const [dataList, setDataList] = useState<any>([]);
  const [page, setPage] = useLocalStorage();
  const [loading, setLoading] = useState(false);
  const [toTop, setToTop] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  

  function setInitialData() {
    setPage((prev) => 1);
    if (CountriesList) setDataList(CountriesList.slice(0, 12));
  }

  useEffect(() => {
    setInitialData();
  }, [CountriesList]);

  function handleSearch(event: any) {
    let eventValue = event.target.value;
    setValue(eventValue);
  }

  useEffect(() => {
    navigate(`/search/${delayed}`);
  }, [delayed]);

  useEffect(() => {
    if (query) {
      try {
        setLoading(true);
        callSearch(query).then((data) => setDataList(data));
        setLoading(false);
      } catch (error) {
        //error
      }
    } else {
      navigate("/");
      setInitialData();
    }
  }, [query]);

  useEffect(() => {
    if (inView && CountriesList.length >= 10 && !query) {
      setLoading(true);
      setPage((prev: number) => {
        loadMoreData(prev + 1);
        return prev + 1;
      });
    }
  }, [inView]);

  async function loadMoreData(page: number) {
    let delayLoad: number | undefined;
    let dataCountPerPage = 12 * page;

    if (CountriesList) {
      delayLoad = setTimeout(() => {
        const newData = CountriesList.slice(0, dataCountPerPage);
        setDataList(newData);
        setLoading(false);
        clearTimeout(delayLoad);
      }, 2000);
    }
  }

  function handleGoToTop() {
    // setDataList(CountriesList.slice(0, 12));
    setLoading(false);
    loadMoreData(1);
    setPage((prev) => 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    console.log(query, "**");
    function handleScroll() {
      if (window.scrollY > 100) {
        setToTop(true);
      } else {
        setToTop(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      localStorage.clear();
    };
  }, []);

  function handleOnChangeDropdown(item: string) {
    if (item) {
      navigate(`/region/${item}`);
    } else {
      navigate("/");
    }
  }

  let themeStyle = theme === "dark" ? style.dark : style.default;

  return (
    <>
      <main className={`${style.homeMainContainer} ${themeStyle}`}>
        <nav>
          <label className={style.homeSearchBar} htmlFor="search">
            <FaSearch />
            <input
              aria-label="search for a country"
              role="search"
              id="search"
              type="text"
              value={value as string}
              onChange={handleSearch}
            />
          </label>
          <Dropdown changeValue={handleOnChangeDropdown} />
        </nav>
        <CardsGrid
          state={{
            ref: ref,
            style: style.HomeGridMainContainer,
            dataList: dataList,
            theme: theme,
          }}
        />
      </main>
      {loading && <Loading />}
      {toTop && (
        <div className={style.homeGoToTopContainer}>
          <Button
            mode={theme === "dark"}
            buttonText="Go to top and reset"
            icon={() => <MdArrowUpward style={{ marginRight: "5px" }} />}
            onClick={handleGoToTop}
          />
        </div>
      )}
    </>
  );
}
