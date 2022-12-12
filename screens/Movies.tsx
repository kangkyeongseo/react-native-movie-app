import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "9520e45017ba3d61c3cbf0b7230ba3f7";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView``;

const ListTitle = styled.Text`
  margin-left: 30px;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20;
`;

const Movie = styled.View`
  margin-right: 15;
  align-items: center;
`;

const Name = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Vote = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const OverView = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin: 10px 0px;
`;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      )
    ).json();
    setTrendingMovies(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpComingMovies(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlayingMovies(results);
    setLoading(false);
  };
  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        {nowPlayingMovies.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trendingMovies.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Name>
                {movie.original_title.length > 13
                  ? `${movie.original_title.slice(0, 12)}...`
                  : movie.original_title}
              </Name>
              <Vote>
                {movie.vote_average > 0
                  ? `⭐️${Math.round(movie.vote_average)}/10`
                  : "Coming Soon"}
              </Vote>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListContainer>
        <CommingSoonTitle>Coming Soon</CommingSoonTitle>
        {upComingMovies.map((movie) => (
          <HMovie key={movie.id}>
            <Poster path={movie.poster_path} />
            <HColumn>
              <Name>{movie.original_title}</Name>
              <Release>
                {new Date(movie.release_date).toLocaleDateString("ko", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Release>
              <OverView>
                {movie.overview !== "" && movie.overview.length > 140
                  ? `${movie.overview.slice(0, 140)}...`
                  : movie.overview}
              </OverView>
            </HColumn>
          </HMovie>
        ))}
      </ListContainer>
    </ScrollView>
  );
};
export default Movies;
