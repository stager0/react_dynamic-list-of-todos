/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Options as sortOptions } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [waitForData, setWaitForData] = useState(true);
  const [waitForModal, setWaitForModal] = useState(true);
  const [openedTodo, setOpenedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState(sortOptions.all);

  useEffect(() => {
    if (openedTodo) {
      setWaitForModal(true);
      setUser(null);

      const fetchUser = async () => {
        setWaitForModal(true);
        const currentUser = await getUser(openedTodo.userId);

        setUser(currentUser);
        setWaitForModal(false);
      };

      fetchUser();
    }
  }, [openedTodo]);

  const [allTodos, setAllTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setWaitForData(true);
      const todos = await getTodos();

      setAllTodos(todos);
      setWaitForData(false);
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div className={classNames('section')}>
        <div className={classNames('container')}>
          <div className={classNames('box')}>
            <h1 className={classNames('title')}>Todos:</h1>

            <div className={classNames('block')}>
              <TodoFilter
                setQueryFunc={setQuery}
                currentQuery={query}
                setOptionFunc={setOption}
                currentOption={option}
              />
            </div>

            <div className={classNames('block')}>
              {waitForData && <Loader />}
              {!waitForData && (
                <TodoList
                  todos={allTodos}
                  setModalFunc={setModalIsOpened}
                  setOpenedTodo={setOpenedTodo}
                  openedId={openedTodo?.id || null}
                  query={query}
                  option={option}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modalIsOpened && (
        <TodoModal
          todo={openedTodo}
          user={user}
          setModalFunc={setModalIsOpened}
          setOpenedTodo={setOpenedTodo}
          waitForModal={waitForModal}
          setWaitForModal={setWaitForModal}
        />
      )}
    </>
  );
};
