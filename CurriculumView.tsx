import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_CURRICULUM, NAV_ITEMS, GOOGLE_SCRIPT_EXAM_URL, GOOGLE_SHEET_ID } from '../constants';
import { ChevronDown, ChevronRight, FileText, ExternalLink, CheckCircle, Copy, Edit2, Save, Trash2, Plus, X, Loader2 } from 'lucide-react';

const CurriculumView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  
  // State for Admin and Exam Codes
  const [isAdmin, setIsAdmin] = useState(false);
  const [examCodes, setExamCodes] = useState<Record<string, string>>({});
  const [isLoadingCodes, setIsLoadingCodes] = useState(false);
  
  // State for Adding a new code
  const [addingCodeFor, setAddingCodeFor] = useState<string | null>(null);
  const [tempNewCode, setTempNewCode] = useState('');

  // State for Editing an entire code string
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempEditValue, setTempEditValue] = useState('');

  const gradeId = id || '6'; // Default to 6 if undefined
  const data = MOCK_CURRICULUM[gradeId];

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    fetchCodesFromCloud();
  }, []);

  // --- API Sync Functions ---
  const fetchCodesFromCloud = async () => {
    setIsLoadingCodes(true);
    try {
      // Gọi lên Google Script để lấy dữ liệu từ Sheet
      const response = await fetch(
        `${GOOGLE_SCRIPT_EXAM_URL}?action=get_codes&sheet_id=${encodeURIComponent(GOOGLE_SHEET_ID)}`
      );
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      setExamCodes(data);
    } catch (error) {
      console.warn("Failed to fetch codes (offline or CORS):", error);
      // Fallback: use empty or cached data if available (optional)
    } finally {
      setIsLoadingCodes(false);
    }
  };

  const saveCodesToCloud = async (newCodesMap: Record<string, string>, lessonIdToSync: string) => {
    // 1. Cập nhật giao diện ngay lập tức (Optimistic UI)
    setExamCodes(newCodesMap);
    
    // 2. Gửi dữ liệu lên Google Sheet using POST with body text
    if (isAdmin) {
      try {
        await fetch(GOOGLE_SCRIPT_EXAM_URL, {
          method: 'POST',
          body: JSON.stringify({
            action: 'save_code',
            sheetId: GOOGLE_SHEET_ID,
            lessonId: lessonIdToSync,
            codes: newCodesMap[lessonIdToSync] || ""
          })
        });
      } catch (error) {
        console.error("Failed to save to cloud:", error);
        alert("Lưu thất bại. Vui lòng kiểm tra kết nối mạng.");
      }
    }
  };

  // If grade not found
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

  const getCodesList = (codeString?: string): string[] => {
    if (!codeString) return [];
    return codeString.split(',').map(c => c.trim()).filter(Boolean);
  };

  // --- Actions ---

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  const handleAddCodeStart = (lessonId: string) => {
    setAddingCodeFor(lessonId);
    setTempNewCode('');
    setEditingId(null);
  };

  const handleSaveNewCode = (lessonId: string) => {
    if (!tempNewCode.trim()) {
        setAddingCodeFor(null);
        return;
    }

    const currentString = examCodes[lessonId] || '';
    const currentList = getCodesList(currentString);
    
    // Check for duplicates
    if (!currentList.includes(tempNewCode.trim())) {
        const newList = [...currentList, tempNewCode.trim()];
        const newString = newList.join(',');
        const updatedCodes = { ...examCodes, [lessonId]: newString };
        
        saveCodesToCloud(updatedCodes, lessonId);
    }
    
    setAddingCodeFor(null);
    setTempNewCode('');
  };

  const handleRemoveSingleCode = (lessonId: string, codeToRemove: string) => {
    if (!window.confirm(`Xóa mã đề "${codeToRemove}"?`)) return;

    const currentString = examCodes[lessonId] || '';
    const currentList = getCodesList(currentString);
    const newList = currentList.filter(c => c !== codeToRemove);
    const newString = newList.join(',');

    const updatedCodes = { ...examCodes };
    if (newString) {
        updatedCodes[lessonId] = newString;
    } else {
        delete updatedCodes[lessonId];
    }
    
    saveCodesToCloud(updatedCodes, lessonId);
  };

  // Legacy Edit (Edit the whole string)
  const handleEditAllStart = (lessonId: string, currentString: string) => {
    setEditingId(lessonId);
    setTempEditValue(currentString);
    setAddingCodeFor(null);
  };

  const handleSaveEditAll = (lessonId: string) => {
    const updatedCodes = { ...examCodes, [lessonId]: tempEditValue.trim() };
    if (!tempEditValue.trim()) delete updatedCodes[lessonId];
    
    saveCodesToCloud(updatedCodes, lessonId);
    setEditingId(null);
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
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">{data.title}</h1>
              <p className="text-gray-600">
                Danh sách các bài kiểm tra thường xuyên theo chương trình SGK. 
                <br/>
                Học sinh vui lòng sao chép <strong>Mã đề</strong> trước khi nhấn <strong>"Vào thi"</strong>.
              </p>
            </div>
            {isLoadingCodes && (
              <div className="flex items-center text-blue-600 text-sm animate-pulse">
                <Loader2 size={16} className="animate-spin mr-2" />
                Đang đồng bộ...
              </div>
            )}
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
                        const codeString = examCodes[lesson.id];
                        const codeList = getCodesList(codeString);
                        const isAdding = addingCodeFor === lesson.id;
                        const isEditingAll = editingId === lesson.id;

                        return (
                          <li key={lesson.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all gap-4">
                            
                            {/* Lesson Info */}
                            <div className="flex items-start gap-3 w-full md:w-auto flex-1">
                              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg mt-0.5 shrink-0">
                                 <FileText size={20} />
                              </div>
                              <div>
                                <span className="text-base font-bold text-gray-800 block leading-tight">{lesson.title}</span>
                                <span className="text-xs text-gray-500 mt-1 inline-block">Nội dung bài học & Lý thuyết</span>
                              </div>
                            </div>
                            
                            {/* Actions Group */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
                              
                              {/* --- Code Display Section --- */}
                              <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
                                
                                {/* 1. List Existing Codes */}
                                {!isEditingAll && codeList.map((code, idx) => (
                                  <div key={idx} className="group relative flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg transition-all hover:border-blue-300">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">MÃ:</span>
                                    <span className="text-sm font-mono font-bold text-blue-900">{code}</span>
                                    
                                    {isAdmin ? (
                                        <button 
                                          onClick={() => handleRemoveSingleCode(lesson.id, code)}
                                          className="text-red-300 hover:text-red-600 ml-1 rounded-full p-0.5 hover:bg-red-50"
                                          title="Xóa mã này"
                                        >
                                          <X size={14} />
                                        </button>
                                    ) : (
                                        <button 
                                          onClick={() => handleCopyCode(code)}
                                          className="text-blue-400 hover:text-blue-700 ml-1 rounded p-0.5 hover:bg-blue-100"
                                          title="Sao chép"
                                        >
                                          <Copy size={14} />
                                        </button>
                                    )}
                                  </div>
                                ))}

                                {/* 2. Admin Actions */}
                                {isAdmin && (
                                  <>
                                    {/* Add New Code Form */}
                                    {isAdding ? (
                                      <div className="flex items-center gap-1 animate-fade-in bg-white border border-blue-300 rounded-lg p-1 shadow-sm">
                                        <input
                                          type="text"
                                          value={tempNewCode}
                                          onChange={(e) => setTempNewCode(e.target.value)}
                                          className="w-24 px-2 py-1 text-sm outline-none font-mono"
                                          placeholder="Mã mới..."
                                          autoFocus
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveNewCode(lesson.id);
                                            if (e.key === 'Escape') setAddingCodeFor(null);
                                          }}
                                        />
                                        <button onClick={() => handleSaveNewCode(lesson.id)} className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200"><CheckCircle size={14}/></button>
                                        <button onClick={() => setAddingCodeFor(null)} className="p-1 bg-gray-100 text-gray-500 rounded hover:bg-gray-200"><X size={14}/></button>
                                      </div>
                                    ) : !isEditingAll && (
                                      <button 
                                        onClick={() => handleAddCodeStart(lesson.id)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-dashed border-gray-300 text-gray-500 rounded-lg hover:text-blue-600 hover:border-blue-400 transition-all"
                                        title="Thêm mã đề khác"
                                      >
                                        <Plus size={14} />
                                        <span className="text-xs font-bold">Thêm mã</span>
                                      </button>
                                    )}

                                    {/* Bulk Edit Fallback */}
                                    {isEditingAll ? (
                                       <div className="flex items-center gap-1 w-full sm:w-auto">
                                          <input
                                            type="text"
                                            value={tempEditValue}
                                            onChange={(e) => setTempEditValue(e.target.value)}
                                            className="w-full sm:w-40 px-2 py-1.5 text-sm border border-blue-300 rounded outline-none font-mono"
                                            placeholder="Code1, Code2..."
                                            autoFocus
                                          />
                                          <button onClick={() => handleSaveEditAll(lesson.id)} className="p-1.5 bg-green-100 text-green-700 rounded"><Save size={14}/></button>
                                          <button onClick={() => setEditingId(null)} className="p-1.5 bg-gray-100 text-gray-500 rounded"><X size={14}/></button>
                                       </div>
                                    ) : (
                                       // Only show edit pencil if there is something to edit
                                       (codeList.length > 0) && (
                                         <button onClick={() => handleEditAllStart(lesson.id, codeString || '')} className="text-gray-300 hover:text-blue-600 p-1">
                                            <Edit2 size={12} />
                                         </button>
                                       )
                                    )}
                                  </>
                                )}
                              </div>

                              {/* Enter Exam Button */}
                              <button 
                                onClick={handleEnterExam}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap"
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