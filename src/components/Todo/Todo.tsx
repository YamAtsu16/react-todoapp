import React from 'react';
import './Todo.css';
import { useNavigate } from 'react-router-dom';
import { TodoType, useTodo } from '../../contexts/TodoContext';

interface Props {
  todo: TodoType;
}

/**
 * todoを管理するコンポーネント
 * @param param0 todo情報（単一）
 */
const Todo: React.FC<Props> = ({ todo }) => {
  /** 画面遷移用ナビゲーション */
  const navigate = useNavigate();
  /** TodoContextでグローバル管理しているステータス情報 */
  const { proceedStatus } = useTodo();

  /** ステータスの名称 */
  const statusNameList: { [key: number]: string } = {
    0: '未着手',
    1: '作業中',
    2: '完了'
  }

  /** 各種ボタンのクラス */
  const buttonClassList: { [key: number]: string } = {
    0: 'secondary',
    1: 'warning',
    2: 'critical'
  };

  /**
   * ボタンのクラスを取得
   */
  const getButtonClass = (): string => {
    return buttonClassList[todo.status];
  }

  /** 
   * 現在選択中のステータス名称を取得
   */
  const getStatusName = (): string => {
    return statusNameList[todo.status];
  }

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="todo-description text-left">
        <p>
          { todo.title }
        </p>
        <p>{ todo.startDate } ~ { todo.endDate }</p>
      </div>
      <div className="button-area">
        <button
          onClick={() => navigate('detail/' + todo.id)}
          className="positive"
        >
          詳細
        </button>
        <button
          className={`button ${getButtonClass()}`}
          onClick={() => proceedStatus(todo.id)}
        >
          { getStatusName() }
        </button>
      </div>
    </div>
  );
};

export default Todo;
