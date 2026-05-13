import { Calendar, MapPin, Share2, ShieldCheck, Clock } from 'lucide-react';

export default function EventHero() {
  return (
    <div className="bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-[#4db8ff] font-semibold italic text-xl mb-1">Espetáculo</p>
              <h1 className="text-5xl md:text-6xl font-black leading-tight text-white uppercase tracking-tight">
                Piano Pop
              </h1>
              <p className="text-gray-300 font-semibold text-lg mt-1">com Banda</p>
            </div>

            <p className="text-[#4db8ff] font-semibold text-base">
              Atração: Show de Música Pop
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#4db8ff]" />
                <div>
                  <p className="font-semibold text-white">11 de Junho de 2026</p>
                  <p className="text-sm text-gray-400">Sábado</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#4db8ff]" />
                <div>
                  <p className="font-semibold text-white">20:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#4db8ff]" />
                <div>
                  <p className="font-semibold text-white">Teatro CIEE-RS Banrisul</p>
                  <p className="text-sm text-[#4db8ff]">Porto Alegre - RS</p>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-[#4db8ff]/40 backdrop-blur-sm rounded-2xl px-4 py-2.5">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4db8ff] to-[#1a7abf] flex items-center justify-center shadow">
                  <ShieldCheck className="w-4 h-4 text-[#0a1628]" strokeWidth={2.5} />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0a1628]" />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] font-semibold text-[#4db8ff] uppercase tracking-widest">Oficial</p>
                <p className="text-xs font-bold text-white">Única página de vendas</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#e8d44d]"
              style={{ boxShadow: '0 0 40px 8px rgba(232, 212, 77, 0.35)' }}>
              <img
                src="/69ef6a65c560d-lg.jpg"
                alt="Espetáculo Piano Pop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent" />
            </div>

            <button className="absolute top-4 right-4 bg-white/90 text-[#0d1f3c] px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-white transition-colors text-sm">
              <Share2 className="w-4 h-4" />
              COMPARTILHAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
