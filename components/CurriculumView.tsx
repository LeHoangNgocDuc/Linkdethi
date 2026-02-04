import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_CURRICULUM, NAV_ITEMS, GOOGLE_SCRIPT_EXAM_URL } from '../constants';
import { ChevronDown, ChevronRight, FileText, ExternalLink, CheckCircle, Copy, Edit2, Save } from 'lucide-react';

const CurriculumView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  
  // State for Admin and Exam Codes
  const [isAdmin, setIsAdmin] = useState(false);
  const [examCodes, setExamCodes] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempCode, setTempCode] = useState('');

  const gradeId = id || '6'; // Default to 6 if undefined
  const data = MOCK_CURRICULUM[gradeId];

  useEffect(() => {
    // Check Admin status
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');

    // Load saved exam codes
    const savedCodes = localStorage.getItem('curriculum_exam_codes');
    if (savedCodes) {
      setExamCodes(JSON.parse(savedCodes));
    }
  }, []);

  // If grade not found (e.g. user typed /grade/99)
  if (!data) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy dữ liệu</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4">Quay về trang chủ</Link>
      </div>
    );
  }

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleEnterExam = () => {
    window.open(GOOGLE_SCRIPT_EXAM_URL, '_blank');
  };

  const handleEditCode = (lessonId: string, currentCode: string) => {
    setEditingId(lessonId);
    setTempCode(currentCode || '');
  };

  const handleSaveCode = (lessonId: string) => {
    const updatedCodes = { ...examCodes, [lessonId]: tempCode.trim() };
    setExamCodes(updatedCodes);
    localStorage.setItem('curriculum_exam_codes', JSON.stringify(updatedCodes));
    setEditingId(null);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã đề: ${code}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation for Grades */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Danh mục lớp học</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.filter(i => i.path.includes('/grade/')).map((item) => {
                 const isActive = item.path === `/grade/${gradeId}`;
                 return (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                      {isActive && <ChevronRight size={16} />}
                    </Link>
                  </li>
                 )
              })}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
               <div className="flex items-center gap-2 mb-3 justify-center text-red-600">
                  <CheckCircle size={16} />
                  <span className="text-xs font-bold uppercase">Kiểm tra tổng hợp</span>
               </div>
               <Link to="/kiem-tra" className="block w-full text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors shadow-md transform active:scale-95 duration-150">
                 Phòng Thi Trực Tuyến
               </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="w-full lg:w-3/4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">{data.title}</h1>
            <p className="text-gray-600">
              Danh sách các bài kiểm tra thường xuyên theo chương trình SGK. 
              <br/>
              Học sinh vui lòng sao chép <strong>Mã đề</strong> (nếu có) trước khi nhấn <strong>"Vào thi"</strong>.
            </p>
          </div>

          <div className="space-y-4">
            {data.chapters.map((chapter) => (
              <div key={chapter.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="font-semibold text-gray-800">{chapter.title}</span>
                  {openChapters[chapter.id] ? <ChevronDown size={20} className="text-gray-500"/> : <ChevronRight size={20} className="text-gray-500"/>}
                </button>
                
                {/* Accordion Content */}
                {openChapters[chapter.id] && (
                  <div className="p-4 bg-white">
                    <ul className="space-y-4">
                      {chapter.lessons.map((lesson) => {
                        const code = examCodes[lesson.id];
                        const isEditing = editingId === lesson.id;

                        return (
                          <li key={lesson.id} className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all gap-4">
                            
                            {/* Lesson Info */}
                            <div className="flex items-start gap-3 w-full sm:w-auto flex-1">
                              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg mt-0.5 shrink-0">
                                 <FileText size={20} />
                              </div>
                              <div>
                                <span className="text-base font-bold text-gray-800 block leading-tight">{lesson.title}</span>
                                <span className="text-xs text-gray-500 mt-1 inline-block">Nội dung bài học & Lý thuyết</span>
                              </div>
                            </div>
                            
                            {/* Actions Group: Exam Code + Enter Exam Button */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-end">
                              
                              {/* Exam Code Section */}
                              {isAdmin ? (
                                <div className="flex items-center gap-2">
                                  {isEditing ? (
                                    <div className="flex items-center gap-2 animate-fade-in">
                                      <input
                                        type="text"
                                        value={tempCode}
                                        onChange={(e) => setTempCode(e.target.value)}
                                        className="w-28 px-2 py-1.5 text-sm border border-blue-300 rounded focus:ring-2 focus:ring-blue-100 outline-none"
                                        placeholder="Mã đề..."
                                        autoFocus
                                      />
                                      <button 
                                        onClick={() => handleSaveCode(lesson.id)}
                                        className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                      >
                                        <Save size={16} />
                                      </button>
                                    </div>
                                  ) : (
                                    <div 
                                      className="group flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-300 transition-all"
                                      onClick={() => handleEditCode(lesson.id, code)}
                                    >
                                      <span className={`text-sm font-mono ${code ? 'text-gray-900 font-bold' : 'text-gray-400 italic'}`}>
                                        {code || 'Nhập mã đề'}
                                      </span>
                                      <Edit2 size={14} className="text-gray-400 group-hover:text-blue-600" />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                // Student View for Code
                                code && (
                                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg">
                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Mã đề:</span>
                                    <span className="text-sm font-mono font-bold text-blue-900">{code}</span>
                                    <button 
                                      onClick={() => handleCopyCode(code)}
                                      className="ml-1 p-1 text-blue-400 hover:text-blue-700 hover:bg-blue-100 rounded transition-colors"
                                      title="Sao chép mã đề"
                                    >
                                      <Copy size={14} />
                                    </button>
                                  </div>
                                )
                              )}

                              {/* Enter Exam Button */}
                              <button 
                                onClick={handleEnterExam}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap"
                              >
                                <span>Vào thi</span>
                                <ExternalLink size={16} />
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-bold text-blue-900 mb-1">Chưa tìm thấy bài kiểm tra bạn cần?</h4>
              <p className="text-sm text-gray-600">Truy cập Phòng Thi Trực Tuyến để xem danh sách đầy đủ các bài thi định kỳ và chuyển cấp.</p>
            </div>
            <Link to="/kiem-tra" className="px-8 py-3 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md hover:shadow-lg whitespace-nowrap">
              Đến Phòng Kiểm Tra
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
};

export default CurriculumView;