// src/services/serviceService.ts
import api from "./api";

export interface ServiceRequestDTO {
  id: number;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  specialty: string;
  status: string;
  deadline: string | null;
  clientId: number;
  createdAt: string;
  updatedAt: string;
}

// Crear
export const createServiceRequest = (
  dto: Omit<
    ServiceRequestDTO,
    "id" | "status" | "deadline" | "clientId" | "createdAt" | "updatedAt"
  >
) => api.post<ServiceRequestDTO>("/service-requests", dto);

// Listar
export const listServiceRequests = () =>
  api.get<ServiceRequestDTO[]>("/service-requests");

// Actualizar
export const updateServiceRequest = (
  id: number,
  dto: Partial<
    Omit<
      ServiceRequestDTO,
      "id" | "status" | "deadline" | "clientId" | "createdAt" | "updatedAt"
    >
  >
) => api.patch<ServiceRequestDTO>(`/service-requests/${id}`, dto);

// Eliminar
export const deleteServiceRequest = (id: number) =>
  api.delete<void>(`/service-requests/${id}`);
