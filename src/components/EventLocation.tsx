import { MapPin, ExternalLink } from 'lucide-react';

export default function EventLocation() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Local</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Teatro CIEE-RS Banrisul</h3>
          <div className="text-gray-600 space-y-1">
            <p>Porto Alegre, Rio Grande do Sul</p>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=Teatro+CIEE-RS+Banrisul+Porto+Alegre"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#0d1f3c] hover:text-[#1a3a6e] font-semibold border border-[#0d1f3c] hover:border-[#1a3a6e] px-4 py-2 rounded-full transition-colors"
        >
          <MapPin className="w-4 h-4" />
          VER NO MAPA
        </a>

        <div className="pt-6 border-t">
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="text-[#0d1f3c] hover:text-[#1a3a6e] flex items-center gap-1">
              Termos e políticas
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="#" className="text-[#0d1f3c] hover:text-[#1a3a6e] flex items-center gap-1">
              Denunciar este evento
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
