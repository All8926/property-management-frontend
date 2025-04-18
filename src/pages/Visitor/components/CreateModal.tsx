import { addVisitorUsingPost } from '@/services/backend/visitorController';
import { uploadFileUsingPost } from '@/services/backend/fileController';
import { checkImageFile } from '@/utils';
import {ProColumns, ProForm, ProFormInstance, ProFormText, ProFormTextArea, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import { Form, message, Modal, Upload } from 'antd';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import React, { useRef, useState } from 'react';

interface Props {
  visible: boolean;
  onSubmit: (values: API.VisitorAddRequest) => void;
  onCancel: () => void;
  columns: ProColumns<API.VisitorAddRequest>[];
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel,columns } = props;


  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.VisitorAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addVisitorUsingPost(fields);
      hide();
      message.success('创建成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };




  return (
    <Modal
      key={'createModal'}
      maskClosable={false}
      destroyOnClose
      title={'创建'}
      open={visible}
      footer={null}
      onCancel={() => {

        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.VisitorAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
