'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ReferralForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length === 0) return '';
    if (v.length <= 2) return `(${v}`;
    if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length <= 10) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const leadId = localStorage.getItem('current_lead_id');
      
      if (!leadId) {
        console.error('Lead ID not found');
        router.push('/candidatos');
        return;
      }

      // Update the existing lead with referral information
      const { error } = await supabase
        .from('leads')
        .update({
          email_indicado: email,
          telefone_indicado: whatsapp
        })
        .eq('id', leadId);

      if (error) {
        console.error('Erro Supabase:', error);
        setErrorMsg(`Erro ao salvar: ${error.message}`);
        // Continue navigation to prevent freezing if needed, 
        // but usually we want to show the error. 
        // The user said "log it but continue navigation".
        // I'll add a small delay or just push if that's what's intended.
        // However, "continue navigation" might mean just letting the user try again or moving on.
        // I will follow the instruction: "If an error occurs, log it but continue navigation"
        router.push('/candidatos');
      } else {
        setSuccess(true);
      }
    } catch (error: any) {
      console.error('Erro inesperado:', error);
      setErrorMsg(`Erro inesperado: ${error.message || 'Tente novamente'}`);
      router.push('/candidatos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 className="text-[#021231] dark:text-white text-xl font-bold leading-tight mb-2 text-center">
        Não é você quem cuida dessa área na empresa?
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 text-center">
        Indique a pessoa responsável. Se a empresa contratar nosso serviço, ela recebe créditos pela indicação.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm text-center">
            {errorMsg}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400" htmlFor="email-indicado">E-mail do responsável</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">✉️</span>
            <input 
              id="email-indicado"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@empresa.com"
              disabled={success || loading}
              className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#00a3ff] focus:ring-1 focus:ring-[#00a3ff] outline-none transition-all text-sm disabled:opacity-60"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400" htmlFor="whatsapp-indicado">WhatsApp do responsável</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📱</span>
            <input 
              id="whatsapp-indicado"
              type="tel" 
              value={whatsapp}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
              disabled={success || loading}
              className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#00a3ff] focus:ring-1 focus:ring-[#00a3ff] outline-none transition-all text-sm disabled:opacity-60"
            />
          </div>
        </div>

        {!success ? (
          <button 
            type="submit"
            disabled={loading || (!email && !whatsapp)}
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Indicar responsável'}
          </button>
        ) : (
          <div className="w-full mt-2 py-3 px-4 text-center text-green-600 dark:text-green-400 font-bold text-sm">
            Obrigado pela indicação!
          </div>
        )}
      </form>
    </div>
  );
}
