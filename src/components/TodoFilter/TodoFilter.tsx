import React from 'react';
import classNames from 'classnames';

export enum Options {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  setQueryFunc: (value: string) => void;
  currentQuery: string;
  setOptionFunc: (value: Options) => void;
  currentOption: Options;
};

export const TodoFilter: React.FC<Props> = ({
                                              setQueryFunc,
                                              currentQuery,
                                              setOptionFunc,
                                              currentOption,
                                            }) => {
  const handleDelete = () => {
    setQueryFunc('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={currentOption}
            onChange={event => setOptionFunc(event.target.value as Options)}
          >
            <option value={Options.all}>All</option>
            <option value={Options.active}>Active</option>
            <option value={Options.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={currentQuery || ''}
          onChange={event => setQueryFunc(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {currentQuery && (
          <span
            className={classNames('icon', 'is-right')}
            style={{ pointerEvents: 'all' }}
          >
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
