import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation,
}) => (
  <Btn onPress={() => navigation.navigate("Stack", { screen: "Three" })}>
    <Text>Movies</Text>
  </Btn>
);

export default Movies;
