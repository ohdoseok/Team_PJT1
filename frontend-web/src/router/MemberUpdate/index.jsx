import Wrapper from "./styles";

import styled from "styled-components";
import SignupForm from "../../components/Member/SignUpForm";
import { useEffect, useState } from "react";
import axios from "axios";
import drf from "../../api/drf";
import { useRecoilState } from "recoil";
import { MemberId, UserInfo } from "../../atom";


const Box = styled.div`
  height: 700px;
  width: 600px;
`

function MemberUpdate() {
  const [currentUser, setCurrentUser] = useState();

  // if don't use the conditional statement, it errors
  const [name, setName] = useState(currentUser ? currentUser.data.name : '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser ? currentUser.data.phoneNumber : '');
  const isUpdate = true;
  const [memberId, setMemberId] = useState(currentUser ? currentUser.data.memberId : null);
  
  useEffect( () => {
    axios(
      {
        url: drf.member.member(),
        method: 'get',
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
      })
      .then(res => {
        setCurrentUser(res)
        setName(res.data.name)
        setPhoneNumber(res.data.phoneNumber)
        setMemberId(res.data.memberId)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])

  return (
    <Box>
      <Wrapper>
        <div className="title">
          <h3>회원정보 수정</h3>
        </div>
        <SignupForm
          name={name} setName={setName}
          phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
          isUpdate={isUpdate}
          memberId={memberId}
        />
      </Wrapper>
    </Box>
  );
}
export default MemberUpdate;
