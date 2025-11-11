import { Todo } from '../../types/Todo';
import { Options as sortOptions } from '../TodoFilter';

type Props = {
  todos: Todo[] | null;
  setModalFunc: (value: boolean) => void;
  setOpenedTodo: (value: Todo) => void;
  openedId: number | null;
  query: string;
  option: sortOptions | '';
};

export const TodoList: React.FC<Props> = ({
  todos,
  setModalFunc,
  setOpenedTodo,
  openedId,
  query,
  option,
}) => {
  if (!todos) {
    return null;
  }

  const handleModal = (todo: Todo) => {
    setOpenedTodo(todo);
    setModalFunc(true);
  };

  const filteredTodos = todos
    .filter(todo =>
      query ? todo.title.toLowerCase().includes(query.toLowerCase()) : true,
    )
    .filter(todo => {
      switch (option) {
        case sortOptions.active:
          return !todo.completed;
        case sortOptions.completed:
          return todo.completed;
        default:
          return true;
      }
    });

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos &&
          filteredTodos.map((todo: Todo) => {
            return (
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleModal(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          todo.id === openedId && openedId !== null
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
