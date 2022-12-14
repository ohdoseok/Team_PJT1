import styled from "styled-components";

export const Wrapper = styled.div`
  background-image: url("img/background/pink.jpg");
  background-size: cover;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(380px, 1fr) 3fr;
  @media ${props => props.theme.mobile} {
    grid-gap: 20px;
    grid-template-rows: minmax(120px, 1fr) 3fr;
    }
  p {
    display: flex;
    font-size: min(3vw, 20px);
    align-items: center;
    height: 100%;
  }
  .head {
    width: 100%;
  }
  .body {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    width: 90%;
    height: 90%;
    max-width: 1000px;
    max-height: 800px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.whiteColor};
    box-shadow: 5px 5px 15px 0.5px #dcdde1;
    margin: 0 auto;
    padding: 20px 24px;
    @media ${props => props.theme.mobile} {
      max-height: 1000px;
    }
    .body_grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 6fr;
      max-height: 350px;
      @media ${props => props.theme.mobile} {
        max-height: 180px;
      }
    }
    .body_picture {
      overflow-x: scroll;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      padding: 1rem;
      border-radius: 5px;
      background-color: ${(props) => props.theme.grayColor};
      .picture_img {
        max-height: 100%;
        margin: 1vw;
        border-radius: 5px;
        :hover {
          cursor: pointer;
        }
      }
    }
    .body_conversation {
      overflow-y: scroll;
      width: 100%;
      height: 100%;
      padding: 1rem;
      border-radius: 5px;
      box-shadow: 0px 3px 3px 0.5px #1d1b1b52;
      background-color: ${(props) => props.theme.grayColor};
    }
  }
  .plusBtn {
    padding: 0.3vw 1vw;
    margin-left: 6px;
    font-size: min(2vw, 16px);
    background-color: #cde6d9;
    font-family: ${props => props.theme.pretendard};
    border: none;
    border-radius: 4vw;
    :hover {
      cursor: pointer;
    }
  }
`;
