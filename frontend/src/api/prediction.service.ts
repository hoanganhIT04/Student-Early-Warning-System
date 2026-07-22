import type { StudentPredictionInput, StudentDisplayInfo, StudentAIFeatures } from '../types/student';
import type { PredictionResult, StudentPredictionResult } from '../types/prediction';
import recommendationsDb from '../mocks/recommendations.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const predictionService = {
  /**
   * Predict early warning status for a single student by calling the FastAPI server.
   */
  async predictSingle(input: StudentPredictionInput): Promise<StudentPredictionResult> {
    console.log('Sending single prediction request to Python FastAPI:', input);

    const response = await fetch('http://127.0.0.1:8080/predict/single', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Dự đoán đơn lẻ thất bại: ${errText}`);
    }

    const result = await response.json();
    console.log('Received response from Python FastAPI:', result);
    return result;
  },

  /**
   * Predict status for a batch of students by calling the FastAPI server.
   */
  async predictBatch(inputs: StudentPredictionInput[]): Promise<StudentPredictionResult[]> {
    console.log(`Sending batch prediction request for ${inputs.length} students to Python FastAPI...`);

    const response = await fetch('http://127.0.0.1:8080/predict/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Dự đoán hàng loạt thất bại: ${errText}`);
    }

    const results = await response.json();
    console.log('Received batch response from Python FastAPI:', results);
    return results;
  }
};
