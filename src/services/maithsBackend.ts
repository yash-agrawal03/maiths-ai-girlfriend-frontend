// Backend API integration service for Maiths AI Girlfriend
import axios, { AxiosResponse, AxiosError } from 'axios';
import config from '../config';

export interface MaithsBackendResponse {
  response?: string;
  message?: string;
  content?: string;
  reply?: string;
  text?: string;
  [key: string]: any;
}

export interface ChatRequest {
  message: string;
  userId?: string;
  timestamp?: string;
}

class MaithsBackendService {
  private apiClient;
  private isBackendHealthy = false;

  constructor() {
    this.apiClient = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for debugging
    this.apiClient.interceptors.request.use(
      (config) => {
        console.log('🚀 Sending request to Maiths backend:', config.url);
        return config;
      },
      (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.apiClient.interceptors.response.use(
      (response) => {
        console.log('✅ Received response from Maiths backend:', response.data);
        this.isBackendHealthy = true;
        return response;
      },
      (error) => {
        console.error('❌ Response error:', error);
        this.isBackendHealthy = false;
        return Promise.reject(error);
      }
    );

    // Check backend health on startup
    this.checkBackendHealth();
  }

  private async checkBackendHealth(): Promise<void> {
    try {
      console.log('🔍 Checking backend health...');
      await this.apiClient.get('/health');
      this.isBackendHealthy = true;
      console.log('💚 Backend is healthy!');
    } catch (error) {
      console.log('💔 Backend health check failed, will try /chat endpoint');
      this.isBackendHealthy = false;
    }
  }

  async sendMessage(message: string): Promise<{ response: string; timestamp: string }> {
    try {
      const requestData: ChatRequest = {
        message: message.trim(),
        timestamp: new Date().toISOString(),
        userId: 'user-' + Date.now(), // Simple user ID
      };

      console.log('💌 Sending message to Maiths:', requestData);

      // Try multiple possible endpoint formats your backend might use
      const possibleEndpoints = ['/chat', '/api/chat', '/message', '/ask'];
      
      let response: AxiosResponse<MaithsBackendResponse> | null = null;
      let lastError: any = null;

        for (const endpoint of possibleEndpoints) {
          try {
            console.log(`🔄 Trying endpoint: ${endpoint}`);
            response = await this.apiClient.post(endpoint, requestData);
            
            if (response && response.data) {
              console.log(`✅ Success with endpoint: ${endpoint}`);
              break;
            }
          } catch (error) {
            console.log(`❌ Failed with endpoint: ${endpoint}`);
            lastError = error;
            continue;
          }
        }      if (!response) {
        throw lastError || new Error('All endpoints failed');
      }

      // Handle different response formats your backend might return
      const backendData = response.data;
      let aiResponse = '';

      // Try different possible response field names
      if (backendData.response) {
        aiResponse = backendData.response;
      } else if (backendData.message) {
        aiResponse = backendData.message;
      } else if (backendData.content) {
        aiResponse = backendData.content;
      } else if (backendData.reply) {
        aiResponse = backendData.reply;
      } else if (backendData.text) {
        aiResponse = backendData.text;
      } else if (typeof backendData === 'string') {
        aiResponse = backendData;
      } else {
        // If none of the expected fields exist, stringify the response
        aiResponse = JSON.stringify(backendData);
      }

      return {
        response: aiResponse || "I received your message but I'm not sure how to respond right now! 💕",
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      console.error('💔 Backend communication failed:', error);
      
      // Return helpful error messages based on the error type
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        if (axiosError.code === 'ECONNREFUSED') {
          return {
            response: "Oops! I can't connect to my brain right now! 🥺 Make sure your backend is running:\n\n1. Go to `/home/yash/Documents/maiths-ai-gf`\n2. Run `npm run build`\n3. Run `npm start`\n\nThen try chatting with me again, sweetie! 💖",
            timestamp: new Date().toISOString(),
          };
        } else if (axiosError.response?.status === 404) {
          return {
            response: "Hmm, I'm having trouble finding the right endpoint to chat! 🤔 Your backend might be using a different API route. Check that your backend has a `/chat` endpoint, darling! 💕",
            timestamp: new Date().toISOString(),
          };
        } else if (axiosError.response?.status === 500) {
          return {
            response: "Uh oh! Something went wrong in my brain! 😵 There might be an error in your backend code. Check the backend console for error messages, honey! 💖",
            timestamp: new Date().toISOString(),
          };
        }
      }

      return {
        response: "I'm having some technical difficulties! 🥺 Please make sure your backend is running properly and try again, sweetie! 💖",
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Health check method
  async isHealthy(): Promise<boolean> {
    try {
      await this.checkBackendHealth();
      return this.isBackendHealthy;
    } catch (error) {
      return false;
    }
  }

  // Get backend status for debugging
  getBackendInfo(): { url: string; healthy: boolean } {
    return {
      url: config.api.baseUrl,
      healthy: this.isBackendHealthy,
    };
  }
}

// Export singleton instance
export const maithsBackend = new MaithsBackendService();
export default maithsBackend;
