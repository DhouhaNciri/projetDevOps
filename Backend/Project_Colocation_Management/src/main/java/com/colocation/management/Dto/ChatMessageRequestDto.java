package com.colocation.management.Dto;


import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageRequestDto {
    @NotBlank
    private String from;
    @NotBlank
    private String message;
}
