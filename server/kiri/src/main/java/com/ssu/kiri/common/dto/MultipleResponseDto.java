package com.ssu.kiri.common.dto;

import com.ssu.kiri.post.dto.response.DetailPost;
import com.ssu.kiri.post.dto.response.RecommendPost;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class MultipleResponseDto {
    private DetailPost data;
    private List<RecommendPost> dataList;

    public MultipleResponseDto(DetailPost data, List<RecommendPost> dataList) {
        this.data = data;
        this.dataList = dataList;
    }

}
