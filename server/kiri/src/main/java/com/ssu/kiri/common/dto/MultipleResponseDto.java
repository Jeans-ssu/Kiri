package com.ssu.kiri.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@AllArgsConstructor
public class MultipleResponseDto<T> {
    private T data;
    private List<T> dataList;

}
