import { updateRepairsUsingPost } from '@/services/backend/repairsController';
import { getRepairsListUsingGet } from '@/services/backend/userController';
import { useAccess } from '@@/exports';
import {
  ProForm,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Descriptions, DescriptionsProps, Image, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import { Access } from 'umi';

interface Props {
  oldData?: API.RepairsVO;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

/**
 * 详情弹窗
 * @param props
 * @constructor
 */
const DetailModal: React.FC<Props> = (props) => {
  const { oldData, visible, onCancel, onSubmit } = props;
  const access = useAccess();

  const [serviceUserList, setServiceUserList] = React.useState<API.UserVO[]>([]);

  // 状态映射表
  const statusMap: { [key: number]: string } = {
    0: '审核中',
    1: '已驳回',
    2: '维修中',
    3: '无法维修',
    4: '待评价',
    5: '已完成',
    6: '未知状态',
  };

  const getServiceUserList = async () => {
    try {
      const res = await getRepairsListUsingGet();
      setServiceUserList(res?.data || []);
    } catch (error) {
      message.error('获取维修人员列表失败');
    }
  };
  // 获取维修人员列表
  useEffect(() => {
    getServiceUserList();
  }, []);

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '投诉人',
      children: oldData?.user?.userName,
    },
    {
      key: '2',
      label: '手机号码',
      children: oldData?.user?.userPhone || '无',
    },
    {
      key: '3',
      label: '当前状态',
      children: statusMap[oldData?.status ?? 6],
    },
    {
      key: '4',
      label: '创建时间',
      children: oldData?.createTime,
    },
    {
      key: '5',
      label: '详情',
      children: oldData?.content,
      span: 2,
    },
    {
      key: '6',
      label: '审核意见',
      children: oldData?.remark || '无',
      span: 2,
    },
  ];

  /**
   * 修改节点
   * @param fields
   */
  const handleUpdate = async (fields: API.RepairsUpdateRequest) => {
    const hide = message.loading('正在操作');
    console.log('fields', fields);

    try {
      await updateRepairsUsingPost(fields);
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
        <Descriptions column={2} title={oldData.title} items={items}></Descriptions>
        <Descriptions style={{ marginTop: '15px' }} column={2}>
          {(oldData.status ?? 0) >= 2 && (
            <>
              <Descriptions.Item label="维修人" key={'7'} span={1}>
                {oldData.servicemanUser?.userName}
              </Descriptions.Item>
              <Descriptions.Item label="维修人手机号" key={'8'} span={1}>
                {oldData.servicemanUser?.userPhone}
              </Descriptions.Item>
            </>
          )}
          {(oldData.status ?? 0) >= 4 && (
            <Descriptions.Item label="评价" key={'9'} span={2}>
              {oldData.comment || '暂无评价'}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="图片" key={'7'} span={1}>
            {oldData?.imageList?.length ? '' : '无'}
          </Descriptions.Item>
        </Descriptions>

        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {oldData.imageList &&
            oldData.imageList.map((item) => {
              return (
                <Image
                  key={item}
                  width={200}
                  src={item}
                  placeholder={<Image preview={false} src={item} width={200} />}
                />
              );
            })}
        </Image.PreviewGroup>
        <Access accessible={access.canAdmin} fallback={null}>
          {oldData.status === 0 && (
            <ProForm
              style={{ marginTop: 24 }}
              layout="horizontal"
              onFinish={async (values) => {
                console.log('表单提交数据：', values);
                const success = await handleUpdate({ ...values, id: oldData.id });
                if (success) {
                  onSubmit?.();
                }
              }}
            >
              <ProFormRadio.Group
                style={{ marginTop: 16 }}
                rules={[{ required: true, message: '请选择状态' }]}
                name="status"
                label="审核"
                options={[
                  {
                    label: '驳回',
                    value: 1,
                  },
                  {
                    label: '指派维修员',
                    value: 2,
                  },
                ]}
              />
              <ProFormDependency name={['status']}>
                {({ status }) => {
                  if (status === 1) {
                    return (
                      <ProFormTextArea
                        name="remark"
                        label="处理意见"
                        rules={[{ required: true, message: '请输入驳回原因' }]}
                      />
                    );
                  }
                  if (status === 2) {
                    return (
                      <ProFormSelect
                        name="servicemanId"
                        label="维修员"
                        rules={[{ required: true, message: '请选择维修员' }]}
                        options={serviceUserList.map((item) => {
                          return {
                            label: item.userName,
                            value: item.id,
                          };
                        })}
                      />
                    );
                  }
                  return null;
                }}
              </ProFormDependency>
            </ProForm>
          )}
        </Access>
        <Access accessible={access.canServiceman} fallback={null}>
          {oldData.status === 2 && (
            <ProForm
              style={{ marginTop: 24 }}
              layout="horizontal"
              onFinish={async (values) => {
                console.log('表单提交数据：', values);
                const success = await handleUpdate({ ...values, id: oldData.id });
                if (success) {
                  onSubmit?.();
                }
              }}
            >
              <ProFormRadio.Group
                style={{ marginTop: 16 }}
                rules={[{ required: true, message: '请选择状态' }]}
                name="status"
                label="审核"
                options={[
                  {
                    label: '维修完成',
                    value: 4,
                  },
                  {
                    label: '无法维修',
                    value: 3,
                  },
                ]}
              />
              <ProFormDependency name={['status']}>
                {({ status }) => {
                  if (status === 3) {
                    return (
                      <ProFormTextArea
                        name="remark"
                        label="原因"
                        rules={[{ required: true, message: '请输入原因' }]}
                      />
                    );
                  }
                  return null;
                }}
              </ProFormDependency>
            </ProForm>
          )}
        </Access>
      </Modal>
    </>
  );
};
export default DetailModal;
