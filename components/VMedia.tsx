import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Movie, Tv } from "../api";
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
  fullData: Movie | Tv;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();
  const goDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goDetail}>
      <Media>
        <Poster path={posterPath} />
        <Name>
          {originalTitle.length > 13
            ? `${originalTitle.slice(0, 12)}...`
            : originalTitle}
        </Name>
        <Vote average={voteAverage} />
      </Media>
    </TouchableOpacity>
  );
};

export default VMedia;
