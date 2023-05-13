package com.ssu.kiri.tag;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TagService {

    private final TagRepository tagRepository;

    public Tag saveTag(String tagname) {
        Tag tag = Tag.saveTag(tagname);
        Tag saveTag = tagRepository.save(tag);
        return saveTag;
    }


}
