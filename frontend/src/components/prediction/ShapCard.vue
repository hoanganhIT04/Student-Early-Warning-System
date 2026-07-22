<script setup lang="ts">
import { computed } from 'vue';

interface ShapValue {
  feature: string;
  impact: number;
  type: 'positive' | 'negative';
}

const props = defineProps<{
  shapValues?: ShapValue[];
}>();

// Helper dịch tên các đặc trưng AI sang tiếng Việt thân thiện
const translateFeature = (feature: string): string => {
  const dict: Record<string, string> = {
    'Sem2_Approved_Ratio': 'Tỷ lệ đỗ môn Học kỳ 2',
    'Sem1_Approved_Ratio': 'Tỷ lệ đỗ môn Học kỳ 1',
    'Tuition fees up to date': 'Đóng học phí đúng hạn',
    'Financial_Risk': 'Chỉ số rủi ro tài chính',
    'Scholarship holder': 'Đang nhận học bổng',
    'Debtor': 'Đang nợ tiền học phí',
    'Curricular units 2nd sem (approved)': 'Số môn đỗ kỳ 2',
    'Curricular units 1st sem (approved)': 'Số môn đỗ kỳ 1',
    'Age at enrollment': 'Tuổi khi nhập học',
    'Admission grade': 'Điểm xét tuyển đầu vào',
    'Previous qualification (grade)': 'Điểm tốt nghiệp cấp 3',
    'Application order': 'Thứ tự nguyện vọng',
    'Gender': 'Giới tính (Nam/Nữ)',
    'Displaced': 'Diện sinh viên xa nhà',
    'International': 'Sinh viên quốc tế',
    'Parental_Education_Score': 'Điểm học vấn của bố mẹ',
    'Evaluation_Rate_Sem1': 'Tỷ lệ thi cử Học kỳ 1'
  };

  // Xử lý dịch cho Course
  if (feature.includes('Course')) {
    const matches = feature.match(/\d+/);
    const code = matches ? matches[0] : '';
    return `Mã ngành học đại học (${code})`;
  }

  return dict[feature] || feature;
};

// Phân tách các yếu tố làm tăng rủi ro và các yếu tố làm giảm rủi ro
const positiveFactors = computed(() => {
  if (!props.shapValues) return [];
  return props.shapValues
    .filter(item => item.type === 'positive')
    .map(item => ({
      ...item,
      // Quy đổi log-odds SHAP sang tỷ lệ phần trăm trực quan (~ nhân với 15)
      percent: Math.round(item.impact * 15)
    }))
    .sort((a, b) => b.percent - a.percent);
});

const negativeFactors = computed(() => {
  if (!props.shapValues) return [];
  return props.shapValues
    .filter(item => item.type === 'negative')
    .map(item => ({
      ...item,
      // Quy đổi log-odds SHAP sang tỷ lệ phần trăm trực quan (~ nhân với 15)
      percent: Math.abs(Math.round(item.impact * 15))
    }))
    .sort((a, b) => b.percent - a.percent);
});
</script>

<template>
  <div class="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-6 shadow-sm transition-colors duration-200">
    <div class="flex items-center space-x-2 mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">
      <i class="fa-solid fa-chart-bar text-primary-500 text-lg"></i>
      <h4 class="text-base font-bold text-gray-900 dark:text-white">
        Giải thích thuật toán AI (Explainable AI - SHAP)
      </h4>
    </div>

    <!-- Fallback nếu không có dữ liệu SHAP (ví dụ các bản ghi cũ) -->
    <div v-if="!shapValues || shapValues.length === 0" class="text-center py-6 text-gray-400 dark:text-gray-500 text-xs">
      <i class="fa-solid fa-circle-info mr-1.5"></i> Không có dữ liệu giải thích SHAP cho bản ghi này.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <!-- 🟢 CỘT TRÁI: GIẢM NGUY CƠ -->
      <div class="space-y-4">
        <h5 class="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-wider flex items-center">
          <i class="fa-solid fa-circle-check mr-2"></i> Các yếu tố giúp GIẢM nguy cơ bỏ học
        </h5>
        
        <div class="space-y-3">
          <div 
            v-for="item in negativeFactors" 
            :key="item.feature" 
            class="p-3 bg-green-50/50 dark:bg-green-950/10 border border-green-100/50 dark:border-green-900/20 rounded-xl space-y-1.5"
          >
            <div class="flex justify-between items-center text-xs">
              <span class="font-bold text-gray-700 dark:text-gray-300">
                ✓ {{ translateFeature(item.feature) }}
              </span>
              <span class="font-black text-green-600 dark:text-green-400">
                -{{ item.percent }}%
              </span>
            </div>
            
            <!-- Thanh lực tác động của SHAP -->
            <div class="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
              <div 
                class="bg-green-500 h-full rounded-full transition-all duration-500" 
                :style="{ width: `${Math.min(item.percent * 3, 100)}%` }"
              ></div>
            </div>
          </div>

          <div v-if="negativeFactors.length === 0" class="text-xs text-gray-400 dark:text-gray-500 italic py-2">
            Không có yếu tố giảm rủi ro đáng kể nào được ghi nhận.
          </div>
        </div>
      </div>

      <!-- 🔴 CỘT PHẢI: TĂNG NGUY CƠ -->
      <div class="space-y-4">
        <h5 class="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center">
          <i class="fa-solid fa-circle-xmark mr-2"></i> Các yếu tố làm TĂNG nguy cơ bỏ học
        </h5>
        
        <div class="space-y-3">
          <div 
            v-for="item in positiveFactors" 
            :key="item.feature" 
            class="p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-100/50 dark:border-red-900/20 rounded-xl space-y-1.5"
          >
            <div class="flex justify-between items-center text-xs">
              <span class="font-bold text-gray-700 dark:text-gray-300">
                ✗ {{ translateFeature(item.feature) }}
              </span>
              <span class="font-black text-red-600 dark:text-red-400">
                +{{ item.percent }}%
              </span>
            </div>
            
            <!-- Thanh lực tác động của SHAP -->
            <div class="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
              <div 
                class="bg-red-500 h-full rounded-full transition-all duration-500" 
                :style="{ width: `${Math.min(item.percent * 3, 100)}%` }"
              ></div>
            </div>
          </div>

          <div v-if="positiveFactors.length === 0" class="text-xs text-gray-400 dark:text-gray-500 italic py-2">
            Không có yếu tố tăng rủi ro đáng kể nào được ghi nhận.
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
