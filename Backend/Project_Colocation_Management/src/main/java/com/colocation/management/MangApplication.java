package com.colocation.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;


@SpringBootApplication
@CrossOrigin
public class MangApplication {

	public static void main(String[] args) {
		SpringApplication.run(MangApplication.class, args);
	}

}
