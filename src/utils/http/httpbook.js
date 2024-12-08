import requestbook from '@/utils/http/requestbook'

export function get(url, params) {
  return requestbook.get(url, { params });
}

export function post(url, data, config) {
  return requestbook.post(url, data, config);
}

export function patch(url, data, config) {
  return requestbook.patch(url, data, config);
}

export const DELETE = (url, params) => requestbook.delete(url, { params });
