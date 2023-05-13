package com.ssu.kiri.tag;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long id;

    private String tagname;

    public static Tag saveTag(String tagname) {
        Tag tag = new Tag();
        tag.tagname = tagname;

        return tag;
    }

}
