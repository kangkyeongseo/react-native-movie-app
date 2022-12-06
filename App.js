import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { Image } from "react-native";

export default function App() {
  const [asset] = useAssets([require("./image.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  if (!asset || !loaded) {
    return <AppLoading />;
  }
  return null;
}
