package com.ssafy.mybuddy.mapper;

import com.ssafy.mybuddy.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {
    int insertMember(MemberDto memberDto);
    MemberDto login(MemberDto memberDto);

    List<MemberDto> retrieveMember();

    int deleteMember(int memberID);

    int selectEmail(String email);

    MemberDto selectMember(int memberID);

    int updateMember(MemberDto memberDto);

    MemberDto selectMemberByEmail(String memberEmail);

    String selectEmailByChildrenId(int childrenID);
}
