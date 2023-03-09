import { Space, Table, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { fetchMatches, getMatches, getMatchStatus, Match } from 'entities/match';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DeleteMatchButton } from 'features/match/deleteMatchButton';
import { AddEditMatchButton } from 'features/match/addEditMatchButton';

const { Title } = Typography;
const { Column } = Table;

const MatchesPage: FC = () => {
  const dispatch = useAppDispatch();
  const matches = useSelector(getMatches);
  const matchStatus = useSelector(getMatchStatus);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  return (
    <>
      <AddEditMatchButton />
      <Table
        rowKey={'id'}
        dataSource={matches}
        title={() => <Title level={3}>Матчи</Title>}
        loading={matchStatus === 'loading'}
      >
        <Column
          align='center'
          title='Название'
          render={(_, record: Match) => {
            return (
              <>
                {record.homeTeam.name} - {record.awayTeam.name}
              </>
            );
          }}
        />
        <Column
          align='center'
          render={(_, record: Match) => {
            return <>{dayjs(record.date).locale('ru').format('D MMMM HH:mm')}</>;
          }}
          title='Начало'
        />
        <Column
          dataIndex='top'
          align='center'
          title='Топ-матч'
          render={(_, record: Match) => {
            return (
              <>
                {record.top ? (
                  <CheckOutlined style={{ color: '#52c41a' }} />
                ) : (
                  <CloseOutlined style={{ color: '#f5222d' }} />
                )}
              </>
            );
          }}
        />
        <Column
          title='Лига'
          render={(_, record: Match) => {
            return <>{record.league.name}</>;
          }}
        />
        <Column
          align='center'
          title='Действия'
          render={(_, record: Match) => {
            return (
              <Space size='middle'>
                <DeleteMatchButton id={record.id} />
                <AddEditMatchButton match={record} />
              </Space>
            );
          }}
        />
      </Table>
    </>
  );
};

export default MatchesPage;
