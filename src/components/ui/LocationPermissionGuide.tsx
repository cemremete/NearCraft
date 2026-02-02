import React from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const LocationPermissionGuide: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Konum İznini Nasıl Aktifleştiririm?
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Chrome / Edge:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Adres çubuğunun solundaki kilit simgesine tıklayın</li>
              <li>"Site ayarları" veya "İzinler"i seçin</li>
              <li>"Konum" iznini "İzin ver" olarak değiştirin</li>
              <li>Sayfayı yenileyin</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Firefox:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Adres çubuğunun solundaki ünlem işaretine tıklayın</li>
              <li>"Engellenen İzinler" kısmından "Konum"u seçin</li>
              <li>"X" işaretini kaldırın</li>
              <li>Sayfayı yenileyin</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Safari:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Safari menüsünden "Tercihler" &gt; "Web Siteleri" seçin</li>
              <li>"Konum" iznini "İzin ver" olarak değiştirin</li>
              <li>Sayfayı yenileyin</li>
            </ol>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Not:</strong> Konumunuz yalnızca size yakın workshop'ları göstermek için kullanılır 
              ve asla üçüncü taraflarla paylaşılmaz.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
};
