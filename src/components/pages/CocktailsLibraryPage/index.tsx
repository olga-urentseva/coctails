import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import getCocktailByName from "../../../api/getCocktailByName";
import { CocktailByName } from "../../../types/CocktailByName";

import CocktailCard from "../../atoms/CocktailCard";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import SearchForm from "../../atoms/SearchIcon";
import Layout from "../../templates/Layout";

const FormWrapper = styled.div`
  margin-bottom: 2em;
`;

const CocktailCardsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  grid-auto-rows: max-content;
`;

export const CocktailsLibraryLoader = async ({
  request,
}: {
  request: Request;
}) => {
  const url = new URL(request.url);
  const searchParam = url.searchParams.get("name");
  if (!searchParam) {
    return getCocktailByName("A");
  }
  return getCocktailByName(searchParam);
};

export default function CocktailsLibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const fromURL = searchParams.get("name")?.replaceAll(",", ", ") || "";

  console.log(fromURL);

  const cocktailsData = useLoaderData() as CocktailByName;
  const { state } = useNavigation();

  function setNameToURL(name: string) {
    setSearchParams(name ? { name: name.toLocaleLowerCase() } : {});
  }

  function onSubmit(inputValue: string) {
    const handler = setTimeout(() => {
      const name = inputValue
        .split(",")
        .map((i) => i.trim().replace(/\s+/, "_"))
        .filter((i) => i.length > 0)
        .join(",");

      setNameToURL(name);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }

  const cocktails = cocktailsData?.drinks?.map((drink) => {
    return (
      <CocktailCard
        cocktailName={drink.strDrink}
        picture={drink.strDrinkThumb}
        id={drink.idDrink}
        key={drink.idDrink}
        highlight={fromURL}
      />
    );
  });

  return (
    <Layout>
      <FormWrapper>
        <SearchForm
          onFormSubmit={onSubmit}
          title="Cocktail name"
          items={fromURL}
        />
      </FormWrapper>
      {state === "loading" ? (
        <Loader />
      ) : cocktails?.length > 0 ? (
        <CocktailCardsWrapper>{cocktails}</CocktailCardsWrapper>
      ) : (
        <ErrorMessage>
          There are no cocktails with this name &#128557;
        </ErrorMessage>
      )}
    </Layout>
  );
}
