import { Space, Table, Typography } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Channel, fetchChannels, getChannels, getChannelStatus } from 'entities/channel';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddEditChannelButton } from 'features/channel/addEditChannelButton';
import { DeleteChannelButton } from 'features/channel/deleteChannelButton';

const { Title } = Typography;
const { Column } = Table;

const Channels = () => {
  const dispatch = useAppDispatch();

  const channels = useSelector(getChannels);
  const channelStatus = useSelector(getChannelStatus);

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  return (
    <>
      <AddEditChannelButton />
      <Table
        loading={channelStatus === 'loading'}
        rowKey={'name'}
        dataSource={channels}
        title={() => <Title level={3}>Телеканалы</Title>}
      >
        <Column align='center' title='Название' dataIndex='name' />
        <Column align='center' title='Ссылка' dataIndex='link' ellipsis />
        <Column
          align='center'
          title='Действия'
          render={(_, channel: Channel) => {
            return (
              <Space size='middle'>
                <DeleteChannelButton id={channel.id} />
                <AddEditChannelButton channel={channel} />
              </Space>
            );
          }}
        />
      </Table>
    </>
  );
};

export default Channels;
