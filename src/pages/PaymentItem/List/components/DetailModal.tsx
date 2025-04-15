import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Modal, QRCode, Space, theme} from 'antd';
import React from 'react';



interface Props {
  oldData?: API.User;
  visible: boolean;
  columns: ProColumns<API.User>[];
  onCancel: () => void;
}


/**
 * 详情弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const {oldData, visible, columns, onCancel} = props;
  const { useToken } = theme;
  const { token } = useToken();

  const [payQrcodeVisible, setPayQrcodeVisible] = React.useState<boolean>(false);

  if (!oldData) {
    return <></>;
  }

  return (
   <>
     <Modal
       destroyOnClose
       title={'详情'}
       open={visible}
       footer={null}
       onCancel={() => {
         console.log('cancel')
         onCancel?.();
       }}
     >
       <ProTable
         type="form"
         columns={columns}
         form={{
           initialValues: oldData,
           readonly: true,
           submitter: {
             render: () => {
               return (
                 <Space size="middle">
                   <Button
                     onClick={() => {
                       onCancel?.();
                     }}
                   >
                     取消
                   </Button>
                   <Button type={"primary"} onClick={() => setPayQrcodeVisible(true)}>
                     支付
                   </Button>
                 </Space>

               );
             },
           },


         }}

       />
     </Modal>
   <Modal open={payQrcodeVisible} onCancel={() => setPayQrcodeVisible(false)} footer={null}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center',gap: 20}}>
      <QRCode value="https://ant.design/" color={token.colorSuccessText} />
      <p>请使用微信扫码支付</p>
      <Button type={"primary"} onClick={() => setPayQrcodeVisible(false)}>
        支付完成
      </Button>
    </div>
   </Modal>
   </>

  );
};
export default UpdateModal;
