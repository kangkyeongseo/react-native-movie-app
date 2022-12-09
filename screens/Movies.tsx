import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, StyleSheet, Text } from "react-native";
import { makeImgPath } from "../utils";

const API_KEY = "9520e45017ba3d61c3cbf0b7230ba3f7";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Bgimg = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`;

const Votes = styled(Overview)`
  margin-top: 5px;
  font-size: 12px;
  letter-spacing: 1.5px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlayingMovies(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={4}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlayingMovies.map((movie) => (
          <View key={movie.id}>
            <Bgimg
              source={{ uri: makeImgPath(movie.backdrop_path) }}
              blurRadius={80}
              style={StyleSheet.absoluteFill}
            />
            <Wrapper style={StyleSheet.absoluteFill}>
              <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
              <Column>
                <Title>{movie.original_title}</Title>
                <Overview>{movie.overview.slice(0, 80)}...</Overview>
                {movie.vote_average > 0 ? (
                  <Votes>⭐️{movie.vote_average}/10</Votes>
                ) : null}
              </Column>
            </Wrapper>
          </View>
        ))}
      </Swiper>
    </ScrollView>
  );
};
export default Movies;
