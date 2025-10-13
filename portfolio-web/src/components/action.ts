"use server";

export async function sendAppointment(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "");

  // Simulación de trabajo del servidor (base de datos / email / API)
  await new Promise((r) => setTimeout(r, 1500));

  // Puedes lanzar errores para probar estados:
  // if (!email.includes('@')) throw new Error('Invalid email');

  // Retorna algo si quieres usar useFormState (opcional)
  return { ok: true, name, email, message };
}
