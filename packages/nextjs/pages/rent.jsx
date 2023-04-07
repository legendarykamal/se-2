import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import cardBackground from "../components/rent/cardbg.png";
import cardImage from "../components/rent/cardimg.png";
// import cardAvatar from "../public/assets/card-avatar.png";
import styles from '../styles/rent.module.css';

export default function Rent() {
  const [cardTransform, setCardTransform] = useState("");
  const [gradientAngle, setGradientAngle] = useState(45);
  const [shineX, setShineX] = useState(0);
  const [shineY, setShineY] = useState(0);

  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMoveCard = (e ) => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (rect.width / 2 - (e.clientX - rect.left)) / -20;
      const y = (rect.height / 2 - (e.clientY - rect.top)) / -20;
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      setCardTransform(`rotateY(${x}deg) rotateX(${y}deg)`);
      setGradientAngle(angle);
      setShineX(e.clientX - rect.left);
      setShineY(e.clientY - rect.top);
    };

    const handleMouseLeaveCard = () => {
      setCardTransform("");
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener("mousemove", handleMouseMoveCard);
      cardElement.addEventListener("mouseleave", handleMouseLeaveCard);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener("mousemove", handleMouseMoveCard);
        cardElement.removeEventListener("mouseleave", handleMouseLeaveCard);
      }
    };
  }, []);

  return (
    <AppContainer className={styles.container}>
      <Card
        ref={cardRef}
        cardTransform={cardTransform}
        gradientAngle={gradientAngle}
        shineX={shineX}
        shineY={shineY}
      >
        <CardImageOutline gradientAngle={gradientAngle} />
        <CardImage src={cardImage} alt="Card Image" />
        <CardTitle>Build beautiful apps with GPT4 and Midjourney</CardTitle>
        <Divider gradientAngle={gradientAngle} />
        <CardSubtitle>40 sections - 5 hours</CardSubtitle>
        <CardText>
          rent
        </CardText>
        <Author>
          {/* <AuthorAvatar alt="Author Avatar" gradientAngle={gradientAngle} /> */}
          <AuthorName>by</AuthorName>
        </Author>
      </Card>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2d2d2d;
  background-image: url(${cardBackground});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0px;
  padding: 0px;
  perspective: 1000px;

  * {
    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
`;

const Card = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  background-image: radial-gradient(
    circle at ${(props) => props.shineX}px ${(props) => props.shineY}px,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 40%,
    transparent 70%
  );
  color: #eee;
  border-radius: 10px;
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.1), 0px 30px 60px rgba(0, 0, 0, 0.5);
  max-width: 300px;
  backdrop-filter: blur(10px);
  padding: 20px;
  transform: ${(props) => props.cardTransform};

  transform-style: preserve-3d;
  backface-visibility: hidden;

  ::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 1px;
    background: linear-gradient(
      ${(props) => props.gradientAngle}deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(0, 0, 0, 0.5) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    filter: blur(1px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardImageOutline = styled.div`
  width: 302px;
  height: 302px;
  position: absolute;
  ::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 1px;
    background: linear-gradient(
      ${(props) => props.gradientAngle}deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(255, 255, 255, 0.7) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    background-blend-mode: overlay;
  }
`;

const CardTitle = styled.h3`
  font-style: normal;
  font-weight: 590;
  font-size: 17px;
  line-height: 20px;
  margin: 10px 0;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.5) ${(props) => props.gradientAngle}%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const CardSubtitle = styled.h4`
  font-style: normal;
  font-weight: 510;
  font-size: 15px;
  line-height: 18px;
  margin: 10px 0;
  color: rgba(255, 255, 255, 0.8);
`;

const CardText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.7);
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  position: relative;
`;

// const AuthorAvatar = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 10px;
//   background: url(${cardAvatar});
//   background-size: 40px 40px;
//   ::before {
//     content: "";
//     position: absolute;
//     width: 40px;
//     height: 40px;
//     inset: 0;
//     border-radius: 50%;
//     padding: 1px;
//     background: linear-gradient(
//       ${(props) => props.gradientAngle}deg,
//       rgba(255, 255, 255, 0.1) 0%,
//       rgba(0, 0, 0, 0.5) 50%,
//       rgba(255, 255, 255, 0.7) 100%
//     );
//     -webkit-mask: linear-gradient(#fff 0 0) content-box,
//       linear-gradient(#fff 0 0);
//     -webkit-mask-composite: xor;
//     mask-composite: exclude;
//     background-blend-mode: overlay;
//   }
// `;

const AuthorName = styled.span`
  font-style: normal;
  font-weight: 510;
  font-size: 13px;
  line-height: 16px;

  color: rgba(255, 255, 255, 0.8);
`;
