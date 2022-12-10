import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const View = styled.View`
  flex: 1;
`;

const Bgimg = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 5px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.8)"};
`;

const Votes = styled(Overview)<{ isDark: boolean }>`
  margin-top: 5px;
  font-size: 12px;
  letter-spacing: 1.5px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View>
      <Bgimg
        source={{ uri: makeImgPath(backdropPath) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0 ? (
              <Votes isDark={isDark}>⭐️{voteAverage}/10</Votes>
            ) : null}
            <Overview isDark={isDark}>{overview.slice(0, 80)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
