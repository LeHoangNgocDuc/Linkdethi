import { GradeCurriculum, ExamType, MockExam } from './types';

// The critical redirect URL provided (Latest deployment - Updated by User)
export const GOOGLE_SCRIPT_EXAM_URL = "https://script.google.com/macros/s/AKfycbxGaU90rAVsYfJOEjxSejzQ0gjIF2wjVyE2yCMpkcn56ss0OOoDJhm7WlwYOqwhezLFTw/exec";

// The Google Sheet ID provided for storage
export const GOOGLE_SHEET_ID = "1mRAbJ7INcNUKOaQhZTXp4zXopU2FSvzqe1zSTYGrfQk";

export const CENTER_NAME = "TRUNG TÂM TOÁN HỌC";

export const NAV_ITEMS = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Toán 6', path: '/grade/6' },
  { label: 'Toán 7', path: '/grade/7' },
  { label: 'Toán 8', path: '/grade/8' },
  { label: 'Toán 9', path: '/grade/9' },
  { label: 'Toán 10', path: '/grade/10' },
  { label: 'Toán 11', path: '/grade/11' },
  { label: 'Toán 12', path: '/grade/12' },
  { label: 'Kiểm tra', path: '/kiem-tra' },
];

// Helper to generate standard exams for a grade
const generateStandardExams = (grade: string): MockExam[] => [
  { id: `${grade}-gk1`, title: `Đề kiểm tra Giữa kỳ 1 - Toán ${grade}`, grade, type: ExamType.MID_TERM_1, duration: grade === '6' || grade === '7' ? 45 : 60 },
  { id: `${grade}-ck1`, title: `Đề kiểm tra Cuối kỳ 1 - Toán ${grade}`, grade, type: ExamType.FINAL_TERM_1, duration: 90 },
  { id: `${grade}-gk2`, title: `Đề kiểm tra Giữa kỳ 2 - Toán ${grade}`, grade, type: ExamType.MID_TERM_2, duration: grade === '6' || grade === '7' ? 45 : 60 },
  { id: `${grade}-ck2`, title: `Đề kiểm tra Cuối kỳ 2 - Toán ${grade}`, grade, type: ExamType.FINAL_TERM_2, duration: 90 },
];

export const MOCK_EXAMS: MockExam[] = [
  ...generateStandardExams('6'),
  ...generateStandardExams('7'),
  ...generateStandardExams('8'),
  
  // Grade 9 + TS10
  ...generateStandardExams('9'),
  { id: '9-ts10-1', title: 'Đề thi thử vào 10 - Đề 01 (Cơ bản)', grade: '9', type: ExamType.TS10, duration: 120 },
  { id: '9-ts10-2', title: 'Đề thi thử vào 10 - Đề 02 (Nâng cao)', grade: '9', type: ExamType.TS10, duration: 120 },
  { id: '9-ts10-3', title: 'Tổng ôn Hình học thi vào 10', grade: '9', type: ExamType.TS10, duration: 90 },
  { id: '9-ts10-4', title: 'Đề thi thử Sở GD&ĐT Hà Nội - Lần 1', grade: '9', type: ExamType.TS10, duration: 120 },

  ...generateStandardExams('10'),
  ...generateStandardExams('11'),

  // Grade 12 + THPTQG
  ...generateStandardExams('12'),
  { id: '12-thpt-1', title: 'Đề thi thử THPT QG - Đề 01', grade: '12', type: ExamType.THPTQG, duration: 90 },
  { id: '12-thpt-2', title: 'Đề thi thử THPT QG - Đề 02', grade: '12', type: ExamType.THPTQG, duration: 90 },
  { id: '12-thpt-3', title: 'Đề thực chiến THPT QG - Chuyên đề Hàm số', grade: '12', type: ExamType.THPTQG, duration: 90 },
  { id: '12-thpt-4', title: 'Đề thực chiến THPT QG - Chuyên đề Mũ & Logarit', grade: '12', type: ExamType.THPTQG, duration: 90 },
];

