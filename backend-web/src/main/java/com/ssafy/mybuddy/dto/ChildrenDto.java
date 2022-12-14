package com.ssafy.mybuddy.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Blob;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@ApiModel(value="ChildrenDto : 아이정보", description = "아이의 상세 정보를 나타낸다.")
public class ChildrenDto {
    @ApiModelProperty(value="아이 번호")
    private int childrenID;
    @ApiModelProperty(value="생년")
    private int birthYear;
    @ApiModelProperty(value="생월")
    private int birthMonth;
    @ApiModelProperty(value="생일")
    private int birthDay;
    @ApiModelProperty(value="아이 이름")
    private String name;
    @ApiModelProperty(value="아이 별명")
    private String nickname;
    @ApiModelProperty(value="입원일(YYYY-MM-DD)")
    private Date hospitalizationDay;
    @ApiModelProperty(value="회원 번호")
    private int memberID;
    @ApiModelProperty(value="IOT 방문 횟수")
    private int count;

    private List<AnswerDto> answers;

}
