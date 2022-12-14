import { Wrapper } from "./styles";
import styled from "styled-components";

import MainCarousel from "../../components/Main/MainCarousel";
import AnswerModal from "../../components/Childern/AnswerModal";
import Loading from "../../components/Loading/Loading";

import axios from "axios";
import drf from "../../api/drf";
import { storage } from "../../api/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  MemberID,
  CurrentSlide,
  ChildrenList,
  AnswerList,
  IsLoading,
  ImgURLs,
} from "../../atom";
import ImageModal from "../../components/Childern/ImageModal";
import Chat from "../Chat/chat";
import { io } from "socket.io-client";

// scroll button styles
const ScrollBtn = styled.div`
  :hover {
    cursor: pointer;
  }
`;
// box styles(flex, grid)
const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FlexReflex = styled.div`
  display: flex;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;
const CarouselGrid = styled.div`
  display: grid;
  grid-template-rows: 8fr 1fr;
  @media ${(props) => props.theme.mobile} {
    grid-template-rows: 4fr 1fr;
  }
`;
const ChildBtn = styled.button`
  margin: min(1vw, 5px);
  padding: min(1vw, 5px) min(2vw, 16px);
  font-size: min(2vw, 16px);
  font-family: ${(props) => props.theme.pretendard};
  background-color: ${(props) => props.theme.whiteColor};
  box-shadow: 3px 3px 3px gray;
  border: none;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`;
// conversation styles
const ConversBtn = styled.button`
  font-size: min(5vw, 16px);
  font-family: ${(props) => props.theme.pretendard};
  text-decoration: underline;
  padding: 0;
  border: none;
  background-color: ${(props) => props.theme.grayColor};
  :hover {
    cursor: pointer;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: min(2vw, 16px);
  }
`;
const ConversText = styled.div`
  font-family: ${(props) => props.theme.pretendard};
  @media ${(props) => props.theme.mobile} {
    font-size: min(2vw, 16px);
  }
`;
const Icon = styled.i`
  margin: 0 3rem;
  color: white;
  font-size: min(4vw, 3rem);
  :hover {
    cursor: pointer;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0 4vw;
  }
`;
const GridTitle = styled.span`
  font-family: ${(props) => props.theme.namingFont};
  /* font-weight: bold; */
  font-size: min(3vw, 1.5rem);
`;
const LinkTag = styled(Link)`
  font-family: ${(props) => props.theme.pretendard};
