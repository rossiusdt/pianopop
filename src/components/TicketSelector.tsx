import { useState } from 'react';
import { BadgeCheck, AlertCircle, Sun, Moon } from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import { track } from '../lib/analytics';

type TicketType = 'passaporte' | 'festa-unica' | null;

const DAYS = ['28 de Dezembro', '29 de Dezembro', '30 de Dezembro', '31 de Dezembro', '1 de Janeiro'];
const SESSIONS: Record<string, { label: string; icon: React.ReactNode }> = {
  DIA: { label: 'DIA', icon: <Sun className="w-4 h-4" /> },
  NOITE: { label: 'NOITE', icon: <Moon className="w-4 h-4" /> },
};

const PASSAPORTE_PRICE = 99097;
const FESTA_PRICE = 29797;

export default function TicketSelector() {
  const [selected, setSelected] = useState<TicketType>(null);
  const [showConflict, setShowConflict] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const selectTicket = (type: TicketType) => {
    if (selected !== null && selected !== type) {
      setShowConflict(true);
      return;
    }
    setShowConflict(false);
    if (selected === type) {
      setSelected(null);
      setSelectedDay(null);
      setSelectedSession(null);
    } else {
      setSelected(type);
    }
  };

  const canCheckout =
    selected === 'passaporte' ||
    (selected === 'festa-unica' && selectedDay !== null && selectedSession !== null);

  const totalAmount = selected === 'passaporte' ? PASSAPORTE_PRICE : FESTA_PRICE;

  const selectedSummary = selected === 'passaporte'
    ? 'PASSAPORTE ALL-INCLUSIVE'
    : selected === 'festa-unica' && selectedDay && selectedSession
      ? `FESTA ÚNICA — ${selectedDay} (${selectedSession})`
      : '';

  const pixItems = selected === 'passaporte'
    ? [{ title: 'PASSAPORTE ALL-INCLUSIVE — Réveillon Arcanjos 2027', unitPrice: PASSAPORTE_PRICE, quantity: 1 }]
    : [{ title: `FESTA ÚNICA — ${selectedDay} (${selectedSession}) — Réveillon Arcanjos 2027`, unitPrice: FESTA_PRICE, quantity: 1 }];

  const checkoutButtonLabel = () => {
    if (!selected) return 'Selecione um Ingresso';
    if (selected === 'festa-unica' && !selectedDay) return 'Escolha o dia';
    if (selected === 'festa-unica' && !selectedSession) return 'Escolha DIA ou NOITE';
    return 'Finalizar Compra';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
        <p className="text-gray-700 font-medium mb-4">Escolha uma opção</p>

        {/* Aviso de conflito */}
        {showConflict && (
          <div className="mb-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-snug">
              Cada compra permite apenas um tipo de ingresso. Para adquirir ingressos diferentes, finalize esta compra e realize uma nova.
            </p>
          </div>
        )}

        <div className="space-y-3 mb-6">

          {/* PASSAPORTE ALL-INCLUSIVE */}
          <button
            onClick={() => selectTicket('passaporte')}
            className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
              selected === 'passaporte'
                ? 'border-[#3d0f0f] bg-red-50'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white bg-[#3d0f0f] px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Completo
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">PASSAPORTE ALL-INCLUSIVE</h3>
                <p className="text-xs text-gray-500 mt-0.5">28 de Dez a 1 de Jan · Acesso a todos os dias</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold text-gray-900">R$ 990,97</p>
              </div>
            </div>
            {selected === 'passaporte' && (
              <div className="mt-3 pt-3 border-t border-red-200">
                <p className="text-xs text-[#3d0f0f] font-semibold">Acesso completo de 28 de Dezembro a 1 de Janeiro, DIA e NOITE.</p>
              </div>
            )}
          </button>

          {/* FESTA ÚNICA */}
          <button
            onClick={() => selectTicket('festa-unica')}
            className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
              selected === 'festa-unica'
                ? 'border-[#3d0f0f] bg-red-50'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm">FESTA ÚNICA</h3>
                <p className="text-xs text-gray-500 mt-0.5">Escolha um dia entre 28/Dez e 1/Jan · DIA ou NOITE</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold text-gray-900">R$ 297,97</p>
              </div>
            </div>
          </button>

          {/* Seletor de dia e sessão */}
          {selected === 'festa-unica' && (
            <div className="border border-red-200 rounded-xl p-4 bg-red-50/50 space-y-4">
              {/* Dia */}
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Selecione o dia</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {DAYS.map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                      className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                        selectedDay === day
                          ? 'bg-[#3d0f0f] text-white border-[#3d0f0f]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-red-400'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sessão */}
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Selecione o período</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(SESSIONS).map(([key, { label, icon }]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedSession(selectedSession === key ? null : key)}
                      className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm font-bold transition-all border ${
                        selectedSession === key
                          ? 'bg-[#3d0f0f] text-white border-[#3d0f0f]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-red-400'
                      }`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            if (!canCheckout) return;
            setModalOpen(true);
            track('checkout_open', { summary: selectedSummary, total: totalAmount });
          }}
          disabled={!canCheckout}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors"
        >
          {checkoutButtonLabel()}
        </button>

        {/* Selo de reembolso */}
        <div className="mt-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center flex-shrink-0 shadow-sm">
            <BadgeCheck className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-bold text-green-800 leading-tight">Reembolso garantido</p>
            <p className="text-xs text-green-700 mt-0.5 leading-snug">
              Em caso de desistência, seu dinheiro será devolvido integralmente.
            </p>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedSummary={selectedSummary}
        items={pixItems}
        totalAmount={totalAmount}
      />
    </>
  );
}
