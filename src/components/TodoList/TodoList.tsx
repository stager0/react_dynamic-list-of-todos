import React from 'react';
import classNames from 'classnames';
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
    <table className={classNames('table', 'is-narrow', 'is-fullwidth')}>
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className={classNames('icon')}>
              <i className={classNames('fas', 'fa-check')} />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => (
          <tr data-cy="todo" key={todo.id}>
            <td className={classNames('is-vcentered')}>{todo.id}</td>
            <td className={classNames('is-vcentered')}>
              {todo.completed && (
                <span className={classNames('icon')} data-cy="iconCompleted">
                  <i className={classNames('fas', 'fa-check')} />
                </span>
              )}
            </td>
            <td className={classNames('is-vcentered', 'is-expanded')}>
              <p
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
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
                    className={classNames({
                      'far fa-eye-slash':
                        todo.id === openedId && openedId !== null,
                      'far fa-eye': todo.id !== openedId || openedId === null,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
