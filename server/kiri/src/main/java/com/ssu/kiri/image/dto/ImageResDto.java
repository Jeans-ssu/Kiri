package com.ssu.kiri.image.dto;

import com.ssu.kiri.image.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageResDto {

  private Long image_id;
  private String imgUrl;


  public static ImageResDto of(Image image) {
    return new ImageResDto(image.getId(), image.getImgUrl());
  }

}
