// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addPaymentRecord POST /api/paymentRecord/add */
export async function addPaymentRecordUsingPost(
  body: API.PaymentRecordAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/paymentRecord/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listPaymentRecordVOByPage POST /api/paymentRecord/list/page/vo */
export async function listPaymentRecordVoByPageUsingPost(
  body: API.PaymentRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePaymentRecordVO_>('/api/paymentRecord/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
