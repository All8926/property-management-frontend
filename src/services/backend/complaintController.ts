// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addComplaint POST /api/complaint/add */
export async function addComplaintUsingPost(
  body: API.ComplaintAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/complaint/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteComplaint POST /api/complaint/delete */
export async function deleteComplaintUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/complaint/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editComplaint POST /api/complaint/edit */
export async function editComplaintUsingPost(
  body: API.ComplaintEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/complaint/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listComplaintVOByPage POST /api/complaint/list/page/vo */
export async function listComplaintVoByPageUsingPost(
  body: API.ComplaintQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageComplaintVO_>('/api/complaint/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateComplaint POST /api/complaint/update */
export async function updateComplaintUsingPost(
  body: API.ComplaintUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/complaint/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
