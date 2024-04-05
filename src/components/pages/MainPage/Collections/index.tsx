import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { collectionIdsToShow } from "./collections-to-show";

import getCollections from "../../../../api/getCollections";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-auto-rows: 1fr;
`;

const Collection = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Description = styled.h4`
  color: ${(props) => props.theme.textInversion};
  margin: 0;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
`;

const Card = styled.div<{ imgUrl: string }>`
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  padding: 1rem;
  border-radius: 1em;
  transition: transform 0.3s ease-in-out;
  height: 100%;
  box-shadow: 0 0.5em 1.5em -0.8em ${(props) => props.theme.accentLight};

  &:hover,
  &:focus {
    transform: scale(1.05);

    ${Description} {
      opacity: 100%;
      transition-delay: 0.1s;
    }
  }
`;
const Title = styled.h3`
  font-size: 2em;
  margin: 0;
  text-decoration: none;
  color: ${(props) => props.theme.textInversion};
`;

function CollectionItem({
  title,
  imgUrl,
  to,
  description,
}: {
  title: string;
  imgUrl: string;
  to: string;
  description: string;
}) {
  return (
    <Collection>
      <StyledLink to={to}>
        <Card imgUrl={imgUrl}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Card>
      </StyledLink>
    </Collection>
  );
}

export async function loadCollectionPageData() {
  const result = await getCollections(collectionIdsToShow);
  return Promise.all(result);
}

export default function Collections({ ...otherProps }) {
  const collectionsData = useLoaderData() as Awaited<
    ReturnType<typeof getCollections>
  >;

  return (
    <Wrapper {...otherProps}>
      {collectionsData.length === 0 ? (
        <>nothing</>
      ) : (
        collectionsData.map((data) => (
          <CollectionItem
            key={data.id}
            title={data.collectionName}
            imgUrl={data.imageUrl}
            to={`/collections/${data.id}`}
            description={data.description}
          />
        ))
      )}
    </Wrapper>
  );
}
