import { createContext, useContext, useState, ReactNode } from 'react';

/** todoの型定義*/
export type TodoType = {
  id: number;
  status: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

/** todoのcontext型定義 */
type TodoContextType = {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  editTodo: (todo: TodoType) => void;
  deleteTodo: (todo: TodoType) => void;
  proceedStatus: (id: number) => void;
}

/** context作成 */
const TodoContext = createContext<TodoContextType | undefined>(undefined);

/** 
 * TodoProviderコンポーネント
 * @param children - Reactのchildren prop。このプロバイダーでラップされた子コンポーネントを受け取る
 * children は React の特別な prop で、コンポーネントのタグで囲まれた要素を表す
 * 例: <TodoProvider>これがchildrenになる</TodoProvider>
 * 
 * Context APIを使用してTodoの状態管理を行い、アプリケーション全体でTodoデータと
 * 操作関数を共有できるようにします。これにより、Propsバケツリレーを防ぎ、
 * コンポーネント間のデータ受け渡しを効率化します。
 */
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  /** todo情報 */
  const [todos, setTodos] = useState<TodoType[]>([]);

  /**
   * 登録処理
   * @param todo 登録対象
   */
  const addTodo = (todo: TodoType): void => {
    const maxId = todos.reduce((max, t) => Math.max(max, t.id), 0);
    const newTodo = { ...todo, id: maxId + 1 };
    setTodos(prev => [...prev, newTodo]);
  };

  /**
   * 更新処理
   * @param todo 更新情報
   */
  const editTodo = (todo: TodoType): void => {
    setTodos(prev => prev.map(t => t.id === todo.id ? todo : t));
  };

  /**
   * 削除処理
   * @param todo 削除対象
   */
  const deleteTodo = (todo: TodoType): void => {
    setTodos(prev => prev.filter(t => t.id !== todo.id));
  };

  /**
   * ステータスの更新
   * @param id id
   */
  const proceedStatus = (id: number): void => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, status: Math.min(todo.status + 1, 2) }
          : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, proceedStatus }}>
      {children}
    </TodoContext.Provider>
  );
};

/** 
 * TodoContextの値を取得するためのカスタムフック
 * このフックを使用することで、コンポーネントからTodoContextの値を簡単に参照できる
 * @returns TodoContextType - todos配列と関連する操作関数を含むオブジェクト
 * @throws Error - TodoProviderの外でこのフックが使用された場合にエラーを投げる
 */
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}; 