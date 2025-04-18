import CreateModal from '@/pages/Account/User/components/CreateModal';
import UpdateModal from '@/pages/Account/User/components/UpdateModal';
import { deleteUserUsingPost, listUserByPageUsingPost } from '@/services/backend/userController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import {message, Modal, Space, Typography} from 'antd';
import React, { useRef, useState } from 'react';
import {useModel} from "@@/exports";


/**
 * 用户管理页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.User>();

  const {initialState } = useModel('@@initialState');

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.User) => {
    if(row.id === initialState?.currentUser?.id){
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
      }
    });
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.User>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueEnum: {
        user: '业主',
        admin: '管理员',
        serviceman: '维修人员',
      },
    },
    {
      title: '手机号',
      dataIndex: 'userPhone',
      valueType: 'text'
    },
    {
      title: '楼栋',
      dataIndex: 'louDong',
      valueType: 'text',
    },
    {
      title: '单元号',
      dataIndex: 'unitNumber',
      valueType: 'text',
    },
    {
      title: '门牌号',
      dataIndex: 'houseNumber',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '房屋大小',
      dataIndex: 'houseSize',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={'用户列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listUserByPageUsingPost({
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
        columns={columns}
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
export default UserAdminPage;
