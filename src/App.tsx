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

      const fetchUser = () => {
        getUser(openedTodo.userId).then(currentUser => setUser(currentUser));
        setTimeout(() => {
          setWaitForModal(false);
        }, 300);
      };

      fetchUser();
    }
  }, [openedTodo]);

  const [allTodos, setAllTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setWaitForData(true); // сразу показываем Loader
      const todos = await getTodos();

      setAllTodos(todos);
      setWaitForData(false);
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQueryFunc={setQuery}
                currentQuery={query}
                setOptionFunc={setOption}
                currentOption={option}
              />
            </div>

            <div className="block">
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
