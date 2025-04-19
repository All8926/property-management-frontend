
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

import {deleteVisitorUsingPost, listVisitorVoByPageUsingPost} from '@/services/backend/visitorController';
import {  useModel} from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import { Button,   message, Modal, Space, Tag, Typography,  } from 'antd';
import React, { useRef, useState } from 'react';
import DetailModal from "@/pages/Visitor/components/DetailModal"; 

/**
 * 访客管理页面
 *
 * @constructor
 */
const VisitorPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示查看窗口
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.VisitorVO>();

  const { initialState  } = useModel('@@initialState');

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.DeleteRequest) => {
    Modal.confirm({
      title: '确认删除?',
      content: `你确定要删除该访客吗?`,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
          await deleteVisitorUsingPost({
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
  const columns: ProColumns<API.VisitorVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '来访人姓名',
      dataIndex: "visitorName",
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入来访人姓名',
          },
        ],
      }
    },
    {
      title: '来访人手机号',
      dataIndex: 'visitorPhone',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入来访人手机号',
          },
        ],
      }
    },
    {
      title: '来访时间',
      dataIndex: 'visitingTime',
      valueType: 'dateTime',
      sorter: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入来访时间',
          },
        ],
      },
      // fieldProps: {
      //   disabledDate:(current: any) => {
      //     return current && current < dayjs().startOf('day');
      //   },
      // }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: '待审核',
        1: '已通过',
        2: '已驳回',
      },
      render: (_, record) => {
        if (record.status === 0) {
          return <Tag color="processing" >待审核</Tag>;
        } else if (record.status === 1) {
          return <Tag color="success">已通过</Tag>;
        } else if (record.status === 2) {
          return <Tag color="error">已拒绝</Tag>;
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
              {record.status === 0 && (<Typography.Link
                key="update"
                onClick={() => {
                  setCurrentRow(record);
                  setUpdateModalVisible(true);
                }}
              >
                修改
              </Typography.Link>)}
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

        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={'访客列表'}
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

          const { data, code } = await listVisitorVoByPageUsingPost({
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
        columns={columns}
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
      <DetailModal visible={detailModalVisible} onCancel={setDetailModalVisible.bind(null, false)} oldData={currentRow} onSubmit={() => {
        setDetailModalVisible(false);
        setCurrentRow(undefined);
        actionRef.current?.reload();
      }} />
    </PageContainer>
  );
};
export default VisitorPage;
