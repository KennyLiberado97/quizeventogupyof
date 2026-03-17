'use client';

import Link from 'next/link';
import Image from 'next/image';
import { candidates } from '@/lib/data';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function DetailedReport({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const candidate = candidates.find(c => c.id === id);

  if (!candidate) {
    notFound();
  }

  const handleBackToStart = () => {
    // Limpa o estado para um novo início
    localStorage.removeItem('background_check_answered');
    localStorage.removeItem('current_lead_id');
    localStorage.removeItem('current_lead_email');
    
    // Força um recarregamento completo para a página inicial
    window.location.href = '/';
  };

  return (
    <div className="bg-transparent text-white min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-[#021231] border-b border-white/10">
        <div className="flex items-center p-4 justify-between max-w-2xl mx-auto w-full">
          <Link href={`/candidatos/${candidate.id}/alerta`} className="text-slate-400 flex size-10 items-center justify-center hover:bg-white/10 rounded-full transition-colors">
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
          <div className="size-10"></div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full pb-32">
        <section className="p-6 border-b border-white/10 bg-transparent">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="relative aspect-square rounded-full h-24 w-24 border-4 border-[#00a3ff]/20 overflow-hidden">
                <Image 
                  src={candidate.photo} 
                  alt={`Foto de ${candidate.name}`} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-yellow-500 text-white rounded-full p-1 border-2 border-[#021231]">
                <span className="text-sm block">⚠️</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-white text-2xl font-bold leading-tight">{candidate.name}</h2>
              <p className="text-slate-400 text-sm font-medium">CPF: {candidate.report.cpf}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase tracking-wider border border-yellow-500/20">Atenção Necessária</span>
              </div>
            </div>
          </div>
        </section>

        <section className="p-4 space-y-6">
          <div>
            <div className="flex items-center gap-2 px-2 pb-3 pt-5">
              <span className="text-[#00a3ff] text-xl">⚖️</span>
              <h2 className="text-white text-xl font-bold tracking-tight">Processos Judiciais</h2>
            </div>
            <div className="space-y-3">
              {candidate.report.judicialDetails.map((process, index) => (
                <div key={index} className="bg-[#0b1739]/90 border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{process.type}</span>
                    <span className={`text-xs font-bold uppercase tracking-widest ${process.status === 'Em Andamento' ? 'text-[#00a3ff]' : 'text-slate-500'}`}>{process.status}</span>
                  </div>
                  <p className="text-white font-semibold mb-1">{process.process}</p>
                  <p className="text-slate-400 text-sm mb-3">{process.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 px-2 pb-3 pt-5">
              <span className={`${candidate.alert.turnover.status === 'Crítico' ? 'text-red-500' : 'text-green-500'} text-xl`}>🔄</span>
              <h2 className="text-white text-xl font-bold tracking-tight">Turnover Empresarial</h2>
            </div>
            <div className="bg-[#0b1739]/90 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1 border-r border-white/10">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Média de Tempo</p>
                  <p className={`text-2xl font-bold ${candidate.alert.turnover.status === 'Crítico' ? 'text-red-500' : 'text-green-500'}`}>{(candidate as any).report.turnover.averageTime}</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Empresas (3 anos)</p>
                  <p className="text-2xl font-bold text-white">{(candidate as any).report.turnover.totalCompanies}</p>
                </div>
              </div>
              <div className={`rounded-lg p-4 border ${
                candidate.alert.turnover.status === 'Crítico' 
                  ? 'bg-red-500/10 border-red-500/20' 
                  : 'bg-green-500/30 border-green-500/40'
              }`}>
                <p className={`text-sm font-medium leading-relaxed ${
                  candidate.alert.turnover.status === 'Crítico' ? 'text-red-500' : 'text-green-600'
                }`}>
                  {(candidate as any).report.turnover.description}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-2 pb-3 pt-5">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 text-xl">💳</span>
                <h2 className="text-white text-xl font-bold tracking-tight">Crédito</h2>
              </div>
              <span className="px-3 py-1 rounded-md bg-[#021231] text-slate-400 text-xs font-bold">Não Conforme</span>
            </div>
            <div className="bg-[#0b1739]/90 border border-white/10 rounded-xl p-6">
              <div className="grid grid-cols-1 gap-6">
                {(candidate as any).report.creditPendencies.length > 0 ? (
                  (candidate as any).report.creditPendencies.map((pendency: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 text-red-500 mt-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1-4h-2V7h2v4z"/>
                        </svg>
                      </div>
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="col-span-2 md:col-span-1">
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Credor</p>
                          <p className="text-white font-bold text-sm leading-tight">{pendency.bank}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Tipo</p>
                          <p className="text-slate-400 text-xs">{pendency.type}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Data</p>
                          <p className="text-slate-400 text-xs">{pendency.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Valor</p>
                          <p className="text-red-500 font-bold text-sm">{pendency.value}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <span className="text-green-500 text-3xl mb-2">✅</span>
                    <p className="text-white font-bold">Nada Consta</p>
                    <p className="text-slate-400 text-xs">Nenhuma pendência financeira localizada.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 px-2 pb-3 pt-5">
              <span className="text-indigo-500 text-xl">🤖</span>
              <h2 className="text-white text-xl font-bold tracking-tight">Análise da IA LiberadoApp</h2>
            </div>
            <div className="bg-[#0b1739]/90 border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-4 left-6">
                <p className="text-white text-[10px] font-bold uppercase tracking-widest">Risco da contratação: {(candidate as any).riskScore > 0.6 ? 'ALTA' : (candidate as any).riskScore > 0.3 ? 'MÉDIA' : 'BAIXA'}</p>
              </div>
              
              {/* Gauge (Thermometer) - Risk Visual */}
              <div className="relative w-64 h-32 overflow-hidden mb-6 mt-8">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  {/* Background Arc */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Colored Arc (Filled up to risk level) */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="url(#gauge-gradient-risk)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 * (1 - (candidate as any).riskScore)} 
                  />
                  <defs>
                    <linearGradient id="gauge-gradient-risk" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  
                  {/* Needle */}
                  <g transform={`rotate(${(candidate as any).riskScore * 180}, 50, 50)`}>
                    <line
                      x1="10" y1="50"
                      x2="50" y2="50"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="50" r="3" fill="white" />
                  </g>
                </svg>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-medium text-center">
                {(candidate as any).report.aiAnalysis.summary}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 px-2 pb-3 pt-5">
              <span className="text-green-500 text-xl">✅</span>
              <h2 className="text-white text-xl font-bold tracking-tight">Mandatos de Prisão</h2>
            </div>
            <div className="bg-[#0b1739]/90 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <span className="text-green-500 text-4xl mb-2">✅</span>
              <p className="text-white font-bold">{candidate.report.warrants.status}</p>
              <p className="text-slate-400 text-sm">{candidate.report.warrants.description}</p>
            </div>
          </div>

          <div className="mt-8 bg-[#0b1739]/90 rounded-xl p-8 border border-white/10 shadow-sm flex flex-col items-center text-center">
            <h3 className="text-white text-2xl md:text-3xl font-black leading-tight mb-6">
              Seu ATS encontra talento.<br />
              Mas ele não encontra risco.
            </h3>
            <p className="text-white font-bold text-lg mb-4">
              3 riscos que RH ignora na contratação:
            </p>
            <ul className="text-white space-y-3 mb-8 flex flex-col items-start inline-block text-left font-medium text-lg">
              <li className="flex items-center gap-3"><span>1️⃣</span> turnover excessivo</li>
              <li className="flex items-center gap-3"><span>2️⃣</span> instabilidade financeira</li>
              <li className="flex items-center gap-3"><span>3️⃣</span> passivo trabalhista</li>
            </ul>

            <div className="w-full p-6 bg-blue-500/10 border-2 border-dashed border-blue-500/30 rounded-2xl mb-8">
              <h4 className="text-blue-500 font-black text-xl mb-2">Obrigada por participar!</h4>
              <p className="text-white font-bold">
                Mostre esta tela no stand <span className="text-[#00a3ff]">Liberado App</span> e retire seu brinde.
              </p>
            </div>

            <a href="https://wa.me/5511961759438?text=Vim%20atrav%C3%A9s%20do%20evento%20da%20Gupy%21" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#021231] hover:bg-[#021231]/90 text-white font-bold py-4 px-6 rounded-lg transition-colors text-center text-lg shadow-md border border-white/10">
              Conheça o Liberado App
            </a>
          </div>
        </section>

        <section className="p-6 mt-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-slate-500 text-xs leading-relaxed text-center">
              <strong>Aviso Legal:</strong> Este relatório é uma simulação criada exclusivamente para fins demonstrativos no evento. Todos os nomes, documentos e ocorrências são fictícios. Nenhuma base oficial foi consultada.
            </p>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#021231]/95 border-t border-white/10 p-4 z-50">
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-3">
          <a href="https://wa.me/5511961759438?text=Vim%20atrav%C3%A9s%20do%20evento%20da%20Gupy%21" target="_blank" rel="noopener noreferrer" className="w-full bg-[#00a3ff] hover:bg-[#00a3ff]/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#00a3ff]/20 flex items-center justify-center gap-2">
            <span className="text-xl">🔒</span>
            Quero proteger minha empresa
          </a>
          <button 
            onClick={handleBackToStart}
            className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2"
          >
            Voltar ao Início
          </button>
        </div>
      </footer>
    </div>
  );
}
