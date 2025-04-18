import { editVisitorUsingPost } from '@/services/backend/visitorController';
import { uploadFileUsingPost } from '@/services/backend/fileController';
import { checkImageFile } from '@/utils';
import {ProColumns, ProForm, ProFormInstance, ProFormText, ProFormTextArea, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import { Form, message, Modal, Upload } from 'antd';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  visible: boolean;
  oldData: API.VisitorVO | undefined;
  onSubmit: (values: API.VisitorEditRequest) => void;
  onCancel: () => void;
  columns: ProColumns<API.VisitorEditRequest>[];
}

/**
 * 修改弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel, oldData,columns } = props;

  /**
   * 修改节点
   * @param fields
   */
  const handleUpdate = async (fields: API.VisitorEditRequest) => {
    const hide = message.loading('正在修改');
    try {
      await editVisitorUsingPost(fields);
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };




  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      title={'修改'}
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
        onSubmit={async (values: API.VisitorEditRequest) => {
          const success = await handleUpdate({...values, id: oldData.id});
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
