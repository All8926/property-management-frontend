// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addVisitor POST /api/visitor/add */
export async function addVisitorUsingPost(
  body: API.VisitorAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/visitor/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteVisitor POST /api/visitor/delete */
export async function deleteVisitorUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/visitor/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editVisitor POST /api/visitor/edit */
export async function editVisitorUsingPost(
  body: API.VisitorEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/visitor/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listVisitorVOByPage POST /api/visitor/list/page/vo */
export async function listVisitorVoByPageUsingPost(
  body: API.VisitorQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageVisitorVO_>('/api/visitor/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateVisitor POST /api/visitor/update */
export async function updateVisitorUsingPost(
  body: API.VisitorUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/visitor/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
