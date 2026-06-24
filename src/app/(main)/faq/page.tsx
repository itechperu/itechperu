import { redirect } from "next/navigation";

/** Redirect: /faq → /preguntas-frecuentes */
export default function RedirectFAQ() {
  redirect("/preguntas-frecuentes");
}
