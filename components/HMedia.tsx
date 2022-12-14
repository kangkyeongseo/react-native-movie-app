import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Vote from "./Vote";

const Media = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Name = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin: 10px 0px;
`;

const OverView = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  width: 80%;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  return (
    <Media>
      <Poster path={posterPath} />
      <HColumn>
        <Name>{originalTitle}</Name>
        {releaseDate ? (
          <Release>
            {new Date(releaseDate).toLocaleDateString("ko", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Release>
        ) : null}
        {voteAverage ? <Vote average={voteAverage} /> : null}
        <OverView>
          {overview !== "" && overview.length > 140
            ? `${overview.slice(0, 140)}...`
            : overview}
        </OverView>
      </HColumn>
    </Media>
  );
};

export default HMedia;