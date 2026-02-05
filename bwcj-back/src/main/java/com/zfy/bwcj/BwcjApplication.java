package com.zfy.bwcj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class BwcjApplication {

    public static void main(String[] args) {
        SpringApplication.run(BwcjApplication.class, args);
    }

}