// Helper to define curriculum data strictly from the provided PDF
export const MOCK_CURRICULUM: Record<string, GradeCurriculum> = {
  '6': {
    gradeId: '6',
    title: 'Toán 6',
    chapters: [
      {
        id: 'c1-6',
        title: 'Chương I: Tập hợp các số tự nhiên',
        lessons: [
          { id: 'l1-6', title: 'Bài 1: Tập hợp' },
          { id: 'l2-6', title: 'Bài 2: Cách ghi số tự nhiên' },
          { id: 'l3-6', title: 'Bài 3: Thứ tự trong tập hợp các số tự nhiên' },
          { id: 'l4-6', title: 'Bài 4: Phép cộng và phép trừ số tự nhiên' },
          { id: 'l5-6', title: 'Bài 5: Phép nhân và phép chia số tự nhiên' },
          { id: 'l6-6', title: 'Bài 6: Lũy thừa với số mũ tự nhiên' },
          { id: 'l7-6', title: 'Bài 7: Thứ tự thực hiện các phép tính' },
        ]
      },
      {
        id: 'c2-6',
        title: 'Chương II: Tính chia hết trong tập hợp các số tự nhiên',
        lessons: [
          { id: 'l8-6', title: 'Bài 8: Quan hệ chia hết và tính chất' },
          { id: 'l9-6', title: 'Bài 9: Dấu hiệu chia hết' },
          { id: 'l10-6', title: 'Bài 10: Số nguyên tố' },
          { id: 'l11-6', title: 'Bài 11: Ước chung. Ước chung lớn nhất' },
          { id: 'l12-6', title: 'Bài 12: Bội chung. Bội chung nhỏ nhất' },
        ]
      },
      {
        id: 'c3-6',
        title: 'Chương III: Số nguyên',
        lessons: [
          { id: 'l13-6', title: 'Bài 13: Tập hợp các số nguyên' },
          { id: 'l14-6', title: 'Bài 14: Phép cộng và phép trừ số nguyên' },
          { id: 'l15-6', title: 'Bài 15: Quy tắc dấu ngoặc' },
          { id: 'l16-6', title: 'Bài 16: Phép nhân số nguyên' },
          { id: 'l17-6', title: 'Bài 17: Phép chia hết. Ước và bội của một số nguyên' },
        ]
      },
      {
        id: 'c4-6',
        title: 'Chương IV: Một số hình phẳng trong thực tiễn',
        lessons: [
          { id: 'l18-6', title: 'Bài 18: Hình tam giác đều. Hình vuông. Hình lục giác đều' },
          { id: 'l19-6', title: 'Bài 19: Hình chữ nhật. Hình thoi. Hình bình hành. Hình thang cân' },
          { id: 'l20-6', title: 'Bài 20: Chu vi và diện tích của một số tứ giác đã học' },
        ]
      },
      {
        id: 'c5-6',
        title: 'Chương V: Tính đối xứng của hình phẳng trong tự nhiên',
        lessons: [
          { id: 'l21-6', title: 'Bài 21: Hình có trục đối xứng' },
          { id: 'l22-6', title: 'Bài 22: Hình có tâm đối xứng' },
        ]
      },
      {
        id: 'c6-6',
        title: 'Chương VI: Phân số',
        lessons: [
          { id: 'l23-6', title: 'Bài 23: Mở rộng phân số. Phân số bằng nhau' },
          { id: 'l24-6', title: 'Bài 24: So sánh phân số. Hỗn số dương' },
          { id: 'l25-6', title: 'Bài 25: Phép cộng và phép trừ phân số' },
          { id: 'l26-6', title: 'Bài 26: Phép nhân và phép chia phân số' },
          { id: 'l27-6', title: 'Bài 27: Hai bài toán về phân số' },
        ]
      },
      {
        id: 'c7-6',
        title: 'Chương VII: Số thập phân',
        lessons: [
          { id: 'l28-6', title: 'Bài 28: Số thập phân' },
          { id: 'l29-6', title: 'Bài 29: Tính toán với số thập phân' },
          { id: 'l30-6', title: 'Bài 30: Làm tròn và ước lượng' },
          { id: 'l31-6', title: 'Bài 31: Một số bài toán về tỉ số và tỉ số phần trăm' },
        ]
      },
      {
        id: 'c8-6',
        title: 'Chương VIII: Những hình học cơ bản',
        lessons: [
          { id: 'l32-6', title: 'Bài 32: Điểm và đường thẳng' },
          { id: 'l33-6', title: 'Bài 33: Điểm nằm giữa hai điểm. Tia' },
          { id: 'l34-6', title: 'Bài 34: Đoạn thẳng. Độ dài đoạn thẳng' },
          { id: 'l35-6', title: 'Bài 35: Trung điểm của đoạn thẳng' },
          { id: 'l36-6', title: 'Bài 36: Góc' },
          { id: 'l37-6', title: 'Bài 37: Số đo góc' },
        ]
      },
      {
        id: 'c9-6',
        title: 'Chương IX: Dữ liệu và xác suất thực nghiệm',
        lessons: [
          { id: 'l38-6', title: 'Bài 38: Dữ liệu và thu thập dữ liệu' },
          { id: 'l39-6', title: 'Bài 39: Bảng thống kê và biểu đồ tranh' },
          { id: 'l40-6', title: 'Bài 40: Biểu đồ cột' },
          { id: 'l41-6', title: 'Bài 41: Biểu đồ cột kép' },
          { id: 'l42-6', title: 'Bài 42: Kết quả có thể và sự kiện trong trò chơi, thí nghiệm' },
          { id: 'l43-6', title: 'Bài 43: Xác suất thực nghiệm' },
        ]
      }
    ]
  },
  '7': {
    gradeId: '7',
    title: 'Toán 7',
    chapters: [
      {
        id: 'c1-7',
        title: 'Chương I: Số hữu tỉ',
        lessons: [
          { id: 'l1-7', title: 'Bài 1: Tập hợp các số hữu tỉ' },
          { id: 'l2-7', title: 'Bài 2: Cộng, trừ, nhân, chia số hữu tỉ' },
          { id: 'l3-7', title: 'Bài 3: Lũy thừa với số mũ tự nhiên của một số hữu tỉ' },
          { id: 'l4-7', title: 'Bài 4: Thứ tự thực hiện các phép tính. Quy tắc chuyển vế' },
        ]
      },
      {
        id: 'c2-7',
        title: 'Chương II: Số thực',
        lessons: [
          { id: 'l5-7', title: 'Bài 5: Làm quen với số thập phân vô hạn tuần hoàn' },
          { id: 'l6-7', title: 'Bài 6: Số vô tỉ. Căn bậc hai số học' },
          { id: 'l7-7', title: 'Bài 7: Tập hợp các số thực' },
        ]
      },
      {
        id: 'c3-7',
        title: 'Chương III: Góc và đường thẳng song song',
        lessons: [
          { id: 'l8-7', title: 'Bài 8: Góc ở vị trí đặc biệt. Tia phân giác của một góc' },
          { id: 'l9-7', title: 'Bài 9: Hai đường thẳng song song và dấu hiệu nhận biết' },
          { id: 'l10-7', title: 'Bài 10: Tiên đề Euclid. Tính chất của hai đường thẳng song song' },
          { id: 'l11-7', title: 'Bài 11: Định lí và chứng minh định lí' },
        ]
      },
      {
        id: 'c4-7',
        title: 'Chương IV: Tam giác bằng nhau',
        lessons: [
          { id: 'l12-7', title: 'Bài 12: Tổng các góc trong một tam giác' },
          { id: 'l13-7', title: 'Bài 13: Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác' },
          { id: 'l14-7', title: 'Bài 14: Trường hợp bằng nhau thứ hai và thứ ba của tam giác' },
          { id: 'l15-7', title: 'Bài 15: Các trường hợp bằng nhau của tam giác vuông' },
          { id: 'l16-7', title: 'Bài 16: Tam giác cân. Đường trung trực của đoạn thẳng' },
        ]
      },
      {
        id: 'c5-7',
        title: 'Chương V: Thu thập và biểu diễn dữ liệu',
        lessons: [
          { id: 'l17-7', title: 'Bài 17: Thu thập và phân loại dữ liệu' },
          { id: 'l18-7', title: 'Bài 18: Biểu đồ hình quạt tròn' },
          { id: 'l19-7', title: 'Bài 19: Biểu đồ đoạn thẳng' },
        ]
      },
      {
        id: 'c6-7',
        title: 'Chương VI: Tỉ lệ thức và đại lượng tỉ lệ',
        lessons: [
          { id: 'l20-7', title: 'Bài 20: Tỉ lệ thức' },
          { id: 'l21-7', title: 'Bài 21: Tính chất của dãy tỉ số bằng nhau' },
          { id: 'l22-7', title: 'Bài 22: Đại lượng tỉ lệ thuận' },
          { id: 'l23-7', title: 'Bài 23: Đại lượng tỉ lệ nghịch' },
        ]
      },
      {
        id: 'c7-7',
        title: 'Chương VII: Biểu thức đại số và đa thức một biến',
        lessons: [
          { id: 'l24-7', title: 'Bài 24: Biểu thức đại số' },
          { id: 'l25-7', title: 'Bài 25: Đa thức một biến' },
          { id: 'l26-7', title: 'Bài 26: Phép cộng và phép trừ đa thức một biến' },
          { id: 'l27-7', title: 'Bài 27: Phép nhân đa thức một biến' },
          { id: 'l28-7', title: 'Bài 28: Phép chia đa thức một biến' },
        ]
      },
      {
        id: 'c8-7',
        title: 'Chương VIII: Làm quen với biến cố và xác suất của biến cố',
        lessons: [
          { id: 'l29-7', title: 'Bài 29: Làm quen với biến cố' },
          { id: 'l30-7', title: 'Bài 30: Làm quen với xác suất của biến cố' },
        ]
      },
      {
        id: 'c9-7',
        title: 'Chương IX: Quan hệ giữa các yếu tố trong một tam giác',
        lessons: [
          { id: 'l31-7', title: 'Bài 31: Quan hệ giữa góc và cạnh đối diện trong một tam giác' },
          { id: 'l32-7', title: 'Bài 32: Quan hệ giữa đường vuông góc và đường xiên' },
          { id: 'l33-7', title: 'Bài 33: Quan hệ giữa ba cạnh của một tam giác' },
          { id: 'l34-7', title: 'Bài 34: Sự đồng quy của ba đường trung tuyến, ba đường phân giác trong một tam giác' },
          { id: 'l35-7', title: 'Bài 35: Sự đồng quy của ba đường trung trực, ba đường cao trong một tam giác' },
        ]
      },
      {
        id: 'c10-7',
        title: 'Chương X: Một số hình khối trong thực tiễn',
        lessons: [
          { id: 'l36-7', title: 'Bài 36: Hình hộp chữ nhật và hình lập phương' },
          { id: 'l37-7', title: 'Bài 37: Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác' },
        ]
      }
    ]
  },
  '8': {
    gradeId: '8',
    title: 'Toán 8',
    chapters: [
      {
        id: 'c1-8',
        title: 'Chương I: Đa thức',
        lessons: [
          { id: 'l1-8', title: 'Bài 1: Đơn thức' },
          { id: 'l2-8', title: 'Bài 2: Đa thức' },
          { id: 'l3-8', title: 'Bài 3: Phép cộng và phép trừ đa thức' },
          { id: 'l4-8', title: 'Bài 4: Phép nhân đa thức' },
          { id: 'l5-8', title: 'Bài 5: Phép chia đa thức cho đơn thức' },
        ]
      },
      {
        id: 'c2-8',
        title: 'Chương II: Hằng đẳng thức đáng nhớ và ứng dụng',
        lessons: [
          { id: 'l6-8', title: 'Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu' },
          { id: 'l7-8', title: 'Bài 7: Lập phương của một tổng hay một hiệu' },
          { id: 'l8-8', title: 'Bài 8: Tổng và hiệu hai lập phương' },
          { id: 'l9-8', title: 'Bài 9: Phân tích đa thức thành nhân tử' },
        ]
      },
      {
        id: 'c3-8',
        title: 'Chương III: Tứ giác',
        lessons: [
          { id: 'l10-8', title: 'Bài 10: Tứ giác' },
          { id: 'l11-8', title: 'Bài 11: Hình thang cân' },
          { id: 'l12-8', title: 'Bài 12: Hình bình hành' },
          { id: 'l13-8', title: 'Bài 13: Hình chữ nhật' },
          { id: 'l14-8', title: 'Bài 14: Hình thoi và hình vuông' },
        ]
      },
      {
        id: 'c4-8',
        title: 'Chương IV: Định lí Thalès',
        lessons: [
          { id: 'l15-8', title: 'Bài 15: Định lí Thalès trong tam giác' },
          { id: 'l16-8', title: 'Bài 16: Đường trung bình của tam giác' },
          { id: 'l17-8', title: 'Bài 17: Tính chất đường phân giác của tam giác' },
        ]
      },
      {
        id: 'c5-8',
        title: 'Chương V: Dữ liệu và biểu đồ',
        lessons: [
          { id: 'l18-8', title: 'Bài 18: Thu thập và phân loại dữ liệu' },
          { id: 'l19-8', title: 'Bài 19: Biểu diễn dữ liệu bằng bảng, biểu đồ' },
          { id: 'l20-8', title: 'Bài 20: Phân tích số liệu thống kê dựa vào biểu đồ' },
        ]
      },
      {
        id: 'c6-8',
        title: 'Chương VI: Phân thức đại số',
        lessons: [
            { id: 'l21-8', title: 'Bài 21: Phân thức đại số' },
            { id: 'l22-8', title: 'Bài 22: Tính chất cơ bản của phân thức đại số' },
            { id: 'l23-8', title: 'Bài 23: Phép cộng và phép trừ phân thức đại số' },
            { id: 'l24-8', title: 'Bài 24: Phép nhân và phép chia phân thức đại số' },
        ]
      },
      {
        id: 'c7-8',
        title: 'Chương VII: Phương trình bậc nhất và hàm số bậc nhất',
        lessons: [
            { id: 'l25-8', title: 'Bài 25: Phương trình bậc nhất một ẩn' },
            { id: 'l26-8', title: 'Bài 26: Giải bài toán bằng cách lập phương trình' },
            { id: 'l27-8', title: 'Bài 27: Khái niệm hàm số và đồ thị của hàm số' },
            { id: 'l28-8', title: 'Bài 28: Hàm số bậc nhất và đồ thị của hàm số bậc nhất' },
            { id: 'l29-8', title: 'Bài 29: Hệ số góc của đường thẳng' },
        ]
      },
      {
        id: 'c8-8',
        title: 'Chương VIII: Mở đầu về tính xác suất của biến cố',
        lessons: [
            { id: 'l30-8', title: 'Bài 30: Kết quả có thể và kết quả thuận lợi' },
            { id: 'l31-8', title: 'Bài 31: Cách tính xác suất của biến cố bằng tỉ số' },
            { id: 'l32-8', title: 'Bài 32: Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng' },
        ]
      },
      {
        id: 'c9-8',
        title: 'Chương IX: Tam giác đồng dạng',
        lessons: [
            { id: 'l33-8', title: 'Bài 33: Hai tam giác đồng dạng' },
            { id: 'l34-8', title: 'Bài 34: Ba trường hợp đồng dạng của hai tam giác' },
            { id: 'l35-8', title: 'Bài 35: Định lí Pythagore và ứng dụng' },
            { id: 'l36-8', title: 'Bài 36: Các trường hợp đồng dạng của hai tam giác vuông' },
            { id: 'l37-8', title: 'Bài 37: Hình đồng dạng' },
        ]
      },
      {
        id: 'c10-8',
        title: 'Chương X: Một số hình khối trong thực tiễn',
        lessons: [
            { id: 'l38-8', title: 'Bài 38: Hình chóp tam giác đều' },
            { id: 'l39-8', title: 'Bài 39: Hình chóp tứ giác đều' },
        ]
      }
    ]
  },
  '9': {
    gradeId: '9',
    title: 'Toán 9',
    chapters: [
      {
        id: 'c1-9',
        title: 'Chương I: Phương trình và hệ hai phương trình bậc nhất hai ẩn',
        lessons: [
          { id: 'l1-9', title: 'Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn' },
          { id: 'l2-9', title: 'Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn' },
          { id: 'l3-9', title: 'Bài 3: Giải bài toán bằng cách lập hệ phương trình' },
        ]
      },
      {
        id: 'c2-9',
        title: 'Chương II: Phương trình và bất phương trình bậc nhất một ẩn',
        lessons: [
          { id: 'l4-9', title: 'Bài 4: Phương trình quy về phương trình bậc nhất một ẩn' },
          { id: 'l5-9', title: 'Bài 5: Bất đẳng thức và tính chất' },
          { id: 'l6-9', title: 'Bài 6: Bất phương trình bậc nhất một ẩn' },
        ]
      },
      {
        id: 'c3-9',
        title: 'Chương III: Căn thức',
        lessons: [
          { id: 'l7-9', title: 'Bài 7: Căn bậc hai và căn thức bậc hai' },
          { id: 'l8-9', title: 'Bài 8: Khai căn bậc hai với phép nhân và phép chia' },
          { id: 'l9-9', title: 'Bài 9: Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai' },
          { id: 'l10-9', title: 'Bài 10: Căn bậc ba và căn thức bậc ba' },
        ]
      },
      {
        id: 'c4-9',
        title: 'Chương IV: Hệ thức lượng trong tam giác vuông',
        lessons: [
          { id: 'l11-9', title: 'Bài 11: Tỉ số lượng giác của góc nhọn' },
          { id: 'l12-9', title: 'Bài 12: Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng' },
        ]
      },
      {
        id: 'c5-9',
        title: 'Chương V: Đường tròn',
        lessons: [
          { id: 'l13-9', title: 'Bài 13: Mở đầu về đường tròn' },
          { id: 'l14-9', title: 'Bài 14: Cung và dây của một đường tròn' },
          { id: 'l15-9', title: 'Bài 15: Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên' },
          { id: 'l16-9', title: 'Bài 16: Vị trí tương đối của đường thẳng và đường tròn' },
          { id: 'l17-9', title: 'Bài 17: Vị trí tương đối của hai đường tròn' },
        ]
      },
      {
        id: 'c6-9',
        title: 'Chương VI: Hàm số y = ax^2 (a ≠ 0). Phương trình bậc hai một ẩn',
        lessons: [
          { id: 'l18-9', title: 'Bài 18: Hàm số y = ax^2 (a ≠ 0)' },
          { id: 'l19-9', title: 'Bài 19: Phương trình bậc hai một ẩn' },
          { id: 'l20-9', title: 'Bài 20: Định lí Viète và ứng dụng' },
          { id: 'l21-9', title: 'Bài 21: Giải bài toán bằng cách lập phương trình' },
        ]
      },
      {
        id: 'c7-9',
        title: 'Chương VII: Tần số và tần số tương đối',
        lessons: [
          { id: 'l22-9', title: 'Bài 22: Bảng tần số và biểu đồ tần số' },
          { id: 'l23-9', title: 'Bài 23: Bảng tần số tương đối và biểu đồ tần số tương đối' },
          { id: 'l24-9', title: 'Bài 24: Bảng tần số, tần số tương đối ghép nhóm và biểu đồ' },
        ]
      },
      {
        id: 'c8-9',
        title: 'Chương VIII: Xác suất của biến cố trong một số mô hình xác suất đơn giản',
        lessons: [
          { id: 'l25-9', title: 'Bài 25: Phép thử ngẫu nhiên và không gian mẫu' },
          { id: 'l26-9', title: 'Bài 26: Xác suất của biến cố liên quan đến phép thử' },
        ]
      },
      {
        id: 'c9-9',
        title: 'Chương IX: Đường tròn ngoại tiếp và đường tròn nội tiếp',
        lessons: [
          { id: 'l27-9', title: 'Bài 27: Góc nội tiếp' },
          { id: 'l28-9', title: 'Bài 28: Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác' },
          { id: 'l29-9', title: 'Bài 29: Tứ giác nội tiếp' },
        ]
      },
      {
        id: 'c10-9',
        title: 'Chương X: Một số hình khối trong thực tiễn',
        lessons: [
          { id: 'l30-9', title: 'Bài 30: Đa giác đều' },
          { id: 'l31-9', title: 'Bài 31: Hình trụ và hình nón' },
          { id: 'l32-9', title: 'Bài 32: Hình cầu' },
        ]
      }
    ]
  },
  '10': {
    gradeId: '10',
    title: 'Toán 10',
    chapters: [
      {
        id: 'c1-10',
        title: 'Chương I: Mệnh đề và tập hợp',
        lessons: [
          { id: 'l1-10', title: 'Bài 1: Mệnh đề' },
          { id: 'l2-10', title: 'Bài 2: Tập hợp và các phép toán trên tập hợp' },
        ]
      },
      {
        id: 'c2-10',
        title: 'Chương II: Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
        lessons: [
          { id: 'l3-10', title: 'Bài 3: Bất phương trình bậc nhất hai ẩn' },
          { id: 'l4-10', title: 'Bài 4: Hệ bất phương trình bậc nhất hai ẩn' },
        ]
      },
      {
        id: 'c3-10',
        title: 'Chương III: Hệ thức lượng trong tam giác',
        lessons: [
          { id: 'l5-10', title: 'Bài 5: Giá trị lượng giác của một góc từ 0° đến 180°' },
          { id: 'l6-10', title: 'Bài 6: Hệ thức lượng trong tam giác (Định lí Cosin, Sin, công thức diện tích)' },
        ]
      },
      {
        id: 'c4-10',
        title: 'Chương IV: Vectơ',
        lessons: [
          { id: 'l7-10', title: 'Bài 7: Các khái niệm mở đầu' },
          { id: 'l8-10', title: 'Bài 8: Tổng và hiệu của hai vectơ' },
          { id: 'l9-10', title: 'Bài 9: Tích của một vectơ với một số' },
          { id: 'l10-10', title: 'Bài 10: Vectơ trong mặt phẳng tọa độ' },
          { id: 'l11-10', title: 'Bài 11: Tích vô hướng của hai vectơ' },
        ]
      },
      {
        id: 'c5-10',
        title: 'Chương V: Các số đặc trưng của mẫu số liệu không ghép nhóm',
        lessons: [
          { id: 'l12-10', title: 'Bài 12: Số gần đúng và sai số' },
          { id: 'l13-10', title: 'Bài 13: Các số đặc trưng đo xu thế trung tâm' },
          { id: 'l14-10', title: 'Bài 14: Các số đặc trưng đo độ phân tán' },
        ]
      },
      {
        id: 'c6-10',
        title: 'Chương VI: Hàm số, đồ thị và ứng dụng',
        lessons: [
          { id: 'l15-10', title: 'Bài 15: Hàm số' },
          { id: 'l16-10', title: 'Bài 16: Hàm số bậc hai' },
          { id: 'l17-10', title: 'Bài 17: Dấu của tam thức bậc hai' },
          { id: 'l18-10', title: 'Bài 18: Phương trình quy về phương trình bậc hai' },
        ]
      },
      {
        id: 'c7-10',
        title: 'Chương VII: Phương pháp tọa độ trong mặt phẳng',
        lessons: [
          { id: 'l19-10', title: 'Bài 19: Phương trình đường thẳng' },
          { id: 'l20-10', title: 'Bài 20: Vị trí tương đối giữa hai đường thẳng. Góc và khoảng cách' },
          { id: 'l21-10', title: 'Bài 21: Đường tròn trong mặt phẳng tọa độ' },
          { id: 'l22-10', title: 'Bài 22: Ba đường conic (Elip, Hypebol, Parabol)' },
        ]
      },
      {
        id: 'c8-10',
        title: 'Chương VIII: Đại số tổ hợp',
        lessons: [
          { id: 'l23-10', title: 'Bài 23: Quy tắc đếm' },
          { id: 'l24-10', title: 'Bài 24: Hoán vị, chỉnh hợp và tổ hợp' },
          { id: 'l25-10', title: 'Bài 25: Nhị thức Newton' },
        ]
      },
      {
        id: 'c9-10',
        title: 'Chương IX: Tính xác suất theo định nghĩa cổ điển',
        lessons: [
          { id: 'l26-10', title: 'Bài 26: Biến cố và định nghĩa cổ điển của xác suất' },
          { id: 'l27-10', title: 'Bài 27: Thực hành tính xác suất theo định nghĩa cổ điển' },
        ]
      }
    ]
  },
  '11': {
    gradeId: '11',
    title: 'Toán 11',
    chapters: [
      {
        id: 'c1-11',
        title: 'Chương I: Hàm số lượng giác và phương trình lượng giác',
        lessons: [
          { id: 'l1-11', title: 'Bài 1: Giá trị lượng giác của góc lượng giác' },
          { id: 'l2-11', title: 'Bài 2: Công thức lượng giác' },
          { id: 'l3-11', title: 'Bài 3: Hàm số lượng giác' },
          { id: 'l4-11', title: 'Bài 4: Phương trình lượng giác cơ bản' },
        ]
      },
      {
        id: 'c2-11',
        title: 'Chương II: Dãy số. Cấp số cộng và cấp số nhân',
        lessons: [
          { id: 'l5-11', title: 'Bài 5: Dãy số' },
          { id: 'l6-11', title: 'Bài 6: Cấp số cộng' },
          { id: 'l7-11', title: 'Bài 7: Cấp số nhân' },
        ]
      },
      {
        id: 'c3-11',
        title: 'Chương III: Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm',
        lessons: [
          { id: 'l8-11', title: 'Bài 8: Mẫu số liệu ghép nhóm' },
          { id: 'l9-11', title: 'Bài 9: Các số đặc trưng đo xu thế trung tâm' },
        ]
      },
      {
        id: 'c5-11',
        title: 'Chương V: Giới hạn. Hàm số liên tục',
        lessons: [
          { id: 'l15-11', title: 'Bài 15: Giới hạn của dãy số' },
          { id: 'l16-11', title: 'Bài 16: Giới hạn của hàm số' },
          { id: 'l17-11', title: 'Bài 17: Hàm số liên tục' },
        ]
      },
      {
        id: 'c6-11',
        title: 'Chương VI: Hàm số mũ và hàm số lôgarit',
        lessons: [
          { id: 'l18-11', title: 'Bài 18: Lũy thừa với số mũ thực' },
          { id: 'l19-11', title: 'Bài 19: Lôgarit' },
          { id: 'l20-11', title: 'Bài 20: Hàm số mũ và hàm số lôgarit' },
          { id: 'l21-11', title: 'Bài 21: Phương trình, bất phương trình mũ và lôgarit' },
        ]
      },
      {
        id: 'c7-11',
        title: 'Chương VII: Quan hệ vuông góc trong không gian',
        lessons: [
          { id: 'l22-11', title: 'Bài 22: Hai đường thẳng vuông góc' },
          { id: 'l23-11', title: 'Bài 23: Đường thẳng vuông góc với mặt phẳng' },
          { id: 'l24-11', title: 'Bài 24: Phép chiếu vuông góc; góc giữa đường thẳng và mặt phẳng' },
          { id: 'l25-11', title: 'Bài 25: Hai mặt phẳng vuông góc' },
          { id: 'l26-11', title: 'Bài 26: Khoảng cách' },
          { id: 'l27-11', title: 'Bài 27: Thể tích' },
        ]
      },
      {
        id: 'c8-11',
        title: 'Chương VIII: Các quy tắc tính xác suất',
        lessons: [
          { id: 'l28-11', title: 'Bài 28: Biến cố hợp, biến cố giao, biến cố độc lập' },
          { id: 'l29-11', title: 'Bài 29: Công thức cộng xác suất' },
          { id: 'l30-11', title: 'Bài 30: Công thức nhân xác suất cho hai biến cố độc lập' },
        ]
      },
      {
        id: 'c9-11',
        title: 'Chương IX: Đạo hàm',
        lessons: [
          { id: 'l31-11', title: 'Bài 31: Định nghĩa và ý nghĩa của đạo hàm' },
          { id: 'l32-11', title: 'Bài 32: Các quy tắc tính đạo hàm' },
          { id: 'l33-11', title: 'Bài 33: Đạo hàm cấp hai' },
        ]
      }
    ]
  },
  '12': {
    gradeId: '12',
    title: 'Toán 12',
    chapters: [
      {
        id: 'c1-12',
        title: 'Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số',
        lessons: [
          { id: 'l1-12', title: 'Bài 1: Tính đơn điệu và cực trị của hàm số' },
          { id: 'l2-12', title: 'Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số' },
          { id: 'l3-12', title: 'Bài 3: Đường tiệm cận của đồ thị hàm số' },
          { id: 'l4-12', title: 'Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số' },
        ]
      },
      {
        id: 'c2-12',
        title: 'Chương II: Vectơ và hệ trục toạ độ trong không gian',
        lessons: [
          { id: 'l5-12', title: 'Bài tập vectơ trong không gian và toạ độ' },
          { id: 'l6-12', title: 'Các phép toán với vectơ' },
        ]
      },
      {
        id: 'c3-12',
        title: 'Chương III: Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm',
        lessons: [
          { id: 'l9-12', title: 'Bài 9: Khoảng biến thiên và khoảng tứ phân vị' },
          { id: 'l10-12', title: 'Bài 10: Phương sai và độ lệch chuẩn' },
        ]
      },
      {
        id: 'c4-12',
        title: 'Chương IV: Nguyên hàm – Tích phân',
        lessons: [
          { id: 'l11-12', title: 'Bài về nguyên hàm cơ bản' },
          { id: 'l12-12', title: 'Bài về tích phân' },
          { id: 'l13-12', title: 'Ứng dụng hình học của tích phân' },
        ]
      },
      {
        id: 'c5-12',
        title: 'Chương V: Phương pháp toạ độ trong không gian',
        lessons: [
          { id: 'l15-12', title: 'Bài 15: Vị trí tương đối, khoảng cách, mặt phẳng' },
          { id: 'l16-12', title: 'Bài 16: Các dạng bài toạ độ trong không gian' },
        ]
      },
      {
        id: 'c6-12',
        title: 'Chương VI: Xác suất có điều kiện và thống kê',
        lessons: [
          { id: 'l17-12', title: 'Bài 17: Xác suất có điều kiện' },
          { id: 'l18-12', title: 'Bài 18: Biến cố và phân phối' },
          { id: 'l19-12', title: 'Bài 19: Bài tổng hợp cuối năm' },
        ]
      }
    ]
  }
};