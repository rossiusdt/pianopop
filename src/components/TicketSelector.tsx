import { useState } from 'react';
import { BadgeCheck, Minus, Plus } from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import { track } from '../lib/analytics';

const MAX_QTY = 10;

const TICKET_TYPES = [
  { id: 'plateia-vip', label: 'Plateia VIP', price: 18000, badge: 'Destaque', badgeColor: 'bg-[#0d1f3c]' },
  { id: 'mezanino', label: 'Mezanino', price: 12000, badge: null, badgeColor: '' },
  { id: 'plateia-vip-meia', label: 'Plateia VIP', price: 8000, badge: 'Meia-entrada', badgeColor: 'bg-amber-600' },
  { id: 'mezanino-meia', label: 'Mezanino', price: 6000, badge: 'Meia-entrada', badgeColor: 'bg-amber-600' },
] as const;

type TicketId = typeof TICKET_TYPES[number]['id'];

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
}

export default function TicketSelector() {
  const [quantities, setQuantities] = useState<Record<TicketId, number>>({
    'plateia-vip': 0,
    'mezanino': 0,
    'plateia-vip-meia': 0,
    'mezanino-meia': 0,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const setQty = (id: TicketId, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, Math.min(MAX_QTY, prev[id] + delta)),
    }));
  };

  const totalAmount = TICKET_TYPES.reduce((sum, t) => sum + t.price * quantities[t.id], 0);
  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const canCheckout = totalTickets > 0;

  const pixItems = TICKET_TYPES
    .filter(t => quantities[t.id] > 0)
    .map(t => ({
      title: `${t.label}${t.badge === 'Meia-entrada' ? ' (Meia-entrada)' : ''} — Espetáculo Piano Pop`,
      unitPrice: t.price,
      quantity: quantities[t.id],
    }));

  const selectedSummary = TICKET_TYPES
    .filter(t => quantities[t.id] > 0)
    .map(t => `${quantities[t.id]}x ${t.label}${t.badge === 'Meia-entrada' ? ' (meia)' : ''}`)
    .join(', ');

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
        <p className="text-gray-800 font-semibold mb-4 text-base">Selecione seus ingressos</p>

        <div className="space-y-3 mb-6">
          {TICKET_TYPES.map(ticket => {
            const qty = quantities[ticket.id];
            return (
              <div
                key={ticket.id}
                className={`border-2 rounded-xl p-4 transition-all ${
                  qty > 0 ? 'border-[#0d1f3c] bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {ticket.badge && (
                      <span className={`text-[10px] font-bold text-white ${ticket.badgeColor} px-2 py-0.5 rounded-full uppercase tracking-wide inline-block mb-1`}>
                        {ticket.badge}
                      </span>
                    )}
                    <p className="font-bold text-gray-900 text-sm leading-tight">{ticket.label}</p>
                    <p className="text-lg font-bold text-[#0d1f3c] mt-0.5">{formatCurrency(ticket.price)}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setQty(ticket.id, -1)}
                      disabled={qty <= 0}
                      className="w-8 h-8 rounded-full border-2 border-[#0d1f3c] text-[#0d1f3c] flex items-center justify-center hover:bg-[#0d1f3c] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-base font-bold text-gray-900 w-5 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(ticket.id, 1)}
                      disabled={qty >= MAX_QTY}
                      className="w-8 h-8 rounded-full border-2 border-[#0d1f3c] text-[#0d1f3c] flex items-center justify-center hover:bg-[#0d1f3c] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {qty > 0 && (
                  <div className="mt-2 pt-2 border-t border-blue-200 flex items-center justify-between">
                    <p className="text-xs text-gray-500">{qty} × {formatCurrency(ticket.price)}</p>
                    <p className="text-sm font-bold text-[#0d1f3c]">{formatCurrency(ticket.price * qty)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {canCheckout && (
          <div className="mb-4 flex items-center justify-between text-sm px-1">
            <span className="text-gray-500">{totalTickets} ingresso{totalTickets > 1 ? 's' : ''}</span>
            <span className="font-bold text-gray-900 text-base">{formatCurrency(totalAmount)}</span>
          </div>
        )}

        <button
          onClick={() => {
            if (!canCheckout) return;
            setModalOpen(true);
            track('checkout_open', { summary: selectedSummary, total: totalAmount });
          }}
          disabled={!canCheckout}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors"
        >
          {canCheckout ? `Finalizar Compra — ${formatCurrency(totalAmount)}` : 'Selecione um ingresso'}
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
