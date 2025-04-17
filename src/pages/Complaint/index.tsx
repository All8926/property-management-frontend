import { deleteUserUsingPost } from '@/services/backend/userController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

import { listComplaintVoByPageUsingPost } from '@/services/backend/complaintController';
import { uploadFileUsingPost } from '@/services/backend/fileController';
import { useModel } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, Space, Tag, Typography, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useRef, useState } from 'react';

/**
 * 投诉管理页面
 *
 * @constructor
 */
const ComplaintPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.ComplaintVO>();

  const { initialState, setInitialState } = useModel('@@initialState');


  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.User) => {
    if (row.id === initialState?.currentUser?.id) {
      message.error('不能删除自己');
      return;
    }
    Modal.confirm({
      title: '确认删除?',
      content: `你确定要删除用户 ${row.userName} 吗?`,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
          await deleteUserUsingPost({
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
      },
    });
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.ComplaintVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '详情',
      dataIndex: 'content',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '投诉人',
      dataIndex: ['user', 'userName'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      render: (_, record) => {
        if (record.status === 0) {
          return <Tag color="processing" >待处理</Tag>;
        } else if (record.status === 1) {
          return <Tag color="success">已处理</Tag>;
        } else if (record.status === 2) {
          return <Tag color="error">已驳回</Tag>;
        }
        return <Tag color="default">未知</Tag>;
      },
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle"  >
          {initialState?.currentUser?.id === record.userId && (
            <>
              <Typography.Link
              key="update"
                onClick={() => {
                  setCurrentRow(record);
                  setUpdateModalVisible(true);
                }}
              >
                修改
              </Typography.Link>
              <Typography.Link type="danger" onClick={() => handleDelete(record)} key="delete">
                删除
              </Typography.Link>
            </>
          )}
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={'投诉列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listComplaintVoByPageUsingPost({
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
    </PageContainer>
  );
};
export default ComplaintPage;
