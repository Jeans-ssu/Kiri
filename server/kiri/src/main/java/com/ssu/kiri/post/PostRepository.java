package com.ssu.kiri.post;

import com.ssu.kiri.image.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

}
