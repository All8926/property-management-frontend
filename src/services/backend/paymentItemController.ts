// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addPaymentItem POST /api/paymentItem/add */
export async function addPaymentItemUsingPost(
  body: API.PaymentItemAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/paymentItem/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deletePaymentItem POST /api/paymentItem/delete */
export async function deletePaymentItemUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/paymentItem/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listPaymentItemByPage POST /api/paymentItem/list/page */
export async function listPaymentItemByPageUsingPost(
  body: API.PaymentItemQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePaymentItem_>('/api/paymentItem/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listPaymentItemVOByPage POST /api/paymentItem/list/page/vo */
export async function listPaymentItemVoByPageUsingPost(
  body: API.PaymentItemQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePaymentItemVO_>('/api/paymentItem/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updatePaymentItem POST /api/paymentItem/update */
export async function updatePaymentItemUsingPost(
  body: API.PaymentItemUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/paymentItem/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
