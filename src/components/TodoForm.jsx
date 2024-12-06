import { useState } from "react";
import useTodoMutation from "./useTodoMutation";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // TODO: 선택: useMutation을 useTodoMutation 커스텀훅으로 정리해 보세요.
  const { formMutation } = useTodoMutation();
  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    formMutation.mutate({
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      liked: false,
      createdAt: Date.now(),
    });
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
