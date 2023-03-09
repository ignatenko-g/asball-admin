import { Space, Table, Typography } from 'antd';
import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { fetchLeagues, getLeagues, getLeagueStatus, League } from 'entities/league';
import { AddEditLeagueButton } from 'features/league/addEditLeagueButton';
import { DeleteLeagueButton } from 'features/league/deleteLeagueButton';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const { Column } = Table;
const { Title } = Typography;

const LeaguesPage: FC = () => {
  const dispatch = useAppDispatch();
  const leagueStatus = useSelector(getLeagueStatus);
  const leagues = useSelector(getLeagues);

  useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

  return (
    <>
      <AddEditLeagueButton />
      <Table
        loading={leagueStatus === 'loading'}
        rowKey={'name'}
        dataSource={leagues}
        title={() => <Title level={3}>Лиги</Title>}
      >
        <Column align='center' title='Название' dataIndex='name' />
        <Column
          align='center'
          title='Действия'
          render={(_, league: League) => {
            return (
              <Space size='middle'>
                <DeleteLeagueButton id={league.id} />
                <AddEditLeagueButton league={league} />
              </Space>
            );
          }}
        />
      </Table>
    </>
  );
};

export default LeaguesPage;
