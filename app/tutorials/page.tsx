// app/tutorials/page.tsx
// Server Component: los tutoriales viajan dentro del HTML. Antes la página era
// 'use client' y los pedía a /api/tutorials al montar, así que el HTML servido
// llegaba sin ningún tutorial.

import TutorialsView from '../../components/TutorialsView/TutorialsView';
import { tutorials } from '../../lib/tutorialCards';

export default function TutorialsPage() {
  return <TutorialsView tutorials={tutorials} />;
}
