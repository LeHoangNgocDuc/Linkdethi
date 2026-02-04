import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ExamHub from './components/ExamHub';
import CurriculumView from './components/CurriculumView';
import Footer from './components/Footer';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ExamHub />
      {/* Introduction / About Section */}
      <section className="py-16 bg-white" id="elearning">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">E-Learning & Tài Liệu</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">1</div>
              <h3 className="text-xl font-bold mb-2">Học Theo Chuyên Đề</h3>
              <p className="text-gray-600">Hệ thống bài giảng video và PDF được phân loại chi tiết theo từng chương.</p>
            </div>
            <div className="p-6 rounded-xl bg-red-50 hover:bg-red-100 transition-colors">
              <div className="w-12 h-12 bg-red-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">2</div>
              <h3 className="text-xl font-bold mb-2">Luyện Đề Thực Chiến</h3>
              <p className="text-gray-600">Kho đề thi thử phong phú, bấm giờ như thi thật để rèn luyện tâm lý.</p>
            </div>
            <div className="p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">3</div>
              <h3 className="text-xl font-bold mb-2">Thống Kê Kết Quả</h3>
              <p className="text-gray-600">Theo dõi sự tiến bộ qua từng bài kiểm tra (tích hợp trên Google System).</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
        <Header />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/elearning" element={<HomePage />} />
            <Route path="/kiem-tra" element={<HomePage />} />
            {/* Dynamic Route for Grades */}
            <Route path="/grade/:id" element={<CurriculumView />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;