 
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

/**
 * 缴费项目页面
 *
 * @constructor
 */
const PaymentListPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示查看窗口
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.PaymentItem>();

  const access = useAccess();
  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.PaymentItem) => {
    Modal.confirm({
      title: '确认删除?',
      content: `你确定要删除项目 ${row.name} 吗?`,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
          await deletePaymentItemUsingPost({
            id: row.id as any,
          });
          hide();
          message.success('删除成功');
          actionRef?.current?.reload();
          return true;
        } catch (error: any) {
          hide();
          message.error('删除失败，' + error.message);
          return false;
        }
      },
      onCancel() {
        message.info('取消删除');
      }
    });
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.PaymentItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入项目名称',
          },
        ],
      }
    },
    {
      title: '缴费金额',
      dataIndex: 'amount',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入缴费金额',
          }
        ]
      },
      render: (text) => {
        return text + '元';
      }

    },

    {
      title: '过期时间',
      dataIndex: 'expirationTime',
      valueType: 'dateTime',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择过期时间',
          }
        ]
      }
    },
    {
      title: '介绍',
      dataIndex: 'profile',
      valueType: 'textarea',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '创建人',
      dataIndex: ['createUser', 'userName'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,

    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>

          <Space size="middle">
            <Access accessible={access.canAdmin} fallback={null}>
              <Typography.Link
                onClick={() => {
                  setCurrentRow(record);
                  setUpdateModalVisible(true);
                }}
              >
                修改
              </Typography.Link>
            </Access>
            <Access accessible={access.canAdmin} fallback={null}>
              <Typography.Link type="danger" onClick={() => handleDelete(record)}>
                删除
              </Typography.Link>
            </Access>
            <Typography.Link
              onClick={() => {
                setCurrentRow(record);
                setDetailModalVisible(true);
              }}
            >
              查看
            </Typography.Link>
          </Space>


        </>

      ),
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
            <Button
              type="primary"
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
              <PlusOutlined/> 新建
            </Button>
          </Access>
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const {data, code} = await listPaymentItemVoByPageUsingPost({
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
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
      <DetailModal
        visible={detailModalVisible}
        columns={columns}
        oldData={currentRow}
        onCancel={() => {
          setDetailModalVisible(false);
        }}
        onSubmit={() => {
          setDetailModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default PaymentListPage;
