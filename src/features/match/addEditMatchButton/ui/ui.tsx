import { Button, Checkbox, DatePicker, Form, Modal, Select } from 'antd';
import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { fetchLeagues, getLeagues } from 'entities/league';
import { createMatch, Match } from 'entities/match';
import { fetchTeams, getTeams, updateMatch } from 'entities/team';
import { fetchChannels, getChannels } from 'entities/channel';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AddEditMatchButtonProps {
  match?: Match;
}

interface FormValues {
  homeTeamId: string;
  awayTeamId: string;
  top: boolean;
  date: Date;
  channelId: string;
  leagueId: string;
}

export const AddEditMatchButton: FC<AddEditMatchButtonProps> = ({ match }) => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isAddMode = !match;

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchLeagues());
    dispatch(fetchChannels());
  }, [dispatch]);

  const teams = useSelector(getTeams);
  const leagues = useSelector(getLeagues);
  const channels = useSelector(getChannels);

  const showModal = () => {
    setOpenModal(true);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const hideModalResetFields = () => {
    hideModal();
    form.resetFields();
  };

  const handleSubmit = (formValues: FormValues) => {
    if (isAddMode) {
      dispatch(createMatch(formValues)).finally(hideModalResetFields);
    } else {
      const formValuesForUpdate = {
        id: match.id,
        ...formValues,
      };

      dispatch(updateMatch(formValuesForUpdate)).finally(hideModalResetFields);
    }
  };

  return (
    <>
      <Button type='primary' style={{ marginBottom: isAddMode ? 16 : 0 }} onClick={showModal}>
        {isAddMode ? 'Создать' : 'Редактировать'}
      </Button>
      <Modal
        cancelText='Отменить'
        okText='Ок'
        title={isAddMode ? 'Добавить матч' : 'Редактировать матч'}
        centered
        onCancel={hideModalResetFields}
        open={openModal}
        onOk={form.submit}
        footer={[
          <Button key='back' onClick={hideModalResetFields}>
            Отменить
          </Button>,
          <Button key='submit' type='primary' onClick={form.submit}>
            Подтвердить
          </Button>,
        ]}
      >
        <Form onFinish={handleSubmit} initialValues={match} form={form}>
          <Form.Item
            label='Хозяин'
            name='homeTeamId'
            rules={[{ required: true, message: 'Выберите хозяина!' }]}
          >
            <Select
              placeholder='Выберите хозяина'
              options={teams}
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
            />
          </Form.Item>
          <Form.Item
            label='Гость'
            name='awayTeamId'
            rules={[{ required: true, message: 'Выберите гостя!' }]}
          >
            <Select
              placeholder='Выберите гостя'
              options={teams}
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
            />
          </Form.Item>
          <Form.Item
            label='Лига'
            name='leagueId'
            rules={[{ required: true, message: 'Выберите лигу!' }]}
          >
            <Select
              placeholder='Выберите лигу'
              options={leagues}
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Выберите время!' }]}
            label='Время'
            name='date'
            getValueProps={(date) => {
              if (date) {
                return { value: dayjs(date) };
              }

              return { value: undefined };
            }}
          >
            <DatePicker showTime={{ format: 'HH:mm' }} placeholder='Выберите время' />
          </Form.Item>
          <Form.Item
            name='channelId'
            label='Телеканал'
            rules={[{ required: true, message: 'Выберите телеканал!' }]}
          >
            <Select
              placeholder='Выберите телеканал'
              options={channels}
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
            />
          </Form.Item>
          <Form.Item
            initialValue={isAddMode ? false : undefined}
            valuePropName='checked'
            name='top'
          >
            <Checkbox>Топ</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
