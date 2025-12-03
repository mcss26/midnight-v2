/**
 * MIDNIGHT CLUB ERP V2 - CONFIGURACIÓN CENTRAL
 * Autor: Arquitectura de Software
 * Fecha: 03/12/2025
 */

// 1. Credenciales Oficiales (V2)
const SUPABASE_URL = 'https://dlwewdlfuovxofetcmjv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2V3ZGxmdW92eG9mZXRjbWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3Mjc0OTAsImV4cCI6MjA4MDMwMzQ5MH0.8Ddesga7tiHQ-kPAXgJO1zEswXafk-M_F3qenWuHEgs';

// 2. Inicialización del Cliente Global
// Verificamos que la librería de Supabase esté cargada antes
if (typeof supabase === 'undefined') {
    console.error('❌ ERROR CRÍTICO: La librería @supabase/supabase-js no se ha cargado. Incluye el CDN antes de config.js');
} else {
    // Exponemos "client" globalmente para que funcione igual que en tu código anterior
    window.client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Midnight ERP: Conexión DB establecida.');
}

// 3. Helpers Globales (Utilidades para V2)
const MC_UTILS = {
    // Formateador de moneda rápido
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount || 0);
    },
    // Obtener usuario actual (Sesión Supabase)
    getCurrentUser: async () => {
        const { data: { user } } = await client.auth.getUser();
        return user;
    }
};