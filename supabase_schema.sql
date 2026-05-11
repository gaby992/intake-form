-- ============================================================
-- DATAVIA — Client Intakes Schema
-- Ejecutar en: Supabase → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS client_intakes (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now(),

  -- Status
  status                text DEFAULT 'pending' CHECK (status IN ('pending', 'building', 'active', 'paused')),

  -- 1. Datos del cliente
  nombre_negocio        text NOT NULL,
  tipo_negocio          text,
  ciudad_pais           text,
  nombre_dueno          text,
  whatsapp_dueno        text,

  -- 2. Identidad del agente
  nombre_agente         text,
  genero_agente         text,
  tono                  text,
  idioma                text DEFAULT 'Español',

  -- 3. Descripción del negocio
  descripcion_negocio   text,
  servicios             jsonb,  -- array de {servicio, precio}
  promociones           text,

  -- 4. Objetivo del agente
  objetivos             jsonb,  -- array de strings seleccionados
  accion_deseada        text,

  -- 5. FAQ del negocio
  faq                   jsonb,  -- array de {pregunta, respuesta}

  -- 6. Objeciones
  objeciones            jsonb,  -- array de {objecion, respuesta}

  -- 7. Horarios
  horario_lv            text,
  horario_sab           text,
  horario_dom           text,
  timezone              text DEFAULT 'America/Mexico_City',
  atiende_fuera_horario boolean DEFAULT true,

  -- 8. Escalación
  usa_whatsapp_publicidad text DEFAULT 'no_se' CHECK (usa_whatsapp_publicidad IN ('si', 'no', 'no_se')),
  triggers_escalacion   jsonb,  -- array de strings
  whatsapp_escalacion   text,
  telegram_escalacion   text,
  email_escalacion      text,

  -- 9. Datos a capturar
  datos_capturar        jsonb,  -- array de strings

  -- 10. Links
  sitio_web             text,
  instagram             text,
  facebook              text,
  google_maps           text,
  link_agenda           text,
  direccion_fisica      text,

  -- 11. Instrucciones extra para Antigravity
  instrucciones_extra   text,

  -- 12. Config técnica (llenado por Antigravity)
  workflow_id           text,
  webhook_path          text,
  numero_whatsapp       text,
  redis_prefix          text,
  agente_construido_at  timestamptz
);

-- Index para búsquedas rápidas
CREATE INDEX idx_intakes_status ON client_intakes(status);
CREATE INDEX idx_intakes_nombre ON client_intakes(nombre_negocio);

-- RLS básico (ajustar según necesidad)
ALTER TABLE client_intakes ENABLE ROW LEVEL SECURITY;

-- Policy: solo service_role puede escribir, anon puede insertar (para el form)
CREATE POLICY "allow_insert" ON client_intakes
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "allow_service_read" ON client_intakes
  FOR ALL TO service_role USING (true);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON client_intakes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- VERIFICAR: SELECT * FROM client_intakes ORDER BY created_at DESC;
-- ============================================================
