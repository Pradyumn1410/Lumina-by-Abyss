export interface FleetItem {
  id: 'sub-titan' | 'sub-nautilus' | 'sub-voyager';
  name: string;
  classLabel: string;
  tagline: string;
  description: string;
  maxDepth: string;
  capacity: string;
  endurance: string;
  color: string;
  glowColor: string;
}

export interface Destination {
  id: string;
  name: string;
  depth: string;
  coordinates: string;
  description: string;
  image: string;
  duration: string;
  price: string;
}

export interface ExperienceCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
