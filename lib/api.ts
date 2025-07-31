// API utility functions for frontend
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `/api${endpoint}`

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }))
    throw new ApiError(response.status, error.error || "Request failed")
  }

  return response.json()
}

// Truck API functions
export const truckApi = {
  getAll: () => apiRequest("/trucks"),
  getById: (id: string) => apiRequest(`/trucks/${id}`),
  create: (data: any) =>
    apiRequest("/trucks", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest(`/trucks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest(`/trucks/${id}`, {
      method: "DELETE",
    }),
}

// Document API functions
export const documentApi = {
  getAll: () => apiRequest("/documents"),
  upload: (formData: FormData) =>
    apiRequest("/documents", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    }),
}

// Payment API functions
export const paymentApi = {
  getAll: () => apiRequest("/payments"),
  create: (data: any) =>
    apiRequest("/payments", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}

// Profile API functions
export const profileApi = {
  get: () => apiRequest("/profile"),
  update: (data: any) =>
    apiRequest("/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}

// E-Card API functions
export const ecardApi = {
  getAll: () => apiRequest("/ecards"),
  create: (data: any) =>
    apiRequest("/ecards", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}

// Route API functions
export const routeApi = {
  calculate: (data: any) =>
    apiRequest("/routes", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}
