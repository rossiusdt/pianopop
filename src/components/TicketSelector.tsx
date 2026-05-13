import { useState } from 'react';
import { BadgeCheck, AlertCircle, Map, Minus, Plus } from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import VenueMap, { SECTORS, type Sector } from './VenueMap';
import { track } from '../lib/analytics';

type TicketType = 'ingresso' | 'setor' | null;

const INGRESSO_PRICE = 20000;
const MAX_QTY = 10;

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
}

const TIER_LABEL: Record<string, string> = {
  ouro: 'Ouro',
  prata: 'Prata',
  bronze: 'Bronze',
  'abbey-ouro': 'Abbey Ouro',
  'abbey-prata': 'Abbey Prata',
};

export default function TicketSelector() {
  const [selected, setSelected] = useState<TicketType>(null);
  const [showConflict, setShowConflict] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const selectTicket = (type: TicketType) => {
    if (selected !== null && selected !== type) {
      setShowConflict(true);
      return;
    }
    setShowConflict(false);
    if (selected === type) {
      setSelected(null);
      setSelectedSector(null);
    } else {
      setSelected(type);
      if (type === 'setor') setMapOpen(true);
    }
  };

  const handleSectorSelect = (sector: Sector) => {
    setSelectedSector(sector);
  };

  const handleMapClose = () => {
    setMapOpen(false);
    if (!selectedSector) setSelected(null);
  };

  const canCheckout =
    selected === 'ingresso' ||
    (selected === 'setor' && selectedSector !== null);

  const totalAmount = selected === 'ingresso' ? INGRESSO_PRICE * qty : (selectedSector?.price ?? 0);

  const selectedSummary = selected === 'ingresso'
    ? `ÁREA VIP — ${qty}x ingresso${qty > 1 ? 's' : ''} — Pier Rock Festival`
    : selectedSector
      ? `${selectedSector.category === 'bistro' ? 'BISTRÔ' : 'CAMAROTE'} ${TIER_LABEL[selectedSector.tier]} (${selectedSector.label}) — Pier Rock Festival`
      : '';

  const pixItems = selected === 'ingresso'
    ? [{ title: 'ÁREA VIP — Pier Rock Festival', unitPrice: INGRESSO_PRICE, quantity: qty }]
    : selectedSector
      ? [{
          title: `${selectedSector.category === 'bistro' ? 'Bistrô' : 'Camarote'} ${TIER_LABEL[selectedSector.tier]} (${selectedSector.label}) — Pier Rock Festival`,
          unitPrice: selectedSector.price,
          quantity: 1,
        }]
      : [];

  const checkoutButtonLabel = () => {
    if (!selected) return 'Selecione um Ingresso';
    if (selected === 'setor' && !selectedSector) return 'Escolha um setor no mapa';
    if (selected === 'ingresso') return `Finalizar Compra — ${formatCurrency(INGRESSO_PRICE * qty)}`;
    return 'Finalizar Compra';
  };

  const minSectorPrice = Math.min(...SECTORS.map(s => s.price));

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
        <p className="text-gray-700 font-medium mb-4">Escolha uma opção</p>

        {showConflict && (
          <div className="mb-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-snug">
              Cada compra permite apenas um tipo de ingresso. Finalize esta compra antes de escolher outro.
            </p>
          </div>
        )}

        <div className="space-y-3 mb-6">

          {/* ÁREA VIP */}
          <button
            onClick={() => selectTicket('ingresso')}
            className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
              selected === 'ingresso'
                ? 'border-[#3d0f0f] bg-red-50'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Promocional
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">ÁREA VIP</h3>
                <p className="text-xs text-gray-500 mt-0.5">Acesso à área VIP · 11 de Julho</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold text-gray-900">{formatCurrency(INGRESSO_PRICE)}</p>
                <p className="text-xs text-gray-400">por ingresso</p>
              </div>
            </div>

            {selected === 'ingresso' && (
              <div className="mt-3 pt-3 border-t border-red-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Quantidade</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setQty(q => Math.max(1, q - 1)); }}
                      className="w-7 h-7 rounded-full border-2 border-[#3d0f0f] text-[#3d0f0f] flex items-center justify-center hover:bg-[#3d0f0f] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={qty <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-base font-bold text-gray-900 w-4 text-center">{qty}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setQty(q => Math.min(MAX_QTY, q + 1)); }}
                      className="w-7 h-7 rounded-full border-2 border-[#3d0f0f] text-[#3d0f0f] flex items-center justify-center hover:bg-[#3d0f0f] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={qty >= MAX_QTY}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">{qty} × {formatCurrency(INGRESSO_PRICE)}</p>
                  <p className="text-sm font-bold text-[#3d0f0f]">{formatCurrency(INGRESSO_PRICE * qty)}</p>
                </div>
              </div>
            )}
          </button>

          {/* CAMAROTES & BISTRÔS */}
          <button
            onClick={() => selectTicket('setor')}
            className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
              selected === 'setor'
                ? 'border-[#3d0f0f] bg-red-50'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white bg-[#e8a838] px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Exclusivo
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">CAMAROTES & BISTRÔS</h3>
                <p className="text-xs text-gray-500 mt-0.5">Com ingressos inclusos · Escolha seu setor no mapa</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-400">a partir de</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(minSectorPrice)}</p>
              </div>
            </div>

            {selected === 'setor' && (
              <div className="mt-3 pt-3 border-t border-red-200">
                {selectedSector ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#3d0f0f]">
                        {selectedSector.category === 'bistro' ? 'Bistrô' : 'Camarote'} {TIER_LABEL[selectedSector.tier]} — {selectedSector.label}
                      </p>
                      <p className="text-xs text-gray-500">{selectedSector.includes} ingressos · sem consumação</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setMapOpen(true); }}
                      className="text-xs text-[#3d0f0f] font-semibold flex items-center gap-1 underline underline-offset-2"
                    >
                      <Map className="w-3 h-3" /> Alterar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); setMapOpen(true); }}
                    className="w-full flex items-center justify-center gap-2 bg-[#3d0f0f] text-white text-xs font-bold py-2.5 rounded-lg hover:bg-[#5a1515] transition-colors"
                  >
                    <Map className="w-3.5 h-3.5" /> Ver mapa de setores
                  </button>
                )}
              </div>
            )}
          </button>
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

      <VenueMap
        isOpen={mapOpen}
        onClose={handleMapClose}
        onSelect={handleSectorSelect}
        selectedId={selectedSector?.id ?? null}
      />

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
