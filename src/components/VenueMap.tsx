import { X } from 'lucide-react';

export type SectorTier = 'ouro' | 'prata' | 'bronze' | 'abbey-ouro' | 'abbey-prata';
export type SectorCategory = 'bistro' | 'camarote';

export interface Sector {
  id: string;
  label: string;
  category: SectorCategory;
  tier: SectorTier;
  price: number;
  includes: number;
}

const TIER_COLORS: Record<SectorTier, { bg: string; border: string; text: string; badge: string; badgeText: string }> = {
  ouro: {
    bg: 'bg-[#e8a838]',
    border: 'border-[#e8a838]',
    text: 'text-[#7a4a00]',
    badge: 'bg-[#e8a838]',
    badgeText: 'text-white',
  },
  prata: {
    bg: 'bg-gray-400',
    border: 'border-gray-400',
    text: 'text-gray-700',
    badge: 'bg-gray-400',
    badgeText: 'text-white',
  },
  bronze: {
    bg: 'bg-[#b87333]',
    border: 'border-[#b87333]',
    text: 'text-[#6b3f10]',
    badge: 'bg-[#b87333]',
    badgeText: 'text-white',
  },
  'abbey-ouro': {
    bg: 'bg-[#e8a838]',
    border: 'border-[#e8a838]',
    text: 'text-[#7a4a00]',
    badge: 'bg-[#e8a838]',
    badgeText: 'text-white',
  },
  'abbey-prata': {
    bg: 'bg-gray-400',
    border: 'border-gray-400',
    text: 'text-gray-700',
    badge: 'bg-gray-400',
    badgeText: 'text-white',
  },
};

const TIER_LABEL: Record<SectorTier, string> = {
  ouro: 'Ouro',
  prata: 'Prata',
  bronze: 'Bronze',
  'abbey-ouro': 'Abbey Ouro',
  'abbey-prata': 'Abbey Prata',
};

// Bistrôs: area central (middle rows), 3 tiers
// Camarotes: back + sides, 4 tiers (ouro, prata, abbey-ouro, abbey-prata)
export const SECTORS: Sector[] = [
  // BISTRÔS — centro do mapa
  { id: 'bistro-ouro-1', label: 'B01', category: 'bistro', tier: 'ouro', price: 80000, includes: 6 },
  { id: 'bistro-ouro-2', label: 'B02', category: 'bistro', tier: 'ouro', price: 80000, includes: 6 },
  { id: 'bistro-ouro-3', label: 'B03', category: 'bistro', tier: 'ouro', price: 80000, includes: 6 },
  { id: 'bistro-prata-1', label: 'B04', category: 'bistro', tier: 'prata', price: 70000, includes: 6 },
  { id: 'bistro-prata-2', label: 'B05', category: 'bistro', tier: 'prata', price: 70000, includes: 6 },
  { id: 'bistro-prata-3', label: 'B06', category: 'bistro', tier: 'prata', price: 70000, includes: 6 },
  { id: 'bistro-bronze-1', label: 'B07', category: 'bistro', tier: 'bronze', price: 60000, includes: 6 },
  { id: 'bistro-bronze-2', label: 'B08', category: 'bistro', tier: 'bronze', price: 60000, includes: 6 },
  { id: 'bistro-bronze-3', label: 'B09', category: 'bistro', tier: 'bronze', price: 60000, includes: 6 },

  // CAMAROTES OURO — parte traseira central (melhor visão)
  { id: 'cam-ouro-1', label: 'C01', category: 'camarote', tier: 'ouro', price: 100000, includes: 10 },
  { id: 'cam-ouro-2', label: 'C02', category: 'camarote', tier: 'ouro', price: 100000, includes: 10 },
  { id: 'cam-ouro-3', label: 'C03', category: 'camarote', tier: 'ouro', price: 100000, includes: 10 },

  // CAMAROTES PRATA — parte traseira lateral
  { id: 'cam-prata-1', label: 'C04', category: 'camarote', tier: 'prata', price: 90000, includes: 10 },
  { id: 'cam-prata-2', label: 'C05', category: 'camarote', tier: 'prata', price: 90000, includes: 10 },
  { id: 'cam-prata-3', label: 'C06', category: 'camarote', tier: 'prata', price: 90000, includes: 10 },
  { id: 'cam-prata-4', label: 'C07', category: 'camarote', tier: 'prata', price: 90000, includes: 10 },

  // CAMAROTES ABBEY OURO — laterais (esquerda e direita)
  { id: 'cam-abbey-ouro-1', label: 'C08', category: 'camarote', tier: 'abbey-ouro', price: 75000, includes: 10 },
  { id: 'cam-abbey-ouro-2', label: 'C09', category: 'camarote', tier: 'abbey-ouro', price: 75000, includes: 10 },
  { id: 'cam-abbey-ouro-3', label: 'C10', category: 'camarote', tier: 'abbey-ouro', price: 75000, includes: 10 },
  { id: 'cam-abbey-ouro-4', label: 'C11', category: 'camarote', tier: 'abbey-ouro', price: 75000, includes: 10 },

  // CAMAROTES ABBEY PRATA — laterais extremas
  { id: 'cam-abbey-prata-1', label: 'C12', category: 'camarote', tier: 'abbey-prata', price: 60000, includes: 10 },
  { id: 'cam-abbey-prata-2', label: 'C13', category: 'camarote', tier: 'abbey-prata', price: 60000, includes: 10 },
  { id: 'cam-abbey-prata-3', label: 'C14', category: 'camarote', tier: 'abbey-prata', price: 60000, includes: 10 },
  { id: 'cam-abbey-prata-4', label: 'C15', category: 'camarote', tier: 'abbey-prata', price: 60000, includes: 10 },
];

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
}

