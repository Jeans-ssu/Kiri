package com.ssu.kiri.post;

import com.ssu.kiri.image.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> , PostCustomRepository {

    List<Post> findAllByLocal(String Local);
    List<Post> findAllBySchool(String school);

    List<Post> findAllByEventIn(List<String> eventList);

    List<Post> findAllByLocalAndEventIn(String Local, List<String> eventList);
    List<Post> findAllBySchoolAndEventIn(String School, List<String> eventList);
}
