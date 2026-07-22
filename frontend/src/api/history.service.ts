import type { PredictionHistoryItem } from '../types/history';
import type { StudentPredictionResult } from '../types/prediction';
import historyMock from '../mocks/prediction-history.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const historyService = {
  /**
   * Retrieves all historical prediction sessions from the FastAPI server.
   */
  async getHistory(): Promise<PredictionHistoryItem[]> {
    console.log('Fetching prediction history from FastAPI...');
    const response = await fetch('http://127.0.0.1:8080/history');
    if (!response.ok) {
      throw new Error('Không thể tải lịch sử dự đoán từ máy chủ.');
    }
    return await response.json();
  },

  /**
   * Retrieves a specific single student prediction result by ID from the FastAPI server.
   */
  async getPredictionResultById(id: string): Promise<StudentPredictionResult | null> {
    console.log(`Fetching prediction result details for ID ${id} from FastAPI...`);
    const response = await fetch(`http://127.0.0.1:8080/history/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Không thể tải thông tin kết quả chi tiết.');
    }
    return await response.json();
  },

  /**
   * Saves a new prediction session to the FastAPI server.
   */
  async savePredictionSession(session: PredictionHistoryItem): Promise<PredictionHistoryItem> {
    console.log('Saving prediction session to FastAPI:', session);
    const response = await fetch('http://127.0.0.1:8080/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(session)
    });
    if (!response.ok) {
      throw new Error('Không thể lưu phiên dự đoán lên máy chủ.');
    }
    return await response.json();
  }
};
