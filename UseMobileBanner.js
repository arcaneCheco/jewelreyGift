import { useState, useEffect } from "react";
import styled from "styled-components";

export const UseMobileBanner = () => {
  return (
    <Wrapper>
      <P>Open site on iPhone</P>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const P = styled.p`
  color: white;
  font-size: 30px;
`;
