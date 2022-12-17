import React, { useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 20px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: movieIsLoading,
    data: movieData,
    refetch: searchMovie,
  } = useQuery(["searchMovies", query], moviesApi.search, { enabled: false });
  const {
    isLoading: tvIsLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, { enabled: false });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovie();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor={"gray"}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {movieIsLoading || tvIsLoading ? <Loader /> : null}
      {movieData ? (
        <HList title={"Movie Results"} data={movieData.results} />
      ) : null}
      {tvData ? <HList title={"Tv Results"} data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
