import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const n8nWebhookUrl = process.env.N8N_INTAKE_WEBHOOK_URL!;

    // 1. Guardar en Supabase
    const dbRes = await fetch(`${supabaseUrl}/rest/v1/client_intakes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        nombre_negocio: data.nombre_negocio,
        tipo_negocio: data.tipo_negocio,
        ciudad_pais: data.ciudad_pais,
        nombre_dueno: data.nombre_dueno,
        whatsapp_dueno: data.whatsapp_dueno,
        nombre_agente: data.nombre_agente,
        genero_agente: data.genero_agente,
        tono: data.tono,
        idioma: data.idioma,
        descripcion_negocio: data.descripcion_negocio,
        servicios: data.servicios,
        promociones: data.promociones,
        objetivos: data.objetivos,
        accion_deseada: data.accion_deseada,
        faq: data.faq,
        horario_lv: data.horario_lv,
        horario_sab: data.horario_sab,
        horario_dom: data.horario_dom,
        timezone: data.timezone,
        atiende_fuera_horario: data.atiende_fuera_horario,
        triggers_escalacion: data.triggers_escalacion,
        usa_whatsapp_publicidad: data.usa_whatsapp_publicidad,
        whatsapp_escalacion: data.whatsapp_escalacion,
        telegram_escalacion: data.telegram_escalacion,
        email_escalacion: data.email_escalacion,
        datos_capturar: data.datos_capturar,
        link_agenda: data.link_agenda,
        sitio_web: data.sitio_web,
        instagram: data.instagram,
        instrucciones_extra: data.instrucciones_extra,
        status: 'pending',
      }),
    });

    const savedRecord = await dbRes.json();
    const intakeId = Array.isArray(savedRecord) ? savedRecord[0]?.id : savedRecord?.id;

    // 2. Notificar a n8n (que notificará a Adolfo por Telegram/WhatsApp)
    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intake_id: intakeId,
          nombre_negocio: data.nombre_negocio,
          nombre_dueno: data.nombre_dueno,
          whatsapp_dueno: data.whatsapp_dueno,
          tipo_negocio: data.tipo_negocio,
          ciudad_pais: data.ciudad_pais,
          agente: data.nombre_agente,
          objetivo: data.accion_deseada,
          faq_count: data.faq?.filter((f: { pregunta: string; respuesta: string }) => f.pregunta && f.respuesta).length || 0,
          servicios_count: data.servicios?.length || 0,
          status: 'nuevo_intake',
        }),
      }).catch(() => {}); // no bloquear si falla n8n
    }

    return NextResponse.json({ success: true, id: intakeId });
  } catch (error) {
    console.error('Error submitting intake:', error);
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 });
  }
}
