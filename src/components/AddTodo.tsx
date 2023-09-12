"use client";
import React, { useState } from "react";
import { NewTodo } from "@/db/schema";
import { FaAirbnb } from "react-icons/fa";
import { useRouter } from "next/navigation";

const AddTodo = () => {
   const [todo, setTodo] = useState<NewTodo>({ task: "" });
   const { refresh } = useRouter();

   const handleSubmit = async () => {
      try {
         if (todo) {
            const res = await fetch("/api/todo", {
               method: "POST",
               body: JSON.stringify({
                  task: todo.task,
               }),
            });
            refresh();
         }
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <form className="flex mt-4 gap-2">
         <input
            onChange={(e) => setTodo({ task: e.target.value })}
            type="text"
            placeholder="Add a Task"
            className="rounded-full px-3 w-full focus:outline-none focus:ring-2 ring-blue-600"
         />
         <button
            type="button"
            onClick={handleSubmit}
            className="rotate-90 bg-gradient-to-bl shrink-0 from-blue-600 to-teal-400 text-2xl text-white rounded-full p-4"
         >
            <FaAirbnb />
         </button>
      </form>
   );
};

export default AddTodo;
