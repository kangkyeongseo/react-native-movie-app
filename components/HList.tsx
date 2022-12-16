import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Movie, Tv } from "../api";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  margin-left: 30px;
  margin-bottom: 30px;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: Movie[] | Tv[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      ItemSeparatorComponent={HListSeparator}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path || ""}
          originalTitle={
            "original_title" in item ? item.original_title : item.original_name
          }
          voteAverage={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HList;
