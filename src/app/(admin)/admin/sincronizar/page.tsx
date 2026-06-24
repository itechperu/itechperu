"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Clock,
  Database,
  FileSpreadsheet,
  Loader2,
  ArrowRight,
} from "lucide-react";

interface SyncHistoryItem {
  id: string;
  date: string;
  total?: number;
  created?: number;
  updated?: number;
  deactivated?: number;
  errors?: string[];
  sheetTitle?: string;
  rowCount?: number;
  error?: string;
}

interface ConfigInfo {
  sheetId: string;
  sheetUrl: string;
  range: string;
  serviceAccountEmail: string;
  isConfigured: boolean;
}

export default function AdminSyncPage() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [config, setConfig] = useState<ConfigInfo | null>(null);
  const [history, setHistory] = useState<SyncHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{
    success: boolean;
    total: number;
    created: number;
    updated: number;
    deactivated: number;
    errors: string[];
    sheetTitle: string;
    duration: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/sync", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setIsConfigured(data.isConfigured);
        setConfig(data.config);
        setHistory(data.history || []);
      }
    } catch {
      setError("Error al cargar el estado");
    } finally {
      setLoading(false);
    }
  }

  async function handleSync() {
    setSyncing(true);
    setError(null);
    setSyncResult(null);
    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSyncResult(data);
        // Recargar historial
        await loadStatus();
      } else {
        setError(data.error || "Error en la sincronización");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
        Sincronización Google Sheets
      </h1>
      <p className="text-[13px] text-[#86868B] mt-1">
        Sincroniza tu catálogo desde Google Sheets automáticamente
      </p>

      {/* Estado de configuración */}
      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        {/* Card: Estado */}
        <div
          className={`rounded-2xl border-2 p-5 ${
            isConfigured
              ? "border-[#10B981]/30 bg-[#10B981]/5"
              : "border-[#F59E0B]/30 bg-[#F59E0B]/5"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            {isConfigured ? (
              <CheckCircle2 className="h-5 w-5 text-[#10B981]" strokeWidth={1.5} />
            ) : (
              <AlertCircle className="h-5 w-5 text-[#F59E0B]" strokeWidth={1.5} />
            )}
            <h2 className="text-[15px] font-semibold text-[#1D1D1F]">
              {isConfigured ? "Configurado y activo" : "Pendiente de configurar"}
            </h2>
          </div>

          {isConfigured && config ? (
            <div className="space-y-2 text-[12px]">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-[#86868B]" strokeWidth={1.5} />
                <span className="text-[#86868B]">Sheet:</span>
                <a
                  href={config.sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#1D1D1F] font-medium hover:text-[#D4AF37] transition-colors truncate"
                >
                  {config.sheetTitle || "Abrir Sheet"}
                  <ExternalLink className="h-3 w-3 flex-shrink-0" strokeWidth={1.5} />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-[#86868B]" strokeWidth={1.5} />
                <span className="text-[#86868B]">Rango:</span>
                <span className="text-[#1D1D1F] font-mono">{config.range}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#86868B]" strokeWidth={1.5} />
                <span className="text-[#86868B]">Auto-sync:</span>
                <span className="text-[#1D1D1F] font-medium">Cada hora</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-[12px] text-[#1D1D1F]/80">
              <p>Faltan variables de entorno. Configura en Vercel:</p>
              <ul className="list-disc list-inside space-y-1 text-[11px] font-mono text-[#1D1D1F]">
                <li>GOOGLE_SERVICE_ACCOUNT_EMAIL</li>
                <li>GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</li>
                <li>GOOGLE_SHEETS_ID</li>
                <li>CRON_SECRET</li>
              </ul>
              <p className="text-[11px] text-[#86868B] mt-2">
                Ver README sección "Google Sheets Sync" para instrucciones completas.
              </p>
            </div>
          )}
        </div>

        {/* Card: Sync manual */}
        <div className="rounded-2xl border-2 border-[#E5E5E7] bg-white p-5">
          <h2 className="flex items-center gap-2 text-[15px] font-semibold text-[#1D1D1F] mb-3">
            <RefreshCw className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
            Sincronización manual
          </h2>

          <p className="text-[12px] text-[#86868B] mb-4">
            Ejecuta el sync ahora. Útil después de hacer cambios en el Sheet
            sin esperar al cron automático.
          </p>

          <button
            onClick={handleSync}
            disabled={syncing || !isConfigured}
            className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-3 text-[13px] font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1D1D1F]/90 transition-colors"
          >
            {syncing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                Sincronizando…
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" strokeWidth={1.5} />
                Sincronizar ahora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </>
            )}
          </button>

          {!isConfigured && (
            <p className="text-[10px] text-[#F59E0B] mt-2 text-center">
              ⚠️ Configura las env vars para habilitar
            </p>
          )}
        </div>
      </div>

      {/* Resultado del último sync */}
      {syncResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-2xl border-2 p-5 ${
            syncResult.success
              ? "border-[#10B981]/30 bg-[#10B981]/5"
              : "border-[#EF4444]/30 bg-[#EF4444]/5"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            {syncResult.success ? (
              <CheckCircle2 className="h-5 w-5 text-[#10B981]" strokeWidth={1.5} />
            ) : (
              <AlertCircle className="h-5 w-5 text-[#EF4444]" strokeWidth={1.5} />
            )}
            <h2 className="text-[15px] font-semibold text-[#1D1D1F]">
              {syncResult.success ? "Sincronización exitosa" : "Sync con errores"}
            </h2>
            <span className="ml-auto text-[11px] text-[#86868B]">
              {syncResult.duration}ms · {syncResult.sheetTitle}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <p className="text-[20px] font-bold text-[#1D1D1F]">{syncResult.total}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-semibold">
                Total
              </p>
            </div>
            <div className="text-center">
              <p className="text-[20px] font-bold text-[#10B981]">{syncResult.created}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-semibold">
                Nuevos
              </p>
            </div>
            <div className="text-center">
              <p className="text-[20px] font-bold text-[#3B82F6]">{syncResult.updated}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-semibold">
                Actualizados
              </p>
            </div>
            <div className="text-center">
              <p className="text-[20px] font-bold text-[#F59E0B]">{syncResult.deactivated}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-semibold">
                Desactivados
              </p>
            </div>
          </div>

          {syncResult.errors.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#EF4444]/20">
              <p className="text-[11px] font-semibold text-[#EF4444] mb-1">
                Errores ({syncResult.errors.length}):
              </p>
              <ul className="space-y-1 max-h-32 overflow-y-auto">
                {syncResult.errors.slice(0, 10).map((e, i) => (
                  <li key={i} className="text-[11px] text-[#1D1D1F]/80 font-mono">
                    • {e}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30 px-4 py-2.5 text-[12px] text-[#EF4444]">
          <AlertCircle className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
          {error}
        </div>
      )}

      {/* Historial de syncs */}
      <section className="mt-6">
        <h2 className="text-[15px] font-semibold tracking-tight text-[#1D1D1F] mb-3">
          Historial de sincronizaciones
        </h2>

        {loading ? (
          <div className="rounded-2xl bg-white border border-[#E5E5E7] p-6 text-center">
            <Loader2 className="h-6 w-6 mx-auto animate-spin text-[#86868B]" strokeWidth={1.5} />
          </div>
        ) : history.length === 0 ? (
          <div className="rounded-2xl bg-white border border-[#E5E5E7] p-6 text-center">
            <Clock className="h-8 w-8 mx-auto text-[#86868B]" strokeWidth={1.5} />
            <p className="text-[12px] text-[#86868B] mt-2">
              Aún no hay sincronizaciones registradas
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-white border border-[#E5E5E7] p-3 flex items-center gap-3"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                    item.errors && item.errors.length > 0
                      ? "bg-[#EF4444]/10"
                      : "bg-[#10B981]/10"
                  }`}
                >
                  {item.errors && item.errors.length > 0 ? (
                    <AlertCircle className="h-4 w-4 text-[#EF4444]" strokeWidth={1.5} />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-[#10B981]" strokeWidth={1.5} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[12px] font-semibold text-[#1D1D1F]">
                      {new Date(item.date).toLocaleString("es-PE", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                    {item.sheetTitle && (
                      <span className="text-[10px] text-[#86868B] truncate">
                        · {item.sheetTitle}
                      </span>
                    )}
                  </div>
                  {item.total !== undefined && (
                    <p className="text-[11px] text-[#86868B]">
                      {item.created || 0} nuevos · {item.updated || 0} actualizados ·{" "}
                      {item.deactivated || 0} desactivados · Total: {item.total}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Instrucciones de setup */}
      {!isConfigured && (
        <section className="mt-6 rounded-2xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-5 text-white">
          <h2 className="text-[15px] font-semibold mb-3 flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
            ¿Cómo configurar Google Sheets Sync?
          </h2>
          <ol className="space-y-2 text-[12px] text-white/80">
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#1D1D1F] flex-shrink-0">
                1
              </span>
              <span>
                Ve a{" "}
                <a
                  href="https://console.cloud.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] underline"
                >
                  Google Cloud Console
                </a>{" "}
                → crea un proyecto nuevo
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#1D1D1F] flex-shrink-0">
                2
              </span>
              <span>Habilita "Google Sheets API" en APIs & Services → Library</span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#1D1D1F] flex-shrink-0">
                3
              </span>
              <span>
                Crea credenciales: Service Account → crea JSON → descarga el archivo
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#1D1D1F] flex-shrink-0">
                4
              </span>
              <span>
                Copia el email de la Service Account (xxx@yyy.iam.gserviceaccount.com)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#1D1D1F] flex-shrink-0">
                5
              </span>
              <span>
                Crea un Google Sheet con tus productos y compártelo con ese email
                (permiso: Lector)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#1D1D1F] flex-shrink-0">
                6
              </span>
              <span>
                En Vercel → Project Settings → Environment Variables, agrega:
                <ul className="mt-1 ml-4 space-y-0.5 font-mono text-[11px] text-[#D4AF37]">
                  <li>GOOGLE_SERVICE_ACCOUNT_EMAIL</li>
                  <li>GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</li>
                  <li>GOOGLE_SHEETS_ID (ID del sheet en la URL)</li>
                  <li>CRON_SECRET (cualquier string aleatorio)</li>
                </ul>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#1D1D1F] flex-shrink-0">
                7
              </span>
              <span>¡Listo! El sync se ejecutará cada hora automáticamente.</span>
            </li>
          </ol>
        </section>
      )}
    </motion.div>
  );
}
