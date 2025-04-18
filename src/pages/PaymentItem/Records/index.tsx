
import type { ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';

import React  from 'react';

import {Access, useAccess} from 'umi';
import {listPaymentRecordVoByPageUsingPost} from "@/services/backend/paymentRecordController";

/**
 * 缴费记录页面
 *
 * @constructor
 */
const PaymentRecordsPage: React.FC = () => {


  const access = useAccess();


  /**
   * 表格列配置
   */
  const columns: ProColumns<API.PaymentRecordVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '项目名称',
      dataIndex: 'paymentName',
      valueType: 'text',
    },
    {
      title: '缴费金额',
      dataIndex: 'payAmount',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => {
        return text + '元';
      }

    },

    {
      title: '缴费用户',
      dataIndex: "userName",
      valueType: 'text',
    },

    {
      title: '缴费时间',
      dataIndex: 'payDate',
      valueType: 'dateTime',
      sorter: true,
    },
  ];


  return (
    <PageContainer>
      <ProTable<API.PaymentRecordVO>
        headerTitle={'缴费项目列表'}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Access accessible={access.canAdmin} fallback={null} key="createBtn">

          </Access>
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const {data, code} = await listPaymentRecordVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.PaymentRecordQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />

    </PageContainer>
  );
};
export default PaymentRecordsPage;
