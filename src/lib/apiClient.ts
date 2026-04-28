import { readAuthToken } from "./authStorage";

const API_BASE_URL = "http://localhost:8080/";

export type ApiRequestError = {
  status: number;
  message: string;
};

function buildHeaders(withAuth = false): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json; charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
  };

  if (withAuth) {
    const token = readAuthToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

async function parseError(response: Response): Promise<ApiRequestError> {
  const message = await response.text();

  return {
    status: response.status,
    message,
  };
}

async function requestJson<T>(path: string, init: RequestInit, expectJson = true): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);

  if (!response.ok) {
    throw await parseError(response);
  }

  if (!expectJson || response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function apiGet<T>(path: string, withAuth = false): Promise<T> {
  return requestJson<T>(path, {
    method: "GET",
    headers: buildHeaders(withAuth),
  });
}

export function apiPost<T>(path: string, body: unknown, withAuth = false): Promise<T> {
  return requestJson<T>(path, {
    method: "POST",
    headers: buildHeaders(withAuth),
    body: JSON.stringify(body),
  });
}

export function apiPut<T>(path: string, body: unknown, withAuth = false): Promise<T> {
  return requestJson<T>(path, {
    method: "PUT",
    headers: buildHeaders(withAuth),
    body: JSON.stringify(body),
  });
}

export function apiDelete(path: string, withAuth = false): Promise<void> {
  return requestJson<void>(
    path,
    {
      method: "DELETE",
      headers: buildHeaders(withAuth),
    },
    false,
  );
}
