import { JSX } from "react";
import { GraduationCap, BookA, Hospital, Activity } from "lucide-react";

type TimelineData = {
    id: number;
    title: string;
    description: string;
    year: string;
    icon: JSX.Element;
}

export const timelineData: TimelineData[] = [
  {
    id: 1,
    title: "Fen Lisesi, Erzurum",
    description: '',
    year: "2009-2013",
    icon: <BookA size={20} />,
  },
  {
    id: 2,
    title: "Ege Üniversitesi Lisans Derecesi, Tıp",
    description: '',
    year: "2013 - 2019",
    icon: <GraduationCap size={20} />,
  },
  {
    id: 3,
    title: "Ege Üniversitesi Genel Cerrahi Uzmanlığı",
    description: '',
    year: "2019 - Halen",
    icon: <Hospital size={20} />,
  },
  {
    id: 4,
    title: "Ege Üniversitesi Genel Cerrahi: Op.Dr. Ebubekir Korucuk",
    description: 'Şu andaki Pozisyon',
    year: "2025 - Halen",
    icon: <Activity   size={20} />,
  },
  
];