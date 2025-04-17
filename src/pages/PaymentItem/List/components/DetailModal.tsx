import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Modal, QRCode, Space, theme} from 'antd';
import React from 'react';
import {deletePaymentItemUsingPost} from "@/services/backend/paymentItemController";
import {addPaymentRecordUsingPost} from "@/services/backend/paymentRecordController";



interface Props {
  oldData?: API.PaymentItem;
  visible: boolean;
  columns: ProColumns<API.PaymentItem>[];
  onCancel: () => void;
  onSubmit: () => void;
}


/**
 * 详情弹窗
 * @param props
 * @constructor
 */
const DetailModal: React.FC<Props> = (props) => {
  const {oldData, visible, columns, onCancel,onSubmit} = props;
  const { useToken } = theme;
  const { token } = useToken();

  const [payQrcodeVisible, setPayQrcodeVisible] = React.useState<boolean>(false);

  if (!oldData) {
    return <></>;
  }

  /**
   * 支付完成
   *
   * @param row
   */
  const handlePay = async () => {
    const hide = message.loading('正在操作');
    const params : API.PaymentRecordAddRequest = {
      paymentId: oldData.id
    }
    try {
      await addPaymentRecordUsingPost(params);
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }finally {
      setPayQrcodeVisible(false)
    }
  };

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
   <Modal open={payQrcodeVisible} onCancel={() => setPayQrcodeVisible(false)} footer={null} zIndex={9999}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center',gap: 20}}>
      <QRCode value="https://ant.design/" color={token.colorSuccessText} />
      <p>请使用微信扫码支付</p>
      <Button type={"primary"} onClick={ async () => {
        const success = await handlePay();
        if (success) {
          onSubmit?.();
        }

      }}>
        支付完成
      </Button>
    </div>
   </Modal>
   </>

  );
};
export default DetailModal;
