package com.colocation.management.Dto;



import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;






@Data
public class LogementDto {
    private Long id;
    private String name;
    private String address;
    private List<UserDto> userPersonnels;
}