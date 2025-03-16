import React, { useState } from 'react';
import './Add.css';
import { useNavigate } from 'react-router-dom';
import { TodoType, useTodo } from '../../contexts/TodoContext';

const Add: React.FC = () => {
  /** 画面遷移用ナビゲーション情報*/
  const navigate = useNavigate();
  /** TodoContextでグローバル管理しているtodo登録処理 */
  const { addTodo } = useTodo();

  /** 新規TODO情報 */
  const [todo, setTodo] = useState<TodoType>({
    id: 0,
    status: 0,
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  /**
   * 登録ボタン押下時の処理
   */
  const handleAddTodo = (): void => {
    const validatedTodo = validateAndPrepareTodo();

    addTodo(validatedTodo);
    navigate('/');
  }

  /**
   * フォーム変更時
   * @param event イベント
   */
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: value
    }));
  }

  /**
   * 現在の日付を YYYY-MM-DD 形式で取得
   * @returns {string} フォーマットされた日付文字列
   */
  const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * 入力値のバリデーションと初期値設定
   * @returns {TodoType} 検証済みのTODOオブジェクト
   */
  const validateAndPrepareTodo = (): TodoType => {
    return {
      ...todo,
      // 未入力の場合、以下を設定
      title: todo.title || "未設定",
      startDate: todo.startDate || getCurrentDate()
    };
  }

  return (
    <div className="flex justify-ce nter flex-column">
      <div className="top-area">
        <p className="top-title">新規登録</p>
      </div>
      <div className="main-area">
        <div className="my-5">
          <input
            name="title"
            value={todo.title}
            className="input-text"
            placeholder="タイトルを入力してください"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="my-5">
          <textarea
            name="description"
            value={todo.description}
            className="input-textarea"
            placeholder="内容を入力してください"
            cols={30}
            rows={10}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="flex justify-between my-5 width-full">
          <input
            name="startDate"
            value={todo.startDate}
            className="input-date"
            type="date"
            onChange={handleChangeInput}
          />
          <p>~</p>
          <input
            name="endDate"
            value={todo.endDate}
            className="input-date"
            type="date"
            onChange={handleChangeInput}
          />
        </div>
        <button className="add-button primary" onClick={handleAddTodo}>登録</button>
      </div>
    </div>
  );
};

export default Add;
