import styled from "styled-components";
import "./styles/Modal.css"

import drf from "../../api/drf";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AnswerList } from "../../atom";

const ContentBox = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  justify-content: center;
  .title {
    font-size: min(3.5vw, 1.2rem);
    font-weight: bold;
    font-family: ${(props) => props.theme.questionFont};
    @media ${props => props.theme.mobile} {
      font-size: min(5vw, 3rem);
    }
  }
  .input {
    padding: 10px;
    width: 100%;
    background-color: ${(props) => props.theme.grayColor};
    height: 2.5rem;
    font-family: ${(props) => props.theme.namingFont};
    border: ${(props) => props.theme.grayColor} 1px solid;
    border-radius: 5px;
    margin-bottom: 1rem;
    @media ${props => props.theme.mobile} {
      height: 1.6rem;
    };
  }
  .button {
    padding: 0.3rem 0.8rem;
    font-family: ${(props) => props.theme.pretendard};
    float: right;
    margin-left: 6px;
    background-color: #cde6d9;
    border: none;
    border-radius: 4vw;
    :hover {
      cursor: pointer;
    }
  }
`


function AnswerModal (props) {
  const answer = props.answer;
  const [chat, setChat] = useState(answer.content);
  const answerID = useState(answer.answerID)[0];
  const [answerList, setAnswerList] = useRecoilState(AnswerList);
  const navigate = useNavigate();

  function closeModal () {
    props.closeModal();
  }

  function ChangeChat(event) {
    setChat(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    const newAnswerList = [];
    answerList.map((answer) => {
      if (answer.answerID === answerID) {
        const newChat = {
          answerID: answer.answerID,
          childrenID: answer.childrenID,
          content: chat,
          createdAt: answer.createdAt,
          isUsed: answer.isUsed,
          questionID: answer.questionID
        }
        newAnswerList.push(newChat);
      } else {
        newAnswerList.push(answer)
      }
    })
    axios({
      url: drf.answer.updateAnswer(answer.answerID),
        method: "put",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          answerID: answerID,
          content: chat.trim(),
          questionID: 1,
        }
      }).then((res) => {
        setAnswerList(newAnswerList)
        closeModal()
        navigate('/main')
      })
      .catch((err) => {
    })
  }

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(event) => event.stopPropagation()}>
        <ContentBox>
          <div className="title">???????????? ?????? ?????? ???????????????.</div>
          <br />
          <form>
            <input className="input" type="text" value={chat} onChange={ChangeChat} />
            <button className="button" onClick={onSubmit}>????????????</button>
          </form>
        </ContentBox>
        <button id="modalCloseBtn" onClick={closeModal}>??????</button>
      </div>
    </div>
  )
}

export default AnswerModal;