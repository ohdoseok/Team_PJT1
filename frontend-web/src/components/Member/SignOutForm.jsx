import styled from "styled-components";

import axios from "axios";
import drf from "../../api/drf";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Token } from "../../atom";


const ButtonWrap = styled.div``;

const Form = styled.form`
  width: 95%;
  max-width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%; // 버튼 추가시 수정 필요
  font-family: ${(props) => props.theme.namingFont};
  div {
    display: grid;
    grid-template-columns: minmax(90px, 1fr) 10fr;
    margin: 10px;
    gap: 10px;
    label {
      text-align: right;
      line-height: 40px;
    }
    input {
      background-color: ${(props) => props.theme.yellowColor};
      height: 40px;
      background: linear-gradient(
        ${(props) => props.theme.yellowColor},
        ${(props) => props.theme.grayColor}
      );
      border: ${(props) => props.theme.yellowColor} 1px solid;
    }
  }
  ${ButtonWrap} {
    position: relative;
    display: flex;
    justify-content: flex-end;
    width: 95%;
    margin-right: 0px;
    button {
      font-family: ${(props) => props.theme.namingFont};
      width: 80px;
      height: 25px;
      :hover {
        cursor: pointer;
      }
    }
  }
`;

function SignOutForm() {
  const [ currentUser, setCurrentUser ] = useState();
  const setToken = useSetRecoilState(Token);
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: drf.member.member(),
      method: 'get',
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
    })
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => { console.log(err) })
    }, [])

  
  function onSubmit(data) {
    if (data.password === currentUser.data.password) {
      if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
        axios ({
            url: drf.member.deleteMember(currentUser.data.memberID),
            method: "delete",
            headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
          }).then((res) => {
          })
          removeToken()
          navigate('/')
        }
    }
    else {
      alert("비밀번호가 틀렸습니다")
    }
  }

  function removeToken() {
    localStorage.removeItem("token")
    setToken("")
  }


  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} action="">
        <label htmlFor="password" style={{ marginRight: '1rem' }}>비밀번호를 입력해주세요</label>
        <input 
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
          type="password" />
        <ButtonWrap>
          <button>제출</button>
        </ButtonWrap>
      </Form>
    </div>
  )
}

export default SignOutForm;