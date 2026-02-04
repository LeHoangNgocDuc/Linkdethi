import React from 'react';
import { CENTER_NAME } from '../constants';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{CENTER_NAME}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Nơi khơi dậy niềm đam mê Toán học. Chúng tôi cung cấp nền tảng ôn luyện toàn diện giúp học sinh đạt kết quả cao nhất.
            </p>
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} All Rights Reserved.
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Liên Hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-red-500" />
                <span>123 Đường Toán Học, Quận Giáo Dục, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500" />
                <span>(028) 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-yellow-500" />
                <span>contact@trungtamtoanhoc.edu.vn</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Liên Kết</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn thi online</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;