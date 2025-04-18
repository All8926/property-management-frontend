
import '@umijs/max';
import {  Descriptions, DescriptionsProps, Image, message, Modal } from 'antd';
import React from 'react';
import {ProForm, ProFormDependency, ProFormRadio, ProFormSelect, ProFormTextArea} from "@ant-design/pro-components";
import {  updateVisitorUsingPost} from "@/services/backend/visitorController";
import {useAccess} from "@@/exports";
import {Access} from "umi";



interface Props {
  oldData?: API.VisitorVO;
  visible: boolean;
  onCancel: () => void;
  onSubmit:() => void;
}


/**
 * 详情弹窗
 * @param props
 * @constructor
 */
const DetailModal: React.FC<Props> = (props) => {
  const {oldData, visible, onCancel ,onSubmit} = props;
  const access = useAccess();

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '创建人姓名',
      children: oldData?.user?.userName,
    },
    {
      key: '2',
      label: '创建人手机号',
      children: oldData?.user?.userPhone || '无',
    },
    {
      key: '2',
      label: '访客姓名',
      children: oldData?.visitorName || '无',
    },
    {
      key: '3',
      label: '访客手机号',
      children: oldData?.visitorPhone || '无',
    },
    {
      key: '4',
      label: '来访时间',
      children: oldData?.visitingTime,
    },
    {
      key: '5',
      label:'备注',
      children: oldData?.remark || '无',
    },
    {
      key: '6',
      label: '当前状态',
      children: oldData?.status === 0 ? '待审核' : oldData?.status === 1 ? '已通过' : '已拒绝',
    },
    {
      key: '7',
      label: '创建时间',
      children: oldData?.createTime,
    },
    {
      key: '8',
      label: '审核意见',
      children: oldData?.reason || '暂无',
    }

  ];

  /**
   * 修改节点
   * @param fields
   */
  const handleUpdate = async (fields: API.VisitorUpdateRequest) => {
    const hide = message.loading('正在操作');
    try {
      await updateVisitorUsingPost(fields);
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
   <>
     <Modal
       width={'40%'}
       destroyOnClose
       title={'详情'}
       open={visible}
       footer={null}
       onCancel={() => {
         onCancel?.();
       }}
     >
       <Descriptions column={2}  items={items} />

       <Access accessible={access.canAdmin} fallback={null}>
         {
           oldData.status === 0 &&
        ( <ProForm
           style={{ marginTop: 24 }}
           layout="horizontal"
           onFinish={async (values) => {
             console.log('表单提交数据：', values);
             const success = await handleUpdate({...values, id: oldData.id});
             if (success) {
               onSubmit?.();
             }
           }}
         >
           <ProFormRadio.Group
             style={{ marginTop: 16 }}
             rules={[{ required: true, message: '请选择' }]}
             name="status"
             label="状态"
             options={[
               {
                 label: '通过',
                 value: 1,
               },
               {
                 label: '拒绝',
                 value: 2,
               },
             ]}
           />
          <ProFormDependency name={['status']}>
            {({ status }) => {
              if (status === 2) {
                return (
                  <ProFormTextArea
                    name="reason"
                    label="拒绝原因"
                    rules={[{ required: true, message: '请输入拒绝原因' }]}
                  />
                );
              }
              return null;
            }}
          </ProFormDependency>
         </ProForm>)
         }
       </Access>

     </Modal>

   </>

  );
};
export default DetailModal;
