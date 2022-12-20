import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList, { HListSeparator } from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayIsRefetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["tv", "today"], tvApi.airingToday, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
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
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = todayLoading || topLoading || trendingLoading;

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
      <HList
        title={"Airing Today"}
        data={todayData?.pages?.map((page) => page.results).flat()}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
      <HList title={"Top Rated TV"} data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
