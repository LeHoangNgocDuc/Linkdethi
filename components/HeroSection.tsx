import React from 'react';
import ExamRedirectButton from './ExamRedirectButton';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col items-center text-center">
        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-100 text-sm font-semibold tracking-wide">
          Cổng thông tin giáo dục & Khảo thí
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight max-w-4xl">
          Nền Tảng Ôn Luyện <br className="hidden md:block"/> & Kiểm Tra Trực Tuyến
        </h1>
        
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Hệ thống bài giảng bám sát SGK và kho đề thi phong phú từ lớp 6 đến lớp 12. 
          Giúp học sinh tự tin chinh phục mọi kỳ thi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <ExamRedirectButton 
            label="Vào Phòng Thi Ngay" 
            className="px-8 py-4 text-lg shadow-xl shadow-red-900/20"
            variant="primary"
          />
          <a 
            href="#elearning"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-semibold transition-all"
          >
            Xem tài liệu học tập
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;