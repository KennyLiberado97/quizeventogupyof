import Link from 'next/link';
import Image from 'next/image';
import { candidates } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function VerificationAlert({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const candidate = candidates.find(c => c.id === id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-[480px] mx-auto flex-col bg-transparent overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center p-4 justify-between border-b border-slate-700/50">
        <Link href="/candidatos" className="text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-700/30 transition-colors">
          <span className="text-xl">⬅️</span>
        </Link>
        <div className="flex-1 flex justify-center">
          <Image 
            src="/LOGOLIBERADO2X.png" 
            alt="Logo" 
            width={150} 
            height={38} 
            className="object-contain h-8 w-auto"
            priority
          />
        </div>
        <div className="flex size-10 items-center justify-center">
          <span className="text-orange-500 text-xl">⚠️</span>
        </div>
      </div>

      {/* Candidate Profile */}
      <div className="flex p-6 flex-col items-center">
        <div className="relative">
          <div className="relative aspect-square rounded-full h-32 w-32 border-4 border-slate-700/50 shadow-xl overflow-hidden">
            <Image 
              src={candidate.photo} 
              alt={`Foto de ${candidate.name}`} 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1 border-4 border-[#021231]">
            <span className="text-white text-sm block">❗</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="text-slate-100 text-2xl font-bold leading-tight tracking-[-0.015em] text-center">{candidate.name}</p>
          <p className="text-slate-400 text-base font-medium leading-normal text-center">Candidato em Seleção</p>
        </div>
      </div>

      {/* Warning Section */}
      <div className="px-6 py-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-center">
          <span className="text-red-500 text-4xl mb-2 block">🚨</span>
          <h3 className="text-slate-100 tracking-tight text-xl font-bold leading-tight mb-2">Alerta de Verificação de Antecedentes</h3>
          <p className="text-slate-300 text-sm font-normal leading-relaxed">Foram encontradas <span className="text-red-400 font-semibold">{candidate.alert.type}</span> nos registros deste candidato que exigem atenção imediata.</p>
        </div>
      </div>

      {/* Details List */}
      <div className="px-6 py-4 space-y-3">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 px-1">Pontos de Atenção Identificados</p>
        
        <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
          <div className="size-10 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
            <span className="text-orange-500 text-xl">⚖️</span>
          </div>
          <div className="flex-1">
            <p className="text-slate-100 font-semibold">Processos Judiciais</p>
            <p className="text-slate-400 text-xs">{candidate.alert.judicial.count} {candidate.alert.judicial.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
          <div className="size-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
            <span className="text-red-500 text-xl">🔄</span>
          </div>
          <div className="flex-1">
            <p className="text-slate-100 font-semibold">Turnover Empresarial</p>
            <p className="text-slate-400 text-xs">Média de {(candidate.alert as any).turnover.average} (Status: {(candidate.alert as any).turnover.status})</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto p-6 pb-24">
        <Link href={`/candidatos/${candidate.id}/relatorio`} className="w-full py-4 bg-[#00a3ff] hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
          <span>Ver Relatório Completo</span>
          <span className="text-xl">📄</span>
        </Link>
      </div>
    </div>
  );
}