`;

// ????????????
// const socket = io.connect("http://3.35.238.205:4000");

const socket = io.connect("https://i7d208.p.ssafy.io:4000");
function Main() {
  // page scroll button
  const pageTop = {
    position: "fixed",
    bottom: "60px",
    right: "30px",
    width: "20px",
    height: "40px",
    borderRadius: "50%",
    color: "#cbc8c8",
    zIndex: "1",
  };
  const pageBottom = {
    position: "fixed",
    bottom: "40px",
    right: "30px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    color: "#cbc8c8",
    zIndex: "1",
  };
  function moveToTop() {
    document.body.scrollIntoView({ behavior: "smooth" });
  }
  function moveToBottom() {
    document.body.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  const setMemberID = useSetRecoilState(MemberID);
  const [childrens, setChildrens] = useRecoilState(ChildrenList);
  const [answerList, setAnswerList] = useRecoilState(AnswerList);
  const [currentSlide, setCurrentSlide] = useRecoilState(CurrentSlide);
  const [isLoading, setIsLoading] = useRecoilState(IsLoading);
  const [imgURLs, setImgURLs] = useRecoilState(ImgURLs);

  // ????????? ????????? ??? ????????? ?????? ????????? ????????????.
  // ??? ??????????????? ?????? ?????????????????? ?????? ????????? ??????ID??? ????????????
  // ????????? ???????????? ?????? ????????? ?????? ???????????? ????????????

  useEffect(() => {
    axios({
      url: drf.member.member(),
      method: "get",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }).then((res) => {
      setMemberID(res.data.memberID);
      setAnswerList(res.data.childrens[currentSlide]?.answers);
      setChildrens([...res.data.childrens, { childrenID: 0, name: "??????" }]);

      // ?????? ????????????
      console.log(res.data.memberID);

      socket.on("connect", function () {
        console.log("?????? ??????" + res.data.memberID);
        const name = { memberID: res.data.memberID };
        socket.emit("newUser", name);
      });
      console.log(socket);

      // firebase (image list)
      setImgURLs([]);
      const listRef = ref(
        storage,
        `captureImages/${res.data.childrens[currentSlide].childrenID}`
      );
      listAll(listRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(ref(storage, item.fullPath)).then((url) => {
            setImgURLs((val) => [...val, url]);
          });
        });
      });
    });
  }, []);

  const childrenID = childrens[currentSlide]?.childrenID;

  // main carousel prev, next button
  const total = childrens.length;
  function goNext() {
    if (currentSlide + 1 < total) {
      setAnswerList(childrens[currentSlide + 1].answers);
      setCurrentSlide((val) => val + 1);

      // firebase (image list)
      setImgURLs([]);
      const listRef = ref(
        storage,
        `captureImages/${childrens[currentSlide + 1].childrenID}`
      );
      listAll(listRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(ref(storage, item.fullPath)).then((url) => {
            setImgURLs((val) => [...val, url]);
          });
        });
      });
    }
  }
  function goPrev() {
    if (currentSlide > 0) {
      setAnswerList(childrens[currentSlide - 1].answers);
      setCurrentSlide((val) => val - 1);

      // firebase (image list)
      setImgURLs([]);
      const listRef = ref(
        storage,
        `captureImages/${childrens[currentSlide - 1].childrenID}`
      );
      listAll(listRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(ref(storage, item.fullPath)).then((url) => {
            setImgURLs((val) => [...val, url]);
          });
        });
      });
    }
  }

  // ?????? ????????????
  function deleteChildren(childrenID) {
    if (window.confirm("?????? ?????????????????????????")) {
      const newChildrenList = [];
      childrens.map((child) => {
        if (child.childrenID !== childrenID) {
          newChildrenList.push(child);
        }
      });
      updateChildrens(newChildrenList);
      updateAnswerList(newChildrenList);
    }
  }

  // ?????? ?????? ??? childrenList ????????????
  function updateChildrens(newChildrenList) {
    axios({
      url: drf.children.children(childrenID),
      method: "delete",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        setChildrens(newChildrenList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ?????? ?????? ??? answerList ????????????
  // main page?????? ???????????? ?????? "???????????? ???????????? ???"??? ????????? ??????
  function updateAnswerList(newChildrenList) {
    const newAnswerList = [];
    newChildrenList.forEach((child) => {
      if (
        child.childrenID === newChildrenList[currentSlide].childrenID &&
        newChildrenList[currentSlide].childrenID !== 0
      ) {
        const answers = child.answers ? child.answers : null;
        newAnswerList.push(...answers);
      }
    });
    setAnswerList(newAnswerList);
  }

  // ?????? ????????????
  function deleteAnswer(answerID) {
    const newAnswerList = [];
    answerList.map((answer) => {
      if (answer.answerID !== answerID) {
        newAnswerList.push(answer);
      }
    });
    axios({
      url: drf.answer.updateAnswer(answerID),
      method: "delete",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        setAnswerList(newAnswerList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Conversation: modal(for answer updating) code
  const [close, setClose] = useState(false); // ????????? ?????? ??????
  const [num, setNum] = useState();

  function updateAnswer(idx) {
    setNum(idx);
    setClose(!close);
  }

  // Picture: modal(for detail image & download image) code
  const [closeImg, setCloseImg] = useState(false);
  const [imgNum, setImgNum] = useState();
  function detailImg(idx) {
    setImgNum(idx);
    setCloseImg(!close);
  }

  return (
    <>
      {/* { isLoading ? <Loading></Loading> : null} */}
      <Wrapper>
        <div className="head">
          <CarouselGrid>
            <FlexRow style={{ marginTop: "2vw" }}>
              {childrens.length !== 1 && currentSlide !== 0 ? (
                <Icon
                  onClick={goPrev}
                  className="fa-solid fa-chevron-left"
                ></Icon>
              ) : (
                <Icon
                  onClick={goPrev}
                  className="fa-solid fa-chevron-left"
                  style={{ visibility: "hidden" }}
                ></Icon>
              )}
              <MainCarousel />
              {childrens.length !== 1 &&
              childrens[currentSlide]?.childrenID !== 0 ? (
                <Icon
                  onClick={goNext}
                  className="fa-solid fa-chevron-right"
                ></Icon>
              ) : (
                <Icon
                  onClick={goNext}
                  className="fa-solid fa-chevron-right"
                  style={{ visibility: "hidden" }}
                ></Icon>
              )}
            </FlexRow>
            <FlexRow>
              {childrenID ? (
                <Link to={`/UpdateChildren/${childrenID}`}>
                  <ChildBtn>??????</ChildBtn>
                </Link>
              ) : (
                <Link
                  to={`/UpdateChildren/${childrenID}`}
                  style={{ visibility: "hidden" }}
                >
                  <ChildBtn>??????</ChildBtn>
                </Link>
              )}
              {childrenID ? (
                <ChildBtn onClick={() => deleteChildren(childrenID)}>
                  ??????
                </ChildBtn>
              ) : (
                <ChildBtn
                  onClick={() => deleteChildren(childrenID)}
                  style={{ visibility: "hidden" }}
                >
                  ??????
                </ChildBtn>
              )}
            </FlexRow>
          </CarouselGrid>
        </div>
        <div className="body">
          {/* conversation part */}
          <div className="body_grid">
            <FlexRow style={{ justifyContent: "space-between" }}>
              <GridTitle>
                {childrens[currentSlide]
                  ? childrens?.[currentSlide].name
                  : "??????"}
                ?????? ??????????????? ???
              </GridTitle>
              {childrenID ? (
                <button className="plusBtn">
                  <Link
                    to={`/CreateAnswer/${childrenID}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    ????????????
                  </Link>
                </button>
              ) : null}
            </FlexRow>
            <div className="body_conversation">
              {answerList
                ? answerList.map((answer, idx) => {
                    return (
                      <div key={answer.answerID}>
                        <FlexReflex
                          style={{
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <ConversText>{answer.content}</ConversText>
                          <FlexRow
                            style={{
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <ConversText style={{ marginBottom: "1vw" }}>
                              {answer.createdAt}
                            </ConversText>
                            <FlexRow>
                              <ConversBtn
                                style={{
                                  marginLeft: "1rem",
                                  marginBottom: "1vw",
                                }}
                                onClick={() => updateAnswer(idx)}
                              >
                                ??????
                              </ConversBtn>
                              <ConversBtn
                                style={{
                                  marginLeft: "0.5rem",
                                  marginBottom: "1vw",
                                }}
                                onClick={() =>
                                  deleteAnswer(
                                    answer.answerID,
                                    answer.questionID
                                  )
                                }
                              >
                                ??????
                              </ConversBtn>
                              {close && num === idx && (
                                <AnswerModal
                                  answer={answer}
                                  setClose={setClose}
                                  closeModal={() => setClose(!close)}
                                />
                              )}
                            </FlexRow>
                          </FlexRow>
                        </FlexReflex>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          {/* picture part */}
          <div className="body_grid" style={{ position: "relative" }}>
            <FlexRow style={{ justifyContent: "space-between" }}>
              <GridTitle>
                {childrens[currentSlide]
                  ? childrens?.[currentSlide].name
                  : "??????"}
                ??? ????????? ??????
              </GridTitle>
            </FlexRow>
            <div className="body_picture">
              <span
                style={{
                  position: "absolute",
                  width: "1rem",
                  left: "0",
                  height: "70%",
                  backgroundColor: "#e2e2e2",
                }}
              ></span>
              {imgURLs.map((imgURL, idx) => {
                return (
                  <>
                    <img
                      key={idx}
                      src={imgURL}
                      className="picture_img"
                      onClick={() => detailImg(idx)}
                    ></img>
                    {closeImg && imgNum === idx && (
                      <ImageModal
                        imgURL={imgURLs[idx]}
                        setCloseImg={setCloseImg}
                        closeModal={() => setCloseImg(!closeImg)}
                      />
                    )}
                  </>
                );
              })}
              {/* <span style={{position: "absolute", width: "1rem", right: "0", height: "70%", backgroundColor: "#e2e2e2"}}></span> */}
            </div>
          </div>
        </div>
        <FlexRow style={{ margin: "1rem", justifyContent: "flex-end" }}>
          <LinkTag
            style={{
              fontSize: "min(2vw, 16px)",
              color: "gray",
              margin: "0 1rem 0 0",
            }}
            to="/updateMember"
          >
            ???????????? ??????
          </LinkTag>
          <LinkTag
            style={{ fontSize: "min(2vw, 16px)", color: "gray" }}
            to="/signout"
          >
            ?????? ??????
          </LinkTag>
        </FlexRow>
      </Wrapper>
      {/* scroll button */}
      <div>
        <ScrollBtn>
          <i
            onClick={moveToTop}
            className="fa-solid fa-circle-chevron-up fa-2xl"
            style={pageTop}
          ></i>
        </ScrollBtn>
        <ScrollBtn>
          <i
            onClick={moveToBottom}
            className="fa-solid fa-circle-chevron-down fa-2xl"
            style={pageBottom}
          ></i>
        </ScrollBtn>
      </div>
      <Chat id={8} socket={socket}></Chat>
    </>
  );
}

export default Main;
