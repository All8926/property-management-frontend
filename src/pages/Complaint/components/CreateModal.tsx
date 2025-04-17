import { addComplaintUsingPost } from '@/services/backend/complaintController';
import { uploadFileUsingPost } from '@/services/backend/fileController';
import { ProForm, ProFormInstance, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import '@umijs/max';
import { Form, message, Modal, Upload } from 'antd';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import React, { useRef, useState } from 'react';

interface Props {
  visible: boolean;
  onSubmit: (values: API.ComplaintAddRequest) => void;
  onCancel: () => void;
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.ComplaintAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addComplaintUsingPost(fields);
      hide();
      message.success('创建成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const formRef = useRef<ProFormInstance>();

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.response?.data as string));
    setPreviewTitle(file.name || '');
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);


  const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      const result = await uploadFileUsingPost({ biz: 'complaint_image' }, {}, file as File);
      (file as any).url = result.data; // 让上传组件能预览
      onSuccess?.(result, file);
    } catch (err) {
      message.error('上传失败');
      onError?.(err as any);
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
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          values.imageList = imageUrls;
          console.log('表单提交数据：', values);
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <ProFormText name="title" label="标题" />
        <ProFormTextArea name="content" label="详情" />

        <Form.Item
          label="图片"
          name="imageList"

        >
          <Upload
            listType="picture-card"
            accept="image/*"
            multiple
            fileList={fileList}
            customRequest={customRequest}
            onPreview={handlePreview}
            onChange={({ fileList: newFileList }) => {
              console.log('fileList:', newFileList);

              setFileList(newFileList);
              const urls = newFileList
                .filter((file) => file.status === 'done' && (file.url || file.response?.data))
                .map((file) => file.url || file.response?.data);
              setImageUrls(urls);
            }}
          >
            上传
          </Upload>
        </Form.Item>
      </ProForm>
      <Modal
        key={'imageList'}
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Modal>
  );
};
export default CreateModal;
