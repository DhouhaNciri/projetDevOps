package com.colocation.management.Dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRequestDto {
    @NotBlank
    private String name;
    @NotBlank
    private String nickName;
}
