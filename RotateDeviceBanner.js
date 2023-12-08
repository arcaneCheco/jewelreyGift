import { useState, useEffect } from "react";
import styled from "styled-components";

export const RotateDeviceBanner = () => {
  return (
    <Wrapper>
      <P>Rotate Device</P>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: black;
  z-index: 11;
  justify-content: center;
`;

const P = styled.p`
  color: white;
  font-size: 30px;
`;