interface SectorButtonProps {
  sector: Sector;
  selected: boolean;
  onClick: () => void;
}

function SectorButton({ sector, selected, onClick }: SectorButtonProps) {
  const colors = TIER_COLORS[sector.tier];
  return (
    <button
      onClick={onClick}
      title={`${sector.category === 'bistro' ? 'Bistrô' : 'Camarote'} ${TIER_LABEL[sector.tier]} — ${formatCurrency(sector.price)}`}
      className={`
        w-10 h-10 rounded-lg text-[10px] font-bold transition-all duration-150 border-2 flex items-center justify-center
        ${selected
          ? `${colors.bg} ${colors.badgeText} ${colors.border} ring-2 ring-offset-1 ring-white scale-110 shadow-lg`
          : `bg-white ${colors.border} ${colors.text} hover:${colors.bg} hover:${colors.badgeText} hover:scale-105`
        }
      `}
    >
      {sector.label}
    </button>
  );
}

interface VenueMapProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (sector: Sector) => void;
  selectedId: string | null;
}

export default function VenueMap({ isOpen, onClose, onSelect, selectedId }: VenueMapProps) {
  if (!isOpen) return null;

  const bistroOuro = SECTORS.filter(s => s.category === 'bistro' && s.tier === 'ouro');
  const bistroPrata = SECTORS.filter(s => s.category === 'bistro' && s.tier === 'prata');
  const bistroBronze = SECTORS.filter(s => s.category === 'bistro' && s.tier === 'bronze');

  const camOuro = SECTORS.filter(s => s.category === 'camarote' && s.tier === 'ouro');
  const camPrata = SECTORS.filter(s => s.category === 'camarote' && s.tier === 'prata');
  const camAbbeyOuro = SECTORS.filter(s => s.category === 'camarote' && s.tier === 'abbey-ouro');
  const camAbbeyPrata = SECTORS.filter(s => s.category === 'camarote' && s.tier === 'abbey-prata');

  const selected = SECTORS.find(s => s.id === selectedId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1a0a0a] to-[#3d0f0f] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-white font-bold text-lg">Escolha seu Setor</h2>
            <p className="text-white/70 text-xs mt-0.5">Selecione um Camarote ou Bistrô no mapa</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-x-4 gap-y-1.5 border-b border-gray-100">
          {([
            { tier: 'ouro', label: 'Ouro' },
            { tier: 'prata', label: 'Prata' },
            { tier: 'bronze', label: 'Bronze' },
            { tier: 'abbey-ouro', label: 'Abbey Ouro' },
            { tier: 'abbey-prata', label: 'Abbey Prata' },
          ] as { tier: SectorTier; label: string }[]).map(({ tier, label }) => {
            const c = TIER_COLORS[tier];
            return (
              <div key={tier} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded ${c.bg} inline-block`} />
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="w-3 h-3 rounded bg-gray-200 inline-block" />
            <span className="text-xs text-gray-400">Indisponível</span>
          </div>
        </div>

        {/* MAP */}
        <div className="px-6 py-5 space-y-4">

          {/* PALCO */}
          <div className="bg-gray-900 text-white text-xs font-bold tracking-widest uppercase text-center py-3 rounded-xl">
            PALCO
          </div>

          {/* AREA VIP / PISTA */}
          <div className="bg-[#0a2a1a] text-white/60 text-xs font-semibold tracking-widest uppercase text-center py-6 rounded-xl">
            PISTA / VIP
          </div>

          {/* BISTRÔS — área central (meio do espaço) */}
          <div className="border-2 border-dashed border-[#e8a838]/50 rounded-2xl p-4 space-y-3 bg-amber-50/30">
            <p className="text-center text-xs font-bold text-[#7a4a00] uppercase tracking-widest mb-1">Bistrô</p>

            {/* Ouro row */}
            <div className="flex justify-center gap-2">
              {bistroOuro.map(s => (
                <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
              ))}
            </div>
            {/* Prata row */}
            <div className="flex justify-center gap-2">
              {bistroPrata.map(s => (
                <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
              ))}
            </div>
            {/* Bronze row */}
            <div className="flex justify-center gap-2">
              {bistroBronze.map(s => (
                <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
              ))}
            </div>
          </div>

          {/* CAMAROTES — fundo + laterais */}
          <div className="border-2 border-dashed border-[#3d0f0f]/40 rounded-2xl p-4 space-y-3 bg-red-50/20">
            <p className="text-center text-xs font-bold text-[#3d0f0f] uppercase tracking-widest mb-1">Camarote</p>

            {/* Laterais: Abbey Prata (extrema esq) | Abbey Ouro | Ouro (centro) | Abbey Ouro | Abbey Prata (extrema dir) */}
            <div className="flex items-start justify-between gap-2">
              {/* Lado esquerdo */}
              <div className="flex flex-col gap-2">
                <p className="text-[9px] text-center text-gray-400 font-semibold uppercase">Abbey Prata</p>
                {camAbbeyPrata.slice(0, 2).map(s => (
                  <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[9px] text-center text-gray-400 font-semibold uppercase">Abbey Ouro</p>
                {camAbbeyOuro.slice(0, 2).map(s => (
                  <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
                ))}
              </div>

              {/* Centro */}
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[9px] text-center text-[#b87333] font-bold uppercase">Prata</p>
                <div className="flex gap-2">
                  {camPrata.slice(0, 2).map(s => (
                    <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
                  ))}
                </div>
                <p className="text-[9px] text-center text-[#e8a838] font-bold uppercase mt-1">Ouro</p>
                <div className="flex gap-2">
                  {camOuro.map(s => (
                    <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
                  ))}
                </div>
                <div className="flex gap-2 mt-1">
                  {camPrata.slice(2).map(s => (
                    <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[9px] text-center text-gray-400 font-semibold uppercase">Abbey Ouro</p>
                {camAbbeyOuro.slice(2).map(s => (
                  <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[9px] text-center text-gray-400 font-semibold uppercase">Abbey Prata</p>
                {camAbbeyPrata.slice(2).map(s => (
                  <SectorButton key={s.id} sector={s} selected={selectedId === s.id} onClick={() => onSelect(s)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected sector info + confirm */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          {selected ? (
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 font-medium">Selecionado</p>
                <p className="font-bold text-gray-900 text-sm">
                  {selected.category === 'bistro' ? 'Bistrô' : 'Camarote'} {TIER_LABEL[selected.tier]} — {selected.label}
                </p>
                <p className="text-xs text-gray-500">{selected.includes} ingressos inclusos · sem consumação</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold text-gray-900">{formatCurrency(selected.price)}</p>
                <button
                  onClick={onClose}
                  className="mt-1 bg-gradient-to-r from-[#1a0a0a] to-[#3d0f0f] hover:from-[#0d0505] hover:to-[#5a1515] text-white text-sm font-bold px-5 py-2 rounded-xl transition-all"
                >
                  Confirmar
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400">Clique em um setor no mapa para selecionar</p>
          )}
        </div>
      </div>
    </div>
  );
}
