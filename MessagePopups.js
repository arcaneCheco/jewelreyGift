import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

export const MessagePopups = () => {
  return (
    <Wrapper>
      <UnitElement position={[15, 25]} />
      <UnitElement position={[50, 10]} />
      <UnitElement position={[65, 45]} />
      {/* <button onClick={fetchData} style={{ pointerEvents: "all" }}>
        MAKE REQUEST
      </button> */}
    </Wrapper>
  );
};

let compliments = [
  "Wow, so pretty!",
  "Elevenlike",
  "Warm as sunshine",
  "More beautiful than a Sindarin Queen",
  "Very very smart",
  "Eyes, more captivating than the moon",
  "Your smile is like an image of apotheosis",
  "Gentle as a summer breeze",
];

let usedCompliments = [];

const getRand = () => Math.floor(Math.random() * compliments.length);

const UnitElement = ({ position }) => {
  const [isActve, setIsActive] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isActve) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 4500);
      setTimeout(() => {
        const index = getRand();
        const [compl] = compliments.splice(index, 1);
        usedCompliments.push(compl);
        setMessage(compl);
        if (compliments.length === 0) {
          compliments = [...usedCompliments];
          usedCompliments = [];
        }

        setIsActive(true);
      }, 8000);
    }
  }, [isActve]);

  useEffect(() => {
    const index = getRand();
    const [compl] = compliments.splice(index, 1);
    usedCompliments.push(compl);
    setMessage(compl);
  }, []);

  const clickHandler = () => {
    setIsActive(false);
  };

  return (
    <Unit $position={position}>
      <Message $showMessage={showMessage}>{message}</Message>
      <Button onClick={clickHandler} $active={isActve} />
    </Unit>
  );
};

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 5;
  justify-content: center;
`;

const breatheAnimation = keyframes`
 0% { background-color: #B2000033; box-shadow: 0 0 3px #B20000; }
  50% { background-color: #FF000033; box-shadow: 0 0 40px #FF0000; }
  100% { background-color: #B2000033; box-shadow: 0 0 3px #B20000; }
`;

const Unit = styled.div`
  height: 60px;
  position: absolute;
  top: ${({ $position }) => $position[0]}%;
  left: ${({ $position }) => $position[1]}%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  color: white;
  text-shadow: 2px 2px #000000bb;
  font-size: 25px;
  z-index: 1;
  position: absolute;
  text-align: center;
  font-weight: bolder;
  /* white-space: nowrap; */
  width: 200px;
  transform: ${({ $showMessage }) =>
    $showMessage ? "translate(0, 0)" : "translate(0,10px)"};
  opacity: ${({ $showMessage }) => ($showMessage ? "1" : "0")};
  filter: ${({ $showMessage }) => ($showMessage ? "blur(0)" : "blur(4px)")};
  transition: opacity 1s, filter 1.5s 300ms, transform 1s;
`;

const Button = styled.button`
  background-color: #004a7f66;
  border-radius: 50%;
  border: none;
  width: 100%;
  height: 100%;
  text-decoration: none;
  position: absolute;
  pointer-events: all;
  transform: ${(props) => (props.$active ? "scale(1)" : "scale(0)")};
  transition: transform 0.3s ease-in;
  animation: ${breatheAnimation} 1500ms infinite;
`;
