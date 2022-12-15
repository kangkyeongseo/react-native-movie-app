import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesApi } from "../api";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  margin-left: 30px;
  margin-bottom: 30px;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const CommingSoonTitle = styled(ListTitle)``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation,
}) => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: nowPlayingIsRefetching,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: upcomingIsRefetching,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingIsRefetching,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const VSeparator = styled.View`
    width: 20px;
  `;
  const HSeparator = styled.View`
    height: 30px;
  `;

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    nowPlayingIsRefetching || upcomingIsRefetching || trendingIsRefetching;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={4}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData ? (
              <FlatList
                data={trendingData.results}
                horizontal={true}
                keyExtractor={(item) => item.id + ""}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                ItemSeparatorComponent={VSeparator}
                renderItem={({ item }) => (
                  <VMedia
                    posterPath={item.poster_path || ""}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                  />
                )}
              />
            ) : null}
          </ListContainer>
          <CommingSoonTitle>Coming Soon</CommingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  ) : null;
};
export default Movies;
