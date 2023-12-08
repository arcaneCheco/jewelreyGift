import { useState, useEffect } from "react";
import styled from "styled-components";

export const UsePWABanner = () => {
  return (
    <Wrapper>
      <P>To Access Page</P>
      <Ol>
        <Li>Click Share Button</Li>
        <Li>Click "Add To Homescreen"</Li>
        <Li>Close safari and open{"\n"}site from Homescreen</Li>
      </Ol>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const P = styled.p`
  color: white;
  font-size: 30px;
  margin-bottom: 20px;
`;
const Li = styled.li`
  color: white;
  font-size: 25px;
  padding: 10px 0;
`;
const Ol = styled.ol`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  white-space: break-spaces;
`;
