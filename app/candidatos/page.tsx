'use client';

import Link from 'next/link';
import Image from 'next/image';
import { candidates } from '@/lib/data';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CandidatosList() {
  const router = useRouter();
  const [expandedResume, setExpandedResume] = useState<string | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'SIM' | 'NÃO' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasAnswered = localStorage.getItem('background_check_answered');
    if (!hasAnswered) {
      setShowPopup(true);
    }
  }, []);

  const handlePopupSubmit = async () => {
    if (!selectedAnswer) return;
    
    setIsSubmitting(true);
    try {
      const isSupabaseConfigured = 
        process.env.NEXT_PUBLIC_SUPABASE_URL && 
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder-url.supabase.co' &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key';

      if (isSupabaseConfigured) {
        const leadId = localStorage.getItem('current_lead_id');
        const leadEmail = localStorage.getItem('current_lead_email');
        
        if (leadId || leadEmail) {
          let updateRes;
          
          // Tenta atualizar pelo ID primeiro (mais seguro)
          if (leadId) {
            updateRes = await supabase
              .from('leads')
              .update({ usa_background_check: selectedAnswer })
              .eq('id', leadId)
              .select();
          } else if (leadEmail) {
            updateRes = await supabase
              .from('leads')
              .update({ usa_background_check: selectedAnswer })
              .eq('email_corporativo', leadEmail)
              .select();
          }

          if (updateRes?.error) {
            console.error('Error saving survey:', updateRes.error.message);
            if (updateRes.error.message?.includes('Failed to fetch')) {
              alert('Erro de conexão: Não foi possível conectar ao banco de dados. Verifique:\n1. Sua internet\n2. Se o seu projeto no Supabase está PAUSADO\n3. Se há algum bloqueador de anúncios ativo.');
            }
          } else if (updateRes?.data && updateRes.data.length === 0) {
            console.warn('⚠️ Nenhuma linha foi atualizada no Supabase! Isso geralmente acontece porque falta a permissão de SELECT no RLS (Row Level Security). O banco bloqueia a busca do registro antes de atualizar.');
          } else {
            console.log('✅ Resposta do background check salva com sucesso');
          }
        } else {
          console.warn('Nenhum dado de lead encontrado para atualizar.');
        }
      }
      
      localStorage.setItem('background_check_answered', 'true');
      setShowPopup(false);
    } catch (error: any) {
      console.error('Unexpected error:', error?.message || String(error));
      setShowPopup(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleResume = (id: string) => {
    if (expandedResume === id) {
      setExpandedResume(null);
      setExpandedDetails(null);
    } else {
      setExpandedResume(id);
    }
  };

  const toggleDetails = (id: string) => {
    if (expandedDetails === id) {
      setExpandedDetails(null);
    } else {
      setExpandedDetails(id);
    }
  };

  return (
    <div className="bg-transparent text-[#f5f5f5] min-h-screen flex flex-col relative">
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#f5f5f5] rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-slate-200 flex flex-col items-center text-center">
            <h3 className="!text-[#021231] text-xl font-extrabold leading-tight mb-6">
              Hoje você já usa alguma ferramenta para verificar o histórico e antecedentes dos seus candidatos?
            </h3>
            
            <div className="flex flex-col w-full gap-3 mb-6">
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedAnswer === 'SIM' ? 'border-[#021231] bg-[#021231]/5' : 'border-slate-200 hover:border-[#021231]/50'}`}>
                <input 
                  type="radio" 
                  name="bg_check" 
                  value="SIM" 
                  checked={selectedAnswer === 'SIM'} 
                  onChange={() => setSelectedAnswer('SIM')} 
                  className="w-5 h-5 accent-[#021231]" 
                />
                <span className="text-[#021231] font-bold text-lg">SIM</span>
              </label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedAnswer === 'NÃO' ? 'border-[#021231] bg-[#021231]/5' : 'border-slate-200 hover:border-[#021231]/50'}`}>
                <input 
                  type="radio" 
                  name="bg_check" 
                  value="NÃO" 
                  checked={selectedAnswer === 'NÃO'} 
                  onChange={() => setSelectedAnswer('NÃO')} 
                  className="w-5 h-5 accent-[#021231]" 
                />
                <span className="text-[#021231] font-bold text-lg">NÃO</span>
              </label>
            </div>
            
            <button 
              onClick={handlePopupSubmit}
              disabled={!selectedAnswer || isSubmitting}
              className="w-full bg-[#021231] hover:bg-[#021231]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
            >
              {isSubmitting ? 'Salvando...' : 'Continuar'}
            </button>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header className="w-full border-b border-white/10 bg-[#021231] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-white flex size-10 items-center justify-center cursor-pointer hover:bg-white/10 rounded-full transition-colors">
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 max-w-md mx-auto w-full pb-24">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-[#f5f5f5] text-3xl font-bold leading-tight mb-3">Você está procurando uma pessoa inovadora para seu time comercial.</h2>
          <p className="text-[#94a3b8] text-sm leading-relaxed">
            Escolha o candidato com base em sua aparência e experiência.
          </p>
        </div>

        {/* Candidate Cards Container */}
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-[#0b1739]/90 rounded-xl overflow-hidden shadow-xl border border-white/10">
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative size-20 rounded-full overflow-hidden border-2 border-[#00a3ff] shrink-0">
                    <Image 
                      src={candidate.photo} 
                      alt={`Foto de ${candidate.name}`} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-bold">{candidate.name}</h3>
                    <p className="text-slate-400 text-sm font-medium mb-3">{candidate.role} {candidate.experience} de experiência</p>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full">
                  <button 
                    onClick={() => toggleResume(candidate.id)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Ver Currículo</span>
                    <span className="text-sm">{expandedResume === candidate.id ? '⬆️' : '⬇️'}</span>
                  </button>
                  <button 
                    onClick={() => router.push(`/candidatos/${candidate.id}/alerta`)}
                    className="flex-1 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>CONTRATAR</span>
                    <span className="text-sm">🤝</span>
                  </button>
                </div>

                {/* Expanded Resume Section */}
                {expandedResume === candidate.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-4">
                      {/* Summary */}
                      <div>
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                          <span className="text-[#00a3ff]">👤</span> Resumo Profissional
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {candidate.summary}
                        </p>
                      </div>

                      {/* More Details Button */}
                      <button 
                        onClick={() => toggleDetails(candidate.id)}
                        className="w-full py-2 bg-white/5 hover:bg-white/10 text-[#00a3ff] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                      >
                        <span>{expandedDetails === candidate.id ? 'Ver menos detalhes' : 'Ver mais detalhes'}</span>
                        <span>{expandedDetails === candidate.id ? '⬆️' : '⬇️'}</span>
                      </button>

                      {expandedDetails === candidate.id && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
                          {/* Experience */}
                          <div>
                            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                              <span className="text-[#00a3ff]">💼</span> Experiência Profissional
                            </h4>
                            <div className="space-y-4">
                              {candidate.experiences.map((exp, index) => (
                                <div key={index} className="relative pl-4 border-l-2 border-[#00a3ff]/30">
                                  <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${index === 0 ? 'bg-[#00a3ff]' : 'bg-slate-400'}`}></div>
                                  <p className={`${index === 0 ? 'text-[#00a3ff]' : 'text-slate-500'} font-bold text-xs mb-1`}>{exp.period}</p>
                                  <h5 className="text-white font-bold text-sm">{exp.role}</h5>
                                  <p className="text-slate-400 text-xs font-medium mb-1">{exp.company}</p>
                                  <ul className="text-slate-300 text-xs space-y-1 list-disc ml-4">
                                    {exp.achievements.map((ach, i) => (
                                      <li key={i}>{ach}</li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Education */}
                          <div>
                            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                              <span className="text-[#00a3ff]">🎓</span> Formação Acadêmica
                            </h4>
                            <div className="space-y-3">
                              {candidate.education.map((edu, index) => (
                                <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10">
                                  <h5 className="text-white font-bold text-sm">{edu.degree}</h5>
                                  <p className="text-slate-400 text-xs">{edu.institution}</p>
                                  <p className="text-slate-500 text-xs mt-1">{edu.period}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Skills */}
                          <div>
                            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                              <span className="text-[#00a3ff]">⚡</span> Habilidades
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {candidate.skills.map((skill, index) => (
                                <span key={index} className="bg-[#00a3ff]/10 text-[#00a3ff] border border-[#00a3ff]/20 px-2.5 py-1 rounded-md text-xs font-medium">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
