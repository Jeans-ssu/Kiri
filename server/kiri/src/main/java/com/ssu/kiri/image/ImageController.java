package com.ssu.kiri.image;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ImageController {

    @PostMapping("/api/posts/image")
    public ResponseEntity createImage() {


        return null;
    }

}
