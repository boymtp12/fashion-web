import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import about from "../assets/about_video.mp4";
import about_img from "../assets/about.jpg";
const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <video autoPlay muted loop>
          <source src={about} type="video/mp4" />
        </video>
        {/* <img src="about" alt="" /> */}
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident
            laboriosam rem cupiditate repudiandae, rerum veniam autem fuga
            mollitia culpa modi ipsa dolore est ipsum neque laborum iure libero
            a quibusdam quas perferendis! Fugiat nesciunt mollitia, facere, quia
            minus enim accusamus minima optio quis adipisci eveniet ipsa
            excepturi libero nihil natus.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  video {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default AboutPage;
