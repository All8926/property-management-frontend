// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addNotice POST /api/notice/add */
export async function addNoticeUsingPost(
  body: API.NoticeAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/notice/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteNotice POST /api/notice/delete */
export async function deleteNoticeUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/notice/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listNoticeVOByPage POST /api/notice/list/page/vo */
export async function listNoticeVoByPageUsingPost(
  body: API.NoticeQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageNoticeVO_>('/api/notice/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** publishNotice POST /api/notice/publish */
export async function publishNoticeUsingPost(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/notice/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateNotice POST /api/notice/update */
export async function updateNoticeUsingPost(
  body: API.NoticeUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/notice/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
