export interface EcoLog {
  id: string;
  category: 'Transport' | 'Diet' | 'Energy' | 'Recycling' | 'Other';
  description: string;
  carbonSaved: number; // estimated kg CO2
  date: string; // ISO string
}

export type RootTabParamList = {
  Dashboard: undefined;
  Log: undefined;
  History: undefined;
};
