package com.ssu.kiri.scrap;

import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.scrap.dto.ScrapReqAdd;
import com.ssu.kiri.scrap.dto.ScrapResCal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ScrapController {

    private final ScrapService scrapService;
    private final PostRepository postRepository;


    /**
     * 좋아요 누르기
     */
    @PostMapping("/extra/{id}")
    public ResponseEntity addScrap(@PathVariable("id") Long post_id,
                                   @Valid @RequestBody ScrapReqAdd request) {

        boolean result = scrapService.addScrap(post_id, request);

        return result ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    /**
     * 좋아요 취소하기
     */
    @PostMapping("/calenders/extra/{id}")
    public ResponseEntity deleteScrap(@PathVariable("id") Long post_id) {
        scrapService.deleteScrap(post_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/calendar")
    public ResponseEntity getScrap(@RequestParam(value = "year", required = false) String year,
                                   @RequestParam(value = "month", required = false) String month) {

        List<ScrapResCal> scrap = scrapService.getScrap(year, month);

        return ResponseEntity.ok(scrap);
    }



}
