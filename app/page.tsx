'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    empresa: '',
    telefone: '',
    email_indicado: '',
    telefone_indicado: ''
  });

  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length === 0) return '';
    if (v.length <= 2) return `(${v}`;
    if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length <= 10) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: (name === 'telefone' || name === 'telefone_indicado') ? formatPhone(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isSupabaseConfigured = 
        process.env.NEXT_PUBLIC_SUPABASE_URL && 
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder-url.supabase.co' &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key';

      if (isSupabaseConfigured) {
        const leadId = crypto.randomUUID();
        const { error } = await supabase
          .from('leads')
          .insert([
            {
              id: leadId,
              nome_completo: formData.nome,
              email_corporativo: formData.email,
              empresa: formData.empresa,
              telefone_whatsapp: formData.telefone,
              email_indicado: formData.email_indicado,
              telefone_indicado: formData.telefone_indicado
            }
          ]);

        if (error) {
          console.error('Error saving lead:', error.message || String(error));
        } else {
          localStorage.setItem('current_lead_id', leadId);
          localStorage.setItem('current_lead_email', formData.email);
        }
      }
      
      localStorage.removeItem('background_check_answered');
      router.push('/candidatos');
    } catch (error: any) {
      console.error('Unexpected error:', error?.message || String(error));
      localStorage.removeItem('background_check_answered');
      router.push('/candidatos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="w-full border-b border-white/10 bg-[#021231]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center">
          <Image 
            src="/LOGOLIBERADO2X.png" 
            alt="Logo" 
            width={200} 
            height={50} 
            className="object-contain h-10 w-auto"
            priority
          />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Você sabe quem está contratando?
            </h1>
            <p className="text-slate-400 text-lg">
              Participe do desafio e ganhe um brinde exclusivo no estande!
            </p>
          </div>

          <div className="bg-[#0b1739] border border-white/10 p-8 rounded-xl shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-300" htmlFor="nome">Nome completo</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">👤</span>
                  <input 
                    className="w-full pl-11 pr-4 py-3 bg-[#021231] border border-white/20 rounded-lg text-white placeholder:text-slate-600 focus:border-[#00a3ff] outline-none transition-all" 
                    id="nome" 
                    name="nome" 
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo" 
                    type="text" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-300" htmlFor="email">E-mail corporativo</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">✉️</span>
                  <input 
                    className="w-full pl-11 pr-4 py-3 bg-[#021231] border border-white/20 rounded-lg text-white placeholder:text-slate-600 focus:border-[#00a3ff] outline-none transition-all" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com" 
                    type="email" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-300" htmlFor="empresa">Empresa</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">🏢</span>
                  <input 
                    className="w-full pl-11 pr-4 py-3 bg-[#021231] border border-white/20 rounded-lg text-white placeholder:text-slate-600 focus:border-[#00a3ff] outline-none transition-all" 
                    id="empresa" 
                    name="empresa" 
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa" 
                    type="text" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-300" htmlFor="telefone">Telefone / WhatsApp</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">📞</span>
                  <input 
                    className="w-full pl-11 pr-4 py-3 bg-[#021231] border border-white/20 rounded-lg text-white placeholder:text-slate-600 focus:border-[#00a3ff] outline-none transition-all" 
                    id="telefone" 
                    name="telefone" 
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000" 
                    type="tel" 
                    required 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <span>🎁</span> Não é você quem cuida dessa área na empresa?
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Indique a pessoa responsável. Se a empresa contratar nosso serviço, ela recebe créditos pela indicação. Mas continue nosso quiz 💙
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400" htmlFor="email_indicado">E-mail do indicado</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">✉️</span>
                      <input 
                        className="w-full pl-10 pr-4 py-2 bg-[#021231] border border-white/10 rounded-lg text-white placeholder:text-slate-600 focus:border-[#00a3ff] outline-none transition-all text-sm" 
                        id="email_indicado" 
                        name="email_indicado" 
                        value={formData.email_indicado}
                        onChange={handleChange}
                        placeholder="email@indicado.com" 
                        type="email" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400" htmlFor="telefone_indicado">WhatsApp do indicado</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">📱</span>
                      <input 
                        className="w-full pl-10 pr-4 py-2 bg-[#021231] border border-white/10 rounded-lg text-white placeholder:text-slate-600 focus:border-[#00a3ff] outline-none transition-all text-sm" 
                        id="telefone_indicado" 
                        name="telefone_indicado" 
                        value={formData.telefone_indicado}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000" 
                        type="tel" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                className="w-full py-4 bg-[#00a3ff] hover:bg-[#00a3ff]/90 text-white font-bold rounded-lg shadow-lg shadow-[#00a3ff]/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'PROCESSANDO...' : 'INICIAR PROCESSO SELETIVO'}
                {!loading && <span className="text-lg group-hover:translate-x-1 transition-transform">➡️</span>}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 pt-4">
            <span className="text-3xl">🛡️</span>
            <span className="text-3xl">🔒</span>
            <span className="text-3xl">🔰</span>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2026 Liberado. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a className="hover:text-[#f5f5f5]" href="https://www.linkedin.com/company/liberadoapp/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="hover:text-[#f5f5f5]" href="https://www.liberadoapp.com" target="_blank" rel="noopener noreferrer">Site</a>
            <a className="hover:text-[#f5f5f5]" href="https://www.instagram.com/liberadoapp/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </footer>
    </>
  );
}
