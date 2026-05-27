package org.example.kurs_project.repository;

import org.example.kurs_project.entity.Build;
import org.example.kurs_project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BuildRepository extends JpaRepository<Build, Long> {
    List<Build> findByUser(User user);
}
