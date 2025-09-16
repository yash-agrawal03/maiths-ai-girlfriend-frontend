import axios, { AxiosResponse } from 'axios';
import config from '../config';

export interface ChatResponse {
  response: string;
  timestamp?: string;
}

export interface ChatRequest {
  message: string;
  userId?: string;
}

class ChatService {
  private apiClient;

  constructor() {
    this.apiClient = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const response: AxiosResponse<ChatResponse> = await this.apiClient.post(config.api.endpoints.chat, {
        message,
        timestamp: new Date().toISOString(),
      });

      return response.data;
    } catch (error) {
      console.error('Chat service error:', error);
      
      // Return a cute error message
      return {
        response: "Oops! I'm having trouble connecting to my brain right now! 🥺 Make sure your backend is running with `npm start` and try again, sweetie! 💖",
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Check if the backend is healthy
  async healthCheck(): Promise<boolean> {
    try {
      await this.apiClient.get(config.api.endpoints.health);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const chatService = new ChatService();
