export default function EventDescription() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Descrição do evento</h2>

        <div className="space-y-3 text-gray-700 leading-relaxed text-base border-l-4 border-[#4db8ff] pl-5">
          <p className="text-lg font-medium text-gray-800">Você já imaginou ouvir as músicas que marcaram sua vida como nunca antes?</p>
          <p>Agora imagine isso ao vivo. Em um teatro. Com uma banda poderosa. E um piano que arrepia do começo ao fim.</p>
          <p className="font-semibold text-[#0d1f3c]">O Piano Pop não é um show. É uma experiência emocional.</p>
          <p>Se você ama música… esse é o tipo de noite que fica na memória.</p>
        </div>
      </section>

      <section>
        <p className="text-gray-700 leading-relaxed">
          Piano Pop é um espetáculo musical moderno e envolvente que une piano ao vivo, banda e arranjos impactantes,
          criando uma experiência sonora e visual única. Com uma atmosfera intensa, iluminação cênica e interpretação
          cheia de presença, o show conduz o público por momentos de emoção, energia e conexão.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Mais do que um concerto, Piano Pop é uma experiência. Cada música é pensada para surpreender, emocionar e
          marcar quem está na plateia, em um formato dinâmico que conversa com públicos de todas as idades.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-[#0d1f3c] mb-4">O espetáculo inclui</h3>
        <ul className="space-y-2">
          {['Piano ao vivo', 'Banda ao vivo', 'Direção pensada para teatro', 'Experiência sonora envolvente'].map(item => (
            <li key={item} className="flex items-center gap-3 text-gray-700">
              <span className="w-2 h-2 rounded-full bg-[#4db8ff] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gradient-to-br from-[#0a1628] to-[#0d1f3c] rounded-xl p-6 text-white">
        <p className="text-lg font-semibold mb-2">Imagine as músicas que marcaram a sua vida…</p>
        <p className="text-gray-300 leading-relaxed">
          Agora imagine elas ao vivo, no palco de um teatro, tocadas em versões exclusivas no piano e uma atmosfera envolvente.
        </p>
        <p className="text-gray-200 leading-relaxed mt-3">
          O Piano Pop é um espetáculo onde o piano encontra os grandes clássicos do pop:{' '}
          <span className="text-[#4db8ff] font-semibold">Coldplay, Queen, Bon Jovi, Beatles</span>,
          {' '}em versões intensas, elegantes e cheias de energia.
        </p>
      </section>
    </div>
  );
}
