package com.example.server;

import com.example.server.data.dao.FlashcardDAO;
import com.example.server.data.dao.FlashcardDAOImpl;
import com.example.server.data.entities.Flashcard;
import com.example.server.data.entities.StudyMaterial;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudyWebappApplication {
	public static void main(String[] args) {
		SpringApplication.run(StudyWebappApplication.class, args);
	}

}
