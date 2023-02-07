package com.ssu.kiri.scrap;

import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.scrap.dto.ScrapReqAdd;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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



}
