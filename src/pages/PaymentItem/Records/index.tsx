import {deleteUserUsingPost} from '@/services/backend/userController';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';

import {Button, message, Modal, Space, Typography} from 'antd';
import React, {useRef, useState} from 'react';

import {Access, useAccess} from 'umi';
import {deletePaymentItemUsingPost, listPaymentItemVoByPageUsingPost} from "@/services/backend/paymentItemController";
import CreateModal from "@/pages/PaymentItem/List/components/CreateModal";
import UpdateModal from "@/pages/PaymentItem/List/components/UpdateModal";
import DetailModal from "@/pages/PaymentItem/List/components/DetailModal";
import {listPaymentRecordVoByPageUsingPost} from "@/services/backend/paymentRecordController";

/**
 * 缴费记录页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示查看窗口
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.User>();

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
    },
  ];


  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={'缴费项目列表'}
        actionRef={actionRef}
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
          } as API.UserQueryRequest);

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
export default UserAdminPage;
