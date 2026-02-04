import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, FileText, Copy, Edit2, Save, Tag, Filter } from 'lucide-react';
import { ExamType } from '../types';
import { MOCK_EXAMS } from '../constants';
import ExamRedirectButton from './ExamRedirectButton';

const ExamHub: React.FC = () => {
  const [activeGrade, setActiveGrade] = useState<string>('6');
  const [activeType, setActiveType] = useState<ExamType | 'All'>('All');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Local state to store exam codes. 
  const [examCodes, setExamCodes] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempCode, setTempCode] = useState('');

  const grades = ['6', '7', '8', '9', '10', '11', '12'];
  
  // Available types based on Grade
  const getAvailableTypes = (grade: string) => {
    const baseTypes = [
      ExamType.MID_TERM_1,
      ExamType.FINAL_TERM_1,
      ExamType.MID_TERM_2,
      ExamType.FINAL_TERM_2
    ];
    if (grade === '9') return [...baseTypes, ExamType.TS10];
    if (grade === '12') return [...baseTypes, ExamType.THPTQG];
    return baseTypes;
  };

  // Helper to get short label for filter buttons
  const getShortLabel = (type: ExamType) => {
    switch(type) {
      case ExamType.MID_TERM_1: return 'GKI';
      case ExamType.FINAL_TERM_1: return 'CKI';
      case ExamType.MID_TERM_2: return 'GKII';
      case ExamType.FINAL_TERM_2: return 'CKII';
      case ExamType.TS10: return 'TS10';
      case ExamType.THPTQG: return 'THPTQG';
      default: return type;
    }
  };

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    const savedCodes = localStorage.getItem('examCodes');
    if (savedCodes) {
      setExamCodes(JSON.parse(savedCodes));
    }
  }, []);

  const filteredExams = MOCK_EXAMS.filter(exam => {
    const matchesGrade = exam.grade === activeGrade;
    const matchesType = activeType === 'All' || exam.type === activeType;
    return matchesGrade && matchesType;
  });

  const handleEditClick = (id: string, currentCode: string) => {
    setEditingId(id);
    setTempCode(currentCode || '');
  };

  const handleSaveCode = (id: string) => {
    const updatedCodes = { ...examCodes, [id]: tempCode };
    setExamCodes(updatedCodes);
    localStorage.setItem('examCodes', JSON.stringify(updatedCodes));
    setEditingId(null);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã đề: ${code}`);
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen" id="exam-hub">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-sm">
             <Clock size={16} />
             <span>Cổng Thi Trực Tuyến</span>
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Phòng Kiểm Tra Định Kỳ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Luyện tập với các đề thi Giữa kỳ, Cuối kỳ và Chuyển cấp (TS10, THPTQG). <br/>
            Học sinh vui lòng nhập <strong>Mã đề</strong> để bắt đầu làm bài.
          </p>
        </div>

        {/* Controls Container */}
        <div className="flex flex-col gap-6 mb-10 max-w-6xl mx-auto">
          
          {/* Primary Tabs: GRADES */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => {
                   setActiveGrade(grade);
                   setActiveType('All'); // Reset type filter when changing grade
                }}
                className={`px-4 sm:px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                  activeGrade === grade
                    ? 'bg-blue-700 text-white border-blue-700 ring-2 ring-blue-200 ring-offset-1 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-blue-300'
                }`}
              >
                Lớp {grade}
              </button>
            ))}
          </div>

          {/* Secondary Tabs: EXAM TYPE */}
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
               <div className="flex items-center gap-2 px-3 py-2 text-gray-400 text-sm font-medium border-r border-gray-100 mr-1 hidden sm:flex">
                 <Filter size={16} />
                 <span>Lọc theo:</span>
               </div>
               <button
                  onClick={() => setActiveType('All')}
                  className={`px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${
                    activeType === 'All' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                  }`}
               >
                 Tất cả
               </button>
               {getAvailableTypes(activeGrade).map((type) => (
                 <button
                   key={type}
                   onClick={() => setActiveType(type)}
                   className={`px-3 py-1.5 rounded-md text-sm font-bold transition-colors whitespace-nowrap ${
                     activeType === type 
                       ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                       : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                   }`}
                   title={type}
                 >
                   {getShortLabel(type)}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Exam Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam) => {
              const code = examCodes[exam.id];
              const isEditing = editingId === exam.id;
              const isSpecial = exam.type === ExamType.TS10 || exam.type === ExamType.THPTQG;

              return (
                <div key={exam.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group relative">
                  {isSpecial && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 shadow-sm flex items-center gap-1">
                      <Tag size={10} /> HOT
                    </div>
                  )}
                  
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded border border-blue-200">
                          Lớp {exam.grade}
                        </span>
                        {isSpecial && (
                          <span className="bg-red-50 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded border border-red-100">
                            {exam.type === ExamType.TS10 ? 'TS10' : 'THPTQG'}
                          </span>
                        )}
                      </div>
                      <span className="flex items-center text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">
                        <Clock size={12} className="mr-1" />
                        {exam.duration}'
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[3.5rem]">{exam.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                       <FileText size={16} className="mr-2" />
                       <span>{exam.type}</span>
                    </div>

                    {/* Code Section */}
                    <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-dashed border-blue-200 hover:border-blue-300 transition-colors">
                       <div className="flex justify-between items-center mb-1">
                         <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Mã đề thi</span>
                         {isAdmin && !isEditing && (
                           <button 
                             onClick={() => handleEditClick(exam.id, code)}
                             className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors"
                             title="Giáo viên nhập mã đề"
                           >
                             <Edit2 size={14} />
                           </button>
                         )}
                       </div>
                       
                       {isEditing ? (
                         <div className="flex gap-2">
                           <input 
                             type="text" 
                             value={tempCode}
                             onChange={(e) => setTempCode(e.target.value)}
                             className="w-full text-sm border border-blue-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-200 outline-none"
                             placeholder="Nhập mã..."
                             autoFocus
                           />
                           <button 
                             onClick={() => handleSaveCode(exam.id)}
                             className="bg-green-600 text-white p-1.5 rounded hover:bg-green-700 shadow-sm"
                           >
                             <Save size={16} />
                           </button>
                         </div>
                       ) : (
                         <div className="flex items-center justify-between bg-white border border-blue-100 rounded px-3 py-2 shadow-sm">
                            <span className={`font-mono font-bold text-lg ${code ? 'text-blue-700' : 'text-gray-300 italic text-sm'}`}>
                              {code || "---"}
                            </span>
                            {code && (
                              <button 
                                onClick={() => handleCopyCode(code)}
                                className="text-gray-400 hover:text-green-600 p-1 rounded hover:bg-green-50 transition-colors"
                                title="Sao chép mã"
                              >
                                <Copy size={18} />
                              </button>
                            )}
                         </div>
                       )}
                    </div>

                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <ExamRedirectButton fullWidth label="Vào làm bài thi" variant="primary" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="flex flex-col items-center text-gray-400">
                 <div className="bg-gray-50 p-4 rounded-full mb-4">
                   <CheckCircle size={48} className="text-gray-300" />
                 </div>
                 <p className="font-bold text-lg text-gray-600">Chưa có bài thi nào cho bộ lọc này.</p>
                 <p className="text-sm mt-1 text-gray-500">Vui lòng chọn lớp hoặc loại kiểm tra khác để xem đề thi.</p>
                 <button onClick={() => { setActiveGrade('6'); setActiveType('All'); }} className="mt-4 text-blue-600 hover:underline text-sm font-medium">
                   Xem tất cả đề thi lớp 6
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExamHub;