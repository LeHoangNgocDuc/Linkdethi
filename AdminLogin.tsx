import React, { useState } from 'react';
import { X, Lock, Key } from 'lucide-react';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Anphuc01') {
      localStorage.setItem('isAdmin', 'true');
      onLoginSuccess();
      onClose();
      setError('');
      setPassword('');
    } else {
      setError('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="bg-blue-800 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Lock size={20} />
            Đăng nhập Giáo Viên
          </div>
          <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu quản trị</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Key size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="Nhập mật khẩu..."
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
            </div>

            <button
              type="submit"
              className="bg-blue-700 text-white font-bold py-2.5 rounded-lg hover:bg-blue-800 transition-colors shadow-md mt-2"
            >
              Đăng nhập
            </button>
          </form>
          <div className="mt-4 text-center">
             <p className="text-xs text-gray-400">Chỉ dành cho quản trị viên và giáo viên của trung tâm.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;