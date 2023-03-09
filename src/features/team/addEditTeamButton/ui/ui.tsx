import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLeagues } from 'entities/league';
import { createTeam, Team, updateTeam } from 'entities/team';

interface AddEditTeamButtonProps {
  team?: Team;
}

interface FormValues {
  name: string;
  img: {
    file: File;
  };
  leagueId: string;
}

export const AddEditTeamButton: FC<AddEditTeamButtonProps> = ({ team }) => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isAddMode = !team;
  const leagues = useSelector(getLeagues);

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
      const formData = new FormData();

      const formValuesForCreate = {
        ...formValues,
        img: formValues.img ? formValues.img.file : '',
      };

      for (let key in formValuesForCreate) {
        formData.append(key, formValuesForCreate[key]);
      }

      dispatch(createTeam(formData)).finally(hideModalResetFields);
    } else {
      const formValuesForUpdate = {
        id: team.id,
        ...formValues,
      };

      dispatch(updateTeam(formValuesForUpdate)).finally(hideModalResetFields);
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
        title={isAddMode ? 'Добавить команду' : 'Редактировать команду'}
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
        <Form onFinish={handleSubmit} initialValues={team} form={form}>
          <Form.Item name='name' rules={[{ required: true, message: 'Введите название!' }]}>
            <Input placeholder='Введите название' />
          </Form.Item>
          <Form.Item name='leagueId' rules={[{ required: true, message: 'Выберите лигу!' }]}>
            <Select
              placeholder='Выберите лигу'
              options={leagues}
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
              showSearch
            />
          </Form.Item>

          {isAddMode && (
            <Form.Item name={'img'} valuePropName={'img'}>
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button>Загрузите изображение</Button>
              </Upload>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};
