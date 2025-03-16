import React, { useState } from 'react';
import './Home.css';
import FilterList from '../../components/FilterList/FilterList';
import Todo from '../../components/Todo/Todo';
import { useNavigate } from 'react-router-dom';
import { useTodo } from '../../contexts/TodoContext';
import { FilterTypeContext } from '../../contexts/FilterContext';

const Home: React.FC = () => {
  /** 画面遷移用ナビゲーション */
  const navigate = useNavigate();
  /** TodoContextでグローバル管理しているtodos情報 */
  const { todos } = useTodo();
  /** フィルタリング情報 (3: 全て, その他: ステータス値) */
  const [filterType, setFilterType] = useState<number>(3);

  /** 
   * フィルタリングされたtodo
   * 1. filterType === 3 の場合は全て表示
   * 2. それ以外は指定されたステータスのみ表示
   * 3. 開始日でソート
   */
  const filteredTodos = todos
    .filter(todo => filterType === 3 ? true : todo.status === filterType)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  return (
    <div>
      <div className="top-area">
        <h1 className="top-title">TOP (予定一覧表示)</h1>
      </div>
      <FilterTypeContext.Provider value={{ filterType, setFilterType }}>
        <div className="main-area">
          <FilterList />
          <div className="flex justify-center">
            <ul className="todo-list">
              <li>
                {/* 新規登録ボタン */}
                <button
                  onClick={() => navigate('add')}
                  className="add-button primary"
                >
                  新規登録
                </button>
              </li>
              {/* TodoList（Todoの有無で表示を制御） */}
              {filteredTodos.length === 0 ? (
                <li>登録されている予定はありません。</li>
              ) : (
                filteredTodos.map(todo => (
                  <li key={todo.id}>
                    <Todo todo={todo} />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </FilterTypeContext.Provider>
    </div>
  );
};

export default Home;
