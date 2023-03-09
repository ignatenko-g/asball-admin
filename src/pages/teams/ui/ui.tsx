import { Table, Typography, Image, Space } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchTeams, getTeams, getTeamStatus, Team } from 'entities/team';
import { fetchLeagues } from 'entities/league';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DeleteTeamButton } from 'features/team/deleteTeamButton';
import { AddEditTeamButton } from 'features/team/addEditTeamButton';

const { Column } = Table;
const { Title } = Typography;

const TeamsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchLeagues());
  }, [dispatch]);

  const teams = useSelector(getTeams);
  const teamStatus = useSelector(getTeamStatus);

  return (
    <>
      <AddEditTeamButton />
      <Table
        loading={teamStatus === 'loading'}
        dataSource={teams}
        rowKey={'name'}
        title={() => <Title level={3}>Команды</Title>}
      >
        <Column align='center' title='Название' dataIndex='name' />
        <Column
          align='center'
          title='Лига'
          dataIndex='league'
          render={({ name }) => {
            return name;
          }}
        />
        <Column
          align='center'
          title='Изображение'
          render={({ images }: Team) => {
            return (
              images && (
                <Image
                  src={process.env.REACT_APP_SERVER_URL + '/uploads/' + images.medium}
                  width={35}
                  preview={false}
                />
              )
            );
          }}
        />
        <Column
          align='center'
          title='Действия'
          render={(_, team: Team) => {
            return (
              <Space size='middle'>
                <DeleteTeamButton id={team.id} />
                <AddEditTeamButton team={team} />
              </Space>
            );
          }}
        />
      </Table>
    </>
  );
};

export default TeamsPage;
