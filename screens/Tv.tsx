import React from "react";
import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList, { HListSeparator } from "../components/HList";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayIsRefetching,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topIsRefetching,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingIsRefetching,
  } = useQuery(["tv", "trending"], tvApi.trending);
  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };
  console.log(Object.values(todayData.results[0]).map((v) => typeof v));
  const loading = todayLoading || topLoading || trendingLoading;
  const refreshing =
    todayIsRefetching || topIsRefetching || trendingIsRefetching;
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title={"Trending TV"} data={trendingData.results} />
      <HList title={"Airing Today"} data={todayData.results} />
      <HList title={"Top Rated TV"} data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
