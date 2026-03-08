import { MateriaInterna } from "@/components/MateriaInterna";
import { mockMaterias } from "@/lib/mockData";
import { notFound } from "next/navigation";

export default async function MateriaPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const materiaId = parseInt(resolvedParams.id);
  const materia = mockMaterias.find(m => m.id === materiaId);

  if (!materia) {
    notFound();
  }

  return <MateriaInterna materia={materia} />;
}
