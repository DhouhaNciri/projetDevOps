package com.colocation.management.Dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatResponseDto {
    private Long id;
    private String name;
    private String lastMessageSend;
    private LocalDateTime lastMessageSendTime;
}
