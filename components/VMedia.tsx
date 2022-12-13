import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Vote from "./Vote";

const Media = styled.View`
  align-items: center;
`;

const Name = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  return (
    <Media>
      <Poster path={posterPath} />
      <Name>
        {originalTitle.length > 13
          ? `${originalTitle.slice(0, 12)}...`
          : originalTitle}
      </Name>
      <Vote average={voteAverage} />
    </Media>
  );
};

export default VMedia;
