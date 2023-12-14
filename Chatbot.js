import { useState, useEffect, createRef } from "react";
import styled, { keyframes } from "styled-components";
import dogSrc from "./boinkDog.png";

const makeid = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

// const identity = makeid(10);

let hasOpenedChatWindow = false;

export const Chatbot = () => {
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const id = makeid(10);
    setIdentity(id);
    const t = async () => {
      const res = await fetch("https://jewelreyserver.onrender.com/start", {
        method: "POST",
        body: id,
      });
      console.log({ res });
    };
    t();
  }, []);

  const [isActve, setIsActive] = useState(false);

  const [logs, setLogs] = useState([]);

  const [userMessage, setUserMessage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasOpenedChatWindow && isActve) {
      hasOpenedChatWindow = true;
      const t = async () => {
        setLoading(true);

        const res = await fetch(
          "https://jewelreyserver.onrender.com/openChatWindow",
          {
            method: "POST",
            body: identity,
          }
        );

        setLoading(false);

        const t = await res.text();

        setLogs((prev) => {
          return [...prev, { message: t, bot: true }];
        });
      };
      t();
    }
  }, [isActve]);

  const onSubmitMessage = async () => {
    if (!userMessage.trim()) return;

    setLogs((prev) => {
      return [...prev, { message: userMessage, bot: false }];
    });

    setUserMessage("");

    setLoading(true);

    const res = await fetch("https://jewelreyserver.onrender.com", {
      method: "POST",
      body: JSON.stringify({
        id: identity,
        content: userMessage,
      }),
      headers: { "Content-Type": "text/plain" },
    });

    setLoading(false);

    const t = await res.text();

    setLogs((prev) => {
      return [...prev, { message: t, bot: true }];
    });
  };

  const logsRef = createRef();

  useEffect(() => {
    logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [logs.length, loading]);

  return (
    <Wrapper>
      <Button $active={isActve} onClick={() => setIsActive(true)}></Button>
      <ChatWindow $active={isActve}>
        <CloseButton onClick={() => setIsActive(false)}>X</CloseButton>
        <BoinkDog src={dogSrc} />
        <ChatArea>
          <Chatlog ref={logsRef}>
            {logs.map(({ message, bot }, index) => (
              <Bubble key={index} $bot={bot}>
                {message}
              </Bubble>
            ))}
            {loading && (
              <LoadingBubbleWrapper>
                <LoadingBubble />
              </LoadingBubbleWrapper>
            )}
          </Chatlog>
          <InputArea>
            <UserInput
              type={"text"}
              disabled={loading}
              value={userMessage}
              onChange={(ev) => {
                setUserMessage(ev.currentTarget.value);
              }}
            />
            <SendButton onClick={onSubmitMessage}>Send</SendButton>
          </InputArea>
        </ChatArea>
      </ChatWindow>
    </Wrapper>
  );
};

const LoadingBubbleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 22px 0;
  overflow: hidden;
  width: 90px;
`;

const dotPulseBefore = keyframes`
    0% { box-shadow: 9984px 0 0 -5px; }
    30% { box-shadow: 9984px 0 0 2px; }
    60%, 100% { box-shadow: 9984px 0 0 -5px; }
`;

const dotPulse = keyframes`
    0% { box-shadow: 9999px 0 0 -5px; }
    30% { box-shadow: 9999px 0 0 2px; }
    60%, 100% { box-shadow: 9999px 0 0 -5px; }
`;

const dotPulseAfter = keyframes`
        0% { box-shadow: 10014px 0 0 -5px; }
    30% { box-shadow: 10014px 0 0 2px; }
    60%, 100% { box-shadow: 10014px 0 0 -5px; }
`;

const LoadingBubble = styled.div`
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: white;
  color: white;
  box-shadow: 9999px 0 0 -5px;
  animation: ${dotPulse} 1.5s infinite linear;
  animation-delay: 0.25s;

  &::before,
  &:after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: white;
    color: white;
  }

  &:before {
    box-shadow: 9984px 0 0 -5px;
    animation: ${dotPulseBefore} 1.5s infinite linear;
    animation-delay: 0s;
  }

  &:after {
    box-shadow: 10014px 0 0 -5px;
    animation: ${dotPulseAfter} 1.5s infinite linear;
    animation-delay: 0.5s;
  }
`;

const Chatlog = styled.div`
  width: 100%;
  max-height: 100%;
  height: fit-content;
  border-top: 1px solid #ffffff99;
  border-bottom: 1px solid #ffffff99;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: scroll;
  padding: 15px 0;
  pointer-events: all;
`;

const Bubble = styled.p`
  padding: 6px 12px;
  max-width: 55%;
  width: fit-content;
  border-radius: 6px;
  background-color: ${({ $bot }) => ($bot ? "#1616ff" : "#38ad38")};
  align-self: ${({ $bot }) => ($bot ? "flex-start" : "flex-end")};
`;

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
`;

const UserInput = styled.input`
  height: 100%;
  width: 100%;
  padding-left: 10px;
`;

const SendButton = styled.button`
  width: 80px;
  height: 100%;
  color: white;
  background-color: #afafaf;
  text-decoration: none;
  border: none;
`;

const InputArea = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  display: flex;
  overflow-y: auto;
  gap: 10px;
`;

const ChatArea = styled.div`
  position: absolute;
  height: 100%;
  width: 60%;
  padding: 5%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 15px;
  color: white;
  text-shadow: 1px 1px #0a0a0a99;
  z-index: 10;
  pointer-events: all;
`;

const CloseButton = styled.button`
  text-decoration: none;
  height: 30px;
  width: 30px;
  right: 5%;
  top: 5%;
  background-color: #fbfbfbdd;
  border-radius: 50%;
  box-shadow: 2px 3px #000000aa;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: black;
  font-size: 14px;
`;

const BoinkDog = styled.img`
  position: absolute;
  height: 60%;
  right: 0;
  bottom: 0;
`;

const ChatWindow = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  pointer-events: all;
  background-color: #000000df;
  transform: ${(props) =>
    props.$active ? "translateY(0)" : "translateY(100%)"};
  transition: transform 0.5s;
  z-index: 6;
`;

const breatheAnimation = keyframes`
 0% { background-color: #00B20033; box-shadow: 0 0 3px #00B200; }
  50% { background-color: #00FF0033; box-shadow: 0 0 40px #00FF00; }
  100% { background-color: #00B20033; box-shadow: 0 0 3px #00B200; }
`;

const Button = styled.button`
  background-color: #004a7f66;
  border-radius: 50%;
  border: none;
  width: 70px;
  height: 70px;
  top: 65%;
  left: 70%;
  text-decoration: none;
  z-index: 5;
  position: absolute;
  pointer-events: all;
  transform: ${(props) => (props.$active ? "scale(0)" : "scale(1)")};
  transition: transform 0.3s 1s ease-in;
  animation: ${breatheAnimation} 1500ms infinite;
`;
