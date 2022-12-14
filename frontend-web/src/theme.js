// 576 미만(xs), 576이상(sm), 768이상(md), 992이상(lg), 1200이상(xl), 1400이상(xxl)
const size = {
  mobile: "650px",
  tablet: "992px",
};

const theme = {
  // 반응형
  mobile: `(max-width:${size.mobile})`,
  tablet: `(max-width:${size.tablet})`,

  // 폰트
  titleFont: "UhBeeJJIBBABBA", // 제목 폰트
  questionFont: "KyoboHand", // 아이에게 하고 싶은 말 폰트
  namingFont: "Katuri", // 아이 이름, 로그인 화면 안내말 폰트
  standardFont: "GmarketSansMedium", // 가이드 폰트
  formFont: "GothicA1-Regular", // 폼(로그인 등) 폰트
  pretendard: "Pretendard-Regular", // pretendard font
  cafe24: "Cafe24Simplehae",

  // color
  yellowColor: "#F6EABD",
  // grayColor: "#dcdde1",
  grayColor: "#e2e2e2",
  whiteColor: "#F5F5F5",
};

export default theme;
