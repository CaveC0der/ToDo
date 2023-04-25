import { FC, useContext, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Card, Col, Container, Row } from 'react-bootstrap';
import TodoList from '../../components/TodoList/TodoList';
import { IFilter } from '../../types/IFilter';
import { useTodoEntries } from '../../hooks/useTodoEntries';
import Filter from '../../components/Filter/Filter';
import './Todos.css';
import CreateTodoModal from '../../components/Modals/CreateTodoModal';
import { observer } from 'mobx-react-lite';
import GlobalContext from '../../GlobalContext';
import Loader from '../../components/Loader/Loader';
import { ICreateTodoEntry, IUpdateTodoEntry } from '../../types/ITodoEntry';

const Todos: FC = observer(() => {
  const { todoStore } = useContext(GlobalContext);
  const [filter, setFilter] = useState<IFilter>({ sort: '', query: '' });
  const [createTodoModal, setCreateTodoModal] = useState<boolean>(false);
  const filteredTodoEntries = useTodoEntries(todoStore.todoList, filter.sort, filter.query);

  const refetch = async () => {
    await todoStore.fetchTodoList();
  };

  const create = async (data: ICreateTodoEntry) => {
    await todoStore.createEntry(data);
  };

  const update = async (data: IUpdateTodoEntry) => {
    await todoStore.updateEntry(data);
  };

  const remove = async (id: number) => {
    await todoStore.remove(id);
  };

  useEffect(() => {
    refetch().then();
  }, []);

  return (
    <Container>
      <CreateTodoModal
        visible={createTodoModal}
        setVisible={setCreateTodoModal}
        create={create}
      />
      <Row className='vh-100 d-flex justify-content-center align-items-start'>
        <Col lg={10} md={11} xs={12}>
          <Card className='mt-8 mb-5 shadow'>
            <Card.Body>
              <Card.Title className='text-center'>Todo List</Card.Title>
              <ButtonToolbar className='mb-3'>
                <Button className='me-2' onClick={refetch}>Update</Button>
                <Filter filter={filter} setFilter={setFilter} />
                <Button className='me-2' onClick={() => setCreateTodoModal(true)}>Create</Button>
              </ButtonToolbar>
              {todoStore.isLoading ?
                <Loader size='sm' /> :
                <TodoList
                  list={filteredTodoEntries}
                  done={async entry => update({ ...entry, done: true })}
                  update={update}
                  remove={remove}
                />
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default Todos;
