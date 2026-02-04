import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, FileText, Copy, Edit2, Save, Tag, Filter, Plus, Trash2, X, Loader2 } from 'lucide-react';
import { ExamType, MockExam } from '../types';
import { MOCK_EXAMS, GOOGLE_SCRIPT_EXAM_URL, GOOGLE_SHEET_ID } from '../constants';
import ExamRedirectButton from './ExamRedirectButton';

const ExamHub: React.FC = () => {
  const [activeGrade, setActiveGrade] = useState<string>('6');
  const [activeType, setActiveType] = useState<ExamType | 'All'>('All');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // State for exam list and codes
  const [exams, setExams] = useState<MockExam[]>([]);
  const [examCodes, setExamCodes] = useState<Record<string, string>>({});
  const [isLoadingCodes, setIsLoadingCodes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // UI States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCodeValue, setEditCodeValue] = useState('');
  
  const [editingExamId, setEditingExamId] = useState<string | null>(null); // For editing exam title/duration
  const [editExamTitle, setEditExamTitle] = useState('');
  const [editExamDuration, setEditExamDuration] = useState(0);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New Exam Form State
  const [newExam, setNewExam] = useState({
    title: '',
    grade: '6',
    type: ExamType.MID_TERM_1,
    duration: 45,
    code: ''
  });

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
    fetchCodesFromCloud();
  }, []);

  const fetchCodesFromCloud = async () => {
    setIsLoadingCodes(true);
    try {
      // credentials: 'omit' is crucial for public Google Apps Scripts to work when user is signed into Google
      const response = await fetch(
        `${GOOGLE_SCRIPT_EXAM_URL}?action=get_codes&sheet_id=${encodeURIComponent(GOOGLE_SHEET_ID)}`,
        { method: 'GET', credentials: 'omit' }
      );
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setExamCodes(data);
      
      // Load Exams list from the Cloud
      // We look for the "GLOBAL_EXAM_LIST" key which is stored in the exact same sheet
      let currentExams = [...MOCK_EXAMS];
      
      if (data['GLOBAL_EXAM_LIST']) {
        try {
          // The value in the cell is a stringified JSON array
          const cloudExams = JSON.parse(data['GLOBAL_EXAM_LIST']);
          if (Array.isArray(cloudExams) && cloudExams.length > 0) {
            currentExams = cloudExams;
          }
        } catch (e) {
          console.error("Failed to parse global exam list", e);
        }
      }
      setExams(currentExams);

    } catch (error) {
      console.warn("Could not fetch codes from cloud (offline or CORS):", error);
      // Fallback to local mocks if cloud fails
      setExams(MOCK_EXAMS);
    } finally {
      setIsLoadingCodes(false);
    }
  };

  const syncCodeToCloud = async (id: string, value: string) => {
    if (!isAdmin) return;
    
    setIsSaving(true);
    try {
      // Use 'no-cors' mode to bypass browser CORS checks on POST requests to Google Apps Script.
      // The response will be opaque (we can't read it), but the request will succeed.
      // We MUST use 'text/plain' to avoid OPTION preflight requests which GAS often fails to handle.
      await fetch(GOOGLE_SCRIPT_EXAM_URL, {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ 
          action: 'save_code',
          sheetId: GOOGLE_SHEET_ID,
          lessonId: id, 
          codes: value
        })
      });
      console.log(`Sent save request for ${id}: ${value}`);
      // Notify user of success
      alert("Đã lưu mã đề thành công lên Google Sheet!");
    } catch (e) {
      console.error("Failed to sync to cloud:", e);
      alert("Lỗi lưu dữ liệu lên Google Sheet. Vui lòng kiểm tra kết nối mạng.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateGlobalExamList = (updatedExamsList: MockExam[]) => {
    setExams(updatedExamsList);
    // Save the FULL list to the cloud sheet with key "GLOBAL_EXAM_LIST"
    syncCodeToCloud('GLOBAL_EXAM_LIST', JSON.stringify(updatedExamsList));
  };

  const saveCodesLocalAndCloud = (updatedCodes: Record<string, string>, changedId: string) => {
    setExamCodes(updatedCodes);
    syncCodeToCloud(changedId, updatedCodes[changedId] || '');
  };

  const filteredExams = exams.filter(exam => {
    const matchesGrade = exam.grade === activeGrade;
    const matchesType = activeType === 'All' || exam.type === activeType;
    return matchesGrade && matchesType;
  });

  // --- Code Logic ---
  const handleEditCodeClick = (id: string, currentCode: string) => {
    setEditingId(id);
    setEditCodeValue(currentCode || '');
  };

  const handleSaveCode = (id: string) => {
    const updatedCodes = { ...examCodes, [id]: editCodeValue.trim() };
    saveCodesLocalAndCloud(updatedCodes, id);
    setEditingId(null);
  };

  const handleDeleteCode = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa mã đề này?')) {
       const updatedCodes = { ...examCodes };
       delete updatedCodes[id];
       saveCodesLocalAndCloud(updatedCodes, id);
       setEditingId(null);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã đề: ${code}`);
  };

  // --- Exam Logic ---
  const handleDeleteExam = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa đề thi này? Hành động này không thể hoàn tác.')) {
      const updatedExams = exams.filter(e => e.id !== id);
      updateGlobalExamList(updatedExams);
      
      // Also cleanup code
      const updatedCodes = { ...examCodes };
      delete updatedCodes[id];
      saveCodesLocalAndCloud(updatedCodes, id);
    }
  };

  const handleStartEditExam = (exam: MockExam) => {
    setEditingExamId(exam.id);
    setEditExamTitle(exam.title);
    setEditExamDuration(exam.duration);
  };

  const handleSaveExamEdit = (id: string) => {
    const updatedExams = exams.map(e => {
      if (e.id === id) {
        return { ...e, title: editExamTitle, duration: editExamDuration };
      }
      return e;
    });
    updateGlobalExamList(updatedExams);
    setEditingExamId(null);
  };

  const handleAddExam = () => {
    const id = `custom-${Date.now()}`;
    const newExamEntry: MockExam = {
      id,
      title: newExam.title || `Đề kiểm tra ${newExam.grade} - Mới`,
      grade: newExam.grade,
      type: newExam.type,
      duration: newExam.duration
    };

    // Update Exam List
    const updatedExams = [newExamEntry, ...exams];
    updateGlobalExamList(updatedExams);

    // Update Code if provided
    if (newExam.code) {
      const updatedCodes = { ...examCodes, [id]: newExam.code };
      saveCodesLocalAndCloud(updatedCodes, id);
    }

    setIsAddModalOpen(false);
    // Reset form
    setNewExam({
      title: '',
      grade: activeGrade,
      type: ExamType.MID_TERM_1,
      duration: 45,
      code: ''
    });
    // Switch to the grade of the new exam to see it
    setActiveGrade(newExam.grade);
    setActiveType('All');
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
                   setActiveType('All'); 
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

          {/* Secondary Tabs: EXAM TYPE & ADD BUTTON */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="inline-flex flex-wrap justify-center items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200 w-full sm:w-auto">
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

            <div className="flex items-center gap-3">
               {(isLoadingCodes || isSaving) && (
                  <div className="flex items-center text-blue-600 text-xs animate-pulse bg-blue-50 px-3 py-2 rounded-lg">
                    <Loader2 size={14} className="animate-spin mr-2" />
                    {isSaving ? "Đang lưu..." : "Đang đồng bộ..."}
                  </div>
               )}
               {isAdmin && (
                 <button 
                   onClick={() => setIsAddModalOpen(true)}
                   className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95"
                 >
                   <Plus size={20} />
                   Thêm đề thi mới
                 </button>
               )}
            </div>
          </div>
        </div>

        {/* Exam Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam) => {
              const code = examCodes[exam.id];
              const isEditingCode = editingId === exam.id;
              const isEditingExam = editingExamId === exam.id;
              const isSpecial = exam.type === ExamType.TS10 || exam.type === ExamType.THPTQG;

              return (
                <div key={exam.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group relative">
                  {/* Delete Button for Admin */}
                  {isAdmin && (
                     <button 
                       onClick={() => handleDeleteExam(exam.id)}
                       className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                       title="Xóa đề thi"
                     >
                       <Trash2 size={16} />
                     </button>
                  )}

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
                      
                      {isEditingExam ? (
                         <div className="flex items-center gap-1">
                           <input 
                             type="number" 
                             value={editExamDuration}
                             onChange={(e) => setEditExamDuration(Number(e.target.value))}
                             className="w-12 text-xs border rounded p-1"
                           />
                           <span className="text-xs">phút</span>
                         </div>
                      ) : (
                        <span className="flex items-center text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">
                          <Clock size={12} className="mr-1" />
                          {exam.duration}'
                        </span>
                      )}
                    </div>
                    
                    {/* Title Section */}
                    <div className="mb-2 min-h-[3.5rem] flex items-start gap-2">
                      {isEditingExam ? (
                        <div className="w-full flex gap-2">
                          <textarea 
                            value={editExamTitle} 
                            onChange={(e) => setEditExamTitle(e.target.value)}
                            className="w-full text-sm font-bold border rounded p-1 focus:ring-1 focus:ring-blue-500 outline-none"
                            rows={2}
                          />
                          <button onClick={() => handleSaveExamEdit(exam.id)} className="text-green-600 hover:bg-green-50 p-1 rounded"><Save size={16}/></button>
                          <button onClick={() => setEditingExamId(null)} className="text-gray-400 hover:bg-gray-50 p-1 rounded"><X size={16}/></button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 w-full">{exam.title}</h3>
                          {isAdmin && (
                            <button onClick={() => handleStartEditExam(exam)} className="text-gray-400 hover:text-blue-600 shrink-0" title="Sửa tên đề">
                               <Edit2 size={14} />
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-4">
                       <FileText size={16} className="mr-2" />
                       <span>{exam.type}</span>
                    </div>

                    {/* Code Section */}
                    <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-dashed border-blue-200 hover:border-blue-300 transition-colors">
                       <div className="flex justify-between items-center mb-1">
                         <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Mã đề thi</span>
                         {isAdmin && !isEditingCode && (
                           <button 
                             onClick={() => handleEditCodeClick(exam.id, code)}
                             className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors"
                             title="Chỉnh sửa mã đề"
                           >
                             <Edit2 size={14} />
                           </button>
                         )}
                       </div>
                       
                       {isEditingCode ? (
                         <div className="flex gap-2">
                           <input 
                             type="text" 
                             value={editCodeValue}
                             onChange={(e) => setEditCodeValue(e.target.value)}
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
                           {/* Only show delete if there was a code previously or deleting empty? just delete current entry */}
                           <button 
                             onClick={() => handleDeleteCode(exam.id)}
                             className="bg-red-100 text-red-600 p-1.5 rounded hover:bg-red-200"
                             title="Xóa mã đề"
                           >
                             <Trash2 size={16} />
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
                 <p className="text-sm mt-1 text-gray-500">Vui lòng chọn lớp hoặc loại kiểm tra khác.</p>
                 {isAdmin && (
                   <button onClick={() => setIsAddModalOpen(true)} className="mt-4 text-blue-600 hover:underline font-bold">
                     + Thêm bài thi ngay
                   </button>
                 )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ADD EXAM MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
            <div className="bg-blue-800 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Thêm Đề Thi Mới</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="hover:bg-blue-700 p-1 rounded-full"><X size={20}/></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên đề thi <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newExam.title} 
                  onChange={e => setNewExam({...newExam, title: e.target.value})}
                  placeholder="VD: Đề kiểm tra 1 tiết Đại số..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Khối lớp</label>
                  <select 
                    value={newExam.grade} 
                    onChange={e => setNewExam({...newExam, grade: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                  >
                    {grades.map(g => <option key={g} value={g}>Lớp {g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian (phút)</label>
                  <input 
                    type="number" 
                    value={newExam.duration} 
                    onChange={e => setNewExam({...newExam, duration: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại bài thi</label>
                <select 
                  value={newExam.type} 
                  onChange={e => setNewExam({...newExam, type: e.target.value as ExamType})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                >
                   {Object.values(ExamType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã đề (Bắt buộc)</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                  <span className="text-gray-400 mr-2 font-mono">CODE:</span>
                  <input 
                    type="text" 
                    value={newExam.code} 
                    onChange={e => setNewExam({...newExam, code: e.target.value})}
                    placeholder="VD: TOAN6_GK1_01"
                    className="w-full bg-transparent outline-none font-mono font-bold text-gray-800"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                 <button 
                   onClick={() => setIsAddModalOpen(false)}
                   className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200"
                 >
                   Hủy bỏ
                 </button>
                 <button 
                   onClick={handleAddExam}
                   disabled={!newExam.title || !newExam.code}
                   className={`flex-1 py-2.5 text-white font-bold rounded-lg shadow-md transition-all ${
                     (!newExam.title || !newExam.code) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                   }`}
                 >
                   Lưu Đề Thi
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ExamHub;