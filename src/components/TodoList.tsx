import { Todo } from "@/db/schema";
import React from "react";
import DeleteBtn from "./DeleteBtn";

const getTasks = async () => {
   try {
      const res = await fetch("http:localhost:3000/api/todo", {
         method: "GET",
         cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch data");
      return await res.json();
   } catch (err) {
      console.log(err);
   }
};

const TodoList = async () => {
   const { data }: { data: Todo[] } = await getTasks();

   return (
      <div className="flex flex-col gap-4 max-h-[20rem] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded">
         {data.map((e) => (
            <div
               key={e.id}
               className="bg-white rounded w-full p-4 flex justify-between"
            >
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <p>{e.task}</p>
               </div>
               {data.length > 3 && <DeleteBtn id={e.id} />}
            </div>
         ))}
      </div>
   );
};

export default TodoList;
