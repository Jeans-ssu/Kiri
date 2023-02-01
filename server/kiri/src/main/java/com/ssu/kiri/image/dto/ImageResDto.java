package com.ssu.kiri.image.dto;

import com.ssu.kiri.image.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@AllArgsConstructor
public class ImageResDto {

  private String origFileName;
  private String filePath;

//    private Long image_id;
//    private String imgUrl; // file path
//
//
//    public ImageResDto(Image image) {
//        this.image_id = image.getId();
//        this.imgUrl = image.getImgUrl();
//    }

}
