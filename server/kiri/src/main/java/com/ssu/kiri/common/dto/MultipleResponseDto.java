package com.ssu.kiri.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class MultipleResponseDto<T> {
    private List<T> data1;
    private List<T> data2;

    public MultipleResponseDto(List<T> data1, List<T> data2) {
        this.data1 = data1;
        this.data2 = data2;
    }
}
