/**
 * API Client for Prompt Optimizer Backend
 * DEV VERSION - connects to port 8001
 */

const API_BASE_URL = 'http://localhost:8001/api';

class APIClient {
    constructor(baseUrl = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    /**
     * Check API health
     */
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            throw error;
        }
    }

    /**
     * Optimize a prompt
     */
    async optimizePrompt(data) {
        try {
            const response = await fetch(`${this.baseUrl}/optimize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Optimization failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Optimization error:', error);
            throw error;
        }
    }
    /**
     * Optimize a prompt with real-time streaming
     */
    async optimizePromptStream(data, onProgress) {
        try {
            const response = await fetch(`${this.baseUrl}/optimize-stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Optimization failed');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = JSON.parse(line.slice(6));
                        if (onProgress) {
                            onProgress(data);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Streaming error:', error);
            throw error;
        }
    }
}

// Export API client instance
const apiClient = new APIClient();
