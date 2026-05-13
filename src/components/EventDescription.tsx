export default function EventDescription() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição do evento</h2>

        <div className="space-y-4 text-gray-700">
          <p>
            Vem aí o Pier Rock Festival! 🤘🏽🎸
          </p>
          <p>
            Com Dino Fonseca, Nando Reis e Cíntia Férsi, o Pier Rock Festival promete uma experiência intensa, daquelas que ficam na memória! 💥🎶
          </p>
          <p className="font-semibold text-[#3d0f0f]">
            Chame a sua galera! Venha curtir conosco essa noite memorável 🤩
          </p>
        </div>
      </section>

      <section className="space-y-6">
        {/* BISTRÔ */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-[#3d0f0f]/20 to-transparent" />
            <h3 className="text-lg font-bold text-[#3d0f0f] uppercase tracking-widest">Bistrô</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-[#3d0f0f]/20 to-transparent" />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="relative rounded-xl border-2 border-[#e8a838] bg-gradient-to-br from-[#fffbf0] to-[#fef3cd] p-4 shadow-sm">
              <span className="absolute -top-3 left-4 bg-[#e8a838] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Ouro</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">R$ 800<span className="text-sm font-normal text-gray-500">,00</span></p>
              <p className="text-xs text-gray-600 mt-1">6 ingressos inclusos</p>
              <p className="text-xs text-gray-400">sem consumação</p>
            </div>
            <div className="relative rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-sm">
              <span className="absolute -top-3 left-4 bg-gray-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Prata</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">R$ 700<span className="text-sm font-normal text-gray-500">,00</span></p>
              <p className="text-xs text-gray-600 mt-1">6 ingressos inclusos</p>
              <p className="text-xs text-gray-400">sem consumação</p>
            </div>
            <div className="relative rounded-xl border-2 border-[#b87333] bg-gradient-to-br from-[#fdf6f0] to-[#f5e6d8] p-4 shadow-sm">
              <span className="absolute -top-3 left-4 bg-[#b87333] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Bronze</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">R$ 600<span className="text-sm font-normal text-gray-500">,00</span></p>
              <p className="text-xs text-gray-600 mt-1">6 ingressos inclusos</p>
              <p className="text-xs text-gray-400">sem consumação</p>
            </div>
          </div>
        </div>

        {/* CAMAROTE */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-[#3d0f0f]/20 to-transparent" />
            <h3 className="text-lg font-bold text-[#3d0f0f] uppercase tracking-widest">Camarote</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-[#3d0f0f]/20 to-transparent" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative rounded-xl border-2 border-[#e8a838] bg-gradient-to-br from-[#fffbf0] to-[#fef3cd] p-4 shadow-sm">
              <span className="absolute -top-3 left-4 bg-[#e8a838] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Ouro</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">R$ 1.000<span className="text-sm font-normal text-gray-500">,00</span></p>
              <p className="text-xs text-gray-600 mt-1">10 ingressos inclusos</p>
              <p className="text-xs text-gray-400">sem consumação</p>
            </div>
            <div className="relative rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-sm">
              <span className="absolute -top-3 left-4 bg-gray-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Prata</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">R$ 900<span className="text-sm font-normal text-gray-500">,00</span></p>
              <p className="text-xs text-gray-600 mt-1">10 ingressos inclusos</p>
              <p className="text-xs text-gray-400">sem consumação</p>
            </div>
            <div className="relative rounded-xl border-2 border-[#e8a838] bg-gradient-to-br from-[#fffbf0] to-[#fef3cd] p-4 shadow-sm">
              <span className="absolute -top-3 left-4 bg-[#e8a838] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Abbey Ouro</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">R$ 750<span className="text-sm font-normal text-gray-500">,00</span></p>
              <p className="text-xs text-gray-600 mt-1">10 ingressos inclusos</p>
              <p className="text-xs text-gray-400">sem consumação</p>
            </div>
            <div className="relative rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-sm">
              <span className="absolute -top-3 left-4 bg-gray-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Abbey Prata</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">R$ 600<span className="text-sm font-normal text-gray-500">,00</span></p>
              <p className="text-xs text-gray-600 mt-1">10 ingressos inclusos</p>
              <p className="text-xs text-gray-400">sem consumação</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
