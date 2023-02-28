package com.ssu.kiri.scrap;

import com.ssu.kiri.scrap.dto.ScrapResCal;

import java.util.List;

public interface ScrapCustomRepository {

    List<ScrapResCal> findScrapsByYearAndMonth(Integer year, Integer month);

}
