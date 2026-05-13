import { useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import { track } from '../lib/analytics';

const TICKETS = [
  {
    id: 'bronze',
    label: 'CADEIRA BRONZE',
    badge: 'Solidário',
    price: 7700,
    display: 'R$ 77,00',
  },
  {
    id: 'prata',
    label: 'CADEIRA PRATA',
    badge: 'Solidário',
    price: 11700,
    display: 'R$ 117,00',
  },
  {
    id: 'ouro',
    label: 'CADEIRA OURO',
    badge: 'Solidário',
    price: 14700,
    display: 'R$ 147,00',
  },
  {
    id: 'camarote',
    label: 'CAMAROTE PARA 10 PESSOAS',
    badge: null,
    price: 91700,
    display: 'R$ 917,00',
  },
] as const;

type TicketId = typeof TICKETS[number]['id'];

export default function TicketSelector() {
  const [selected, setSelected] = useState<TicketId | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedTicket = TICKETS.find(t => t.id === selected) ?? null;

  const pixItems = selectedTicket
    ? [{ title: `${selectedTicket.label} — Cláudio Duarte - Santo André`, unitPrice: selectedTicket.price, quantity: 1 }]
    : [];

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
        <p className="text-gray-700 font-medium mb-4">Escolha uma opção</p>

        <div className="space-y-3 mb-6">
          {TICKETS.map(ticket => (
            <button
              key={ticket.id}
              onClick={() => setSelected(selected === ticket.id ? null : ticket.id)}
              className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
                selected === ticket.id
                  ? 'border-[#3d0f0f] bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  {ticket.badge && (
                    <span className="text-xs font-bold text-white bg-[#3d0f0f] px-2 py-0.5 rounded-full uppercase tracking-wide mb-1 inline-block">
                      {ticket.badge}
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 text-sm">{ticket.label}</h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-gray-900">{ticket.display}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (!selectedTicket) return;
            setModalOpen(true);
            track('checkout_open', { summary: selectedTicket.label, total: selectedTicket.price });
          }}
          disabled={!selectedTicket}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors"
        >
          {selectedTicket ? 'Finalizar Compra' : 'Selecione um Ingresso'}
        </button>

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

      {selectedTicket && (
        <CheckoutModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          selectedSummary={selectedTicket.label}
          items={pixItems}
          totalAmount={selectedTicket.price}
        />
      )}
    </>
  );
}
