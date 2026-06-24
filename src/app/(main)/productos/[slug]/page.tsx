import { redirect } from "next/navigation";

/**
 * Redirect: /productos/[slug] → /producto/[slug]
 * Mantiene compatibilidad con URLs antiguas.
 */
export default function RedirectProductos({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    redirect(`/producto/${slug}`);
  });
}
