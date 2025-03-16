import React, { useState } from 'react';
import './Detail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodo } from '../../contexts/TodoContext';

const Detail: React.FC = () => {
  /** 画面遷移パラメーター */
  const { todoId } = useParams()
  /** 画面遷移用ナビゲーション情報*/
  const navigate = useNavigate();
  /** TodoContextでグローバル管理しているtodo情報 */
  const { todos, editTodo, deleteTodo } = useTodo();

  // IDが見つからない場合、返す
  if (!todoId) {
    navigate('/');
    return (<></>);
  }

  // 該当するIDのTODOを見つける
  const todo = todos.find(t => t.id === parseInt(todoId, 10));

  // TODOが見つからない場合、返す
  if (todo === undefined) {
    navigate('/');
    return (<></>);
  }

  /**
   * フォーム変更時
   * @param event イベント
   */
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    switch(name) {
      case "title":
        todo.title = value;
        break;
      case "discription":
        todo.description = value;
        break;
      case "startDate":
        todo.startDate = value;
        break;
      case "endDate":
        todo.endDate = value;
        break;
      default:
        break;
    }
  }

  return (
    <div className="flex justify-center flex-column">
      <div className="top-area">
        <p className="top-title">予定詳細</p>
      </div>
      <div className="main-area">
        <div className="my-5">
          <input
            name="title"
            defaultValue={todo.title}
            className="input-text"
            placeholder="タイトルを入力してください"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="my-5">
          <textarea
            name="discription"
            defaultValue={todo.description}
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
            defaultValue={todo.startDate}
            className="input-date"
            type="date"
            onChange={handleChangeInput}
          />
          <p>~</p>
          <input
            name="endDate"
            defaultValue={todo.endDate}
            className="input-date"
            type="date"
            onChange={handleChangeInput}
          />
        </div>

        <div className="flex flex-row gap-16">
          <button 
            className="edit-button positive" 
            onClick={() => {
              editTodo(todo);
              navigate('/');
            }}
          >
            更新
          </button>
          <button 
            className="delete-button critical" 
            onClick={() => {
              deleteTodo(todo);
              navigate('/');
            }}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;