package com.ssu.kiri.temp;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class TempController {
    private final TempService tempService;

    @RequestMapping(value = "/upload", method = RequestMethod.POST ,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity createImage(@RequestPart(value = "images") List<MultipartFile> multipartFiles) throws IOException {

        tempService.addFile(multipartFiles);

        return null;
    }

}
