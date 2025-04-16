import { updateUserUsingPost } from '@/services/backend/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import {message, Modal, Space, Typography} from 'antd';
import React from 'react';
import {updatePaymentItemUsingPost} from "@/services/backend/paymentItemController";

interface Props {
  oldData?: API.User;
  visible: boolean;
  onSubmit: (values: API.PaymentItemUpdateRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.PaymentItemUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updatePaymentItemUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible,   onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.PaymentItem>[] = [
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
  ];


  return (
    <Modal
      destroyOnClose
      title={'更新'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}

    >
      <ProTable
        type="form"
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: API.PaymentItemUpdateRequest) => {
          const success = await handleUpdate({...values,id:oldData.id as any});
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
