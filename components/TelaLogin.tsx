import { useState } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { ToggleTema } from './ToggleTema';
import { usarContextoApp } from '../contexts/AppContext';

export function TelaLogin() {
  const { fazerLogin } = usarContextoApp();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setEstaCarregando(true);

    try {
      const sucesso = await fazerLogin(email, senha);
      if (!sucesso) {
        setErro('Email ou senha incorretos. Tente novamente.');
      }
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setEstaCarregando(false);
    }
  };

  const preencherCredenciais = (tipo: 'morador' | 'sindico') => {
    if (tipo === 'morador') {
      setEmail('morador@email.com');
      setSenha('123456');
    } else {
      setEmail('sindico@email.com');
      setSenha('123456');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-slate-950 dark:via-emerald-950/40 dark:to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12),transparent_30%)]" />
      </div>

      {/* Toggle tema no canto superior direito */}
      <div className="absolute top-6 right-6 z-10">
        <ToggleTema />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[480px] space-y-8">
          {/* Logo e título */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-500/30 ring-2 ring-emerald-100 dark:ring-emerald-900">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold tracking-[0.12em] text-emerald-700 dark:text-emerald-200 uppercase">
                MeuCondomínio
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Portal do Condomínio</h1>
              <p className="text-sm text-muted-foreground">Acesse o ecossistema completo para gestão condominial</p>
            </div>
          </div>

          {/* Card de login */}
          <Card className="border border-emerald-100/70 dark:border-emerald-900/50 bg-white/90 dark:bg-slate-950/80 shadow-2xl shadow-emerald-500/15 backdrop-blur">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
              <CardDescription>Faça login para acessar sua conta</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo de email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700/70 dark:text-emerald-200/70" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 pl-11 bg-white/80 dark:bg-slate-900/70 border-emerald-100 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                      required
                    />
                  </div>
                </div>

                {/* Campo de senha */}
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700/70 dark:text-emerald-200/70" />
                    <Input
                      id="senha"
                      type={mostrarSenha ? 'text' : 'password'}
                      placeholder="Sua senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      className="h-11 pl-11 pr-12 bg-white/80 dark:bg-slate-900/70 border-emerald-100 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-9 text-muted-foreground hover:bg-transparent"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                      aria-pressed={mostrarSenha}
                    >
                      {mostrarSenha ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Mensagem de erro */}
                {erro && (
                  <Alert className="border-destructive/50 text-destructive bg-destructive/5">
                    <AlertDescription>{erro}</AlertDescription>
                  </Alert>
                )}

                {/* Botão de login */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 transition-all duration-200"
                  disabled={estaCarregando}
                >
                  {estaCarregando ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Entrando...
                    </div>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-[10px] font-semibold tracking-[0.18em] uppercase">
                    <span className="bg-card px-3 text-muted-foreground">Ou teste com</span>
                  </div>
                </div>

                {/* Botões de demonstração */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => preencherCredenciais('morador')}
                    className="h-11 border-emerald-200 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-100 dark:hover:bg-emerald-900/40 transition-all duration-200"
                    disabled={estaCarregando}
                  >
                    <div className="flex flex-col items-center leading-tight">
                      <span className="text-xs font-semibold">Demo Morador</span>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => preencherCredenciais('sindico')}
                    className="h-11 border-emerald-200 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-100 dark:hover:bg-emerald-900/40 transition-all duration-200"
                    disabled={estaCarregando}
                  >
                    <div className="flex flex-col items-center leading-tight">
                      <span className="text-xs font-semibold">Demo Síndico</span>
                    </div>
                  </Button>
                </div>

                {/* Credenciais de teste */}
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-600/10 dark:bg-emerald-500/10 p-4 space-y-2">
                  <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-100">Credenciais de teste</p>
                  <div className="grid grid-cols-1 gap-2 text-xs text-emerald-900 dark:text-emerald-50">
                    <div className="flex items-center justify-between rounded-lg bg-white/60 dark:bg-slate-900/60 px-3 py-2 border border-emerald-100/80 dark:border-emerald-900/70">
                      <span className="font-medium">Morador</span>
                      <span className="text-right">morador@email.com / 123456</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/60 dark:bg-slate-900/60 px-3 py-2 border border-emerald-100/80 dark:border-emerald-900/70">
                      <span className="font-medium">Síndico</span>
                      <span className="text-right">sindico@email.com / 123456</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>© 2024 MeuCondomínio. Sistema de gerenciamento condominial.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
