import React from "react";
import styled from "styled-components/native";

const VoteAverage = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

interface VoteProp {
  average: number;
}

const Vote: React.FC<VoteProp> = ({ average }) => {
  return (
    <VoteAverage>
      {average > 0 ? `⭐️${Math.round(average)}/10` : "Coming Soon"}
    </VoteAverage>
  );
};

export default Vote;
