export interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: string;
    isRead: boolean;
  }
  