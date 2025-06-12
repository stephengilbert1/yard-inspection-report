export type Transformer = {
  id: string;
  ncTe?: string;
  location?: string;
  inspectionDate?: string;
  tm?: string;
  kva?: number;
  transformerType?: "1ph pole" | "3ph pole" | "1ph pad" | "3ph pad";
  sensorGen?: string;
  issues: string;
  createdAt?: string | number;
};
