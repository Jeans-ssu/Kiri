package com.ssu.kiri.image.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class imageReqDto {
    private Long member_id;
    private String filename;
    private String imgUrl;

}
