// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addRepairs POST /api/repairs/add */
export async function addRepairsUsingPost(
  body: API.RepairsAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/repairs/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addComment POST /api/repairs/comment/add */
export async function addCommentUsingPost(
  body: API.RepairsCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/repairs/comment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteRepairs POST /api/repairs/delete */
export async function deleteRepairsUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/repairs/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editRepairs POST /api/repairs/edit */
export async function editRepairsUsingPost(
  body: API.RepairsEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/repairs/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listRepairsVOByPage POST /api/repairs/list/page/vo */
export async function listRepairsVoByPageUsingPost(
  body: API.RepairsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRepairsVO_>('/api/repairs/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateRepairs POST /api/repairs/update */
export async function updateRepairsUsingPost(
  body: API.RepairsUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/repairs/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
