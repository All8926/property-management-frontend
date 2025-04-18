import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProForm, ProFormTextArea, ProTable } from '@ant-design/pro-components';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

import DetailModal from '@/pages/Repairs/components/DetailModal';
import {
  addCommentUsingPost,
  deleteRepairsUsingPost,
  listRepairsVoByPageUsingPost,
} from '@/services/backend/repairsController';
import { useModel } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 报修管理页面
 *
 * @constructor
 */
const RepairsPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示查看窗口
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  // 是否显示评价窗口
  const [commentModalVisible, setCommentModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.RepairsVO>();

  const { initialState } = useModel('@@initialState');

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.DeleteRequest) => {
    Modal.confirm({
      title: '确认删除?',
      content: `你确定要删除该报修吗?`,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
          await deleteRepairsUsingPost({
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
   * 评价
   */
  const handleEvaluate = async (record: API.RepairsCommentRequest) => {
    const hide = message.loading('正在删除');
    try {
      await addCommentUsingPost(record);
      hide();
      message.success('评价成功');
      actionRef?.current?.reload();
      setCommentModalVisible(false);
    }catch (error: any) {
      console.log(error);

    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.RepairsVO>[] = [
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
      title: '报修人',
      dataIndex: ['user', 'userName'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: '审核中',
        1: '已驳回',
        2: '维修中',
        3: '无法维修',
        4: '待评价',
        5: '已完成',
      },
      render: (_, record) => {
        if (record.status === 0) {
          return <Tag color="processing">审核中</Tag>;
        }
        if (record.status === 1) {
          return <Tag color="error">已驳回</Tag>;
        }
        if (record.status === 2) {
          return <Tag color="cyan">维修中</Tag>;
        }
        if (record.status === 3) {
          return <Tag color="error">无法维修</Tag>;
        }
        if (record.status === 4) {
          return <Tag color="orange">待评价</Tag>;
        }
        if (record.status === 5) {
          return <Tag color="success">已完成</Tag>;
        }
        return <Tag color="default">未知</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      sorter: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          {initialState?.currentUser?.id === record.userId && (
            <>
              {record.status === 0 && (
                <Typography.Link
                  key="update"
                  onClick={() => {
                    setCurrentRow(record);
                    setUpdateModalVisible(true);
                  }}
                >
                  修改
                </Typography.Link>
              )}
              <Typography.Link type="danger" onClick={() => handleDelete(record)} key="delete">
                删除
              </Typography.Link>
            </>
          )}
          <Typography.Link
            key="detail"
            onClick={() => {
              setCurrentRow(record);
              setDetailModalVisible(true);
            }}
          >
            查看
          </Typography.Link>
          {record.status === 4 && record.userId === initialState?.currentUser?.id && (
            <Typography.Link
              key="comment"
              type='warning'
              onClick={() => {
                setCurrentRow(record);
                setCommentModalVisible(true);
              }}
            >
              评价
            </Typography.Link>
          )}
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={'报修列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="create"
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

          const { data, code } = await listRepairsVoByPageUsingPost({
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
      <DetailModal
        visible={detailModalVisible}
        onCancel={setDetailModalVisible.bind(null, false)}
        oldData={currentRow}
        onSubmit={() => {
          setDetailModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />
      <Modal
        destroyOnClose
        open={commentModalVisible}
        footer={null}
        onCancel={() => {
          setCommentModalVisible(false);
        }}
      >
        <ProForm
          onFinish={async (values) => {
            console.log('表单提交数据：', values);
            handleEvaluate({...values, id: currentRow?.id})
          }}
        >
          <ProFormTextArea  rules={[{ required: true, message: '请输入评价内容' }]} name="comment" label="评价内容" />
        </ProForm>
      </Modal>
    </PageContainer>
  );
};
export default RepairsPage;
