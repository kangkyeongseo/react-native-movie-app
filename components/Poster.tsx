import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Img = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

interface PosterProps {
  posterPath: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <Img source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
