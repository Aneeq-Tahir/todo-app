"use client";
import { useRouter } from "next/navigation";
import { VscTrash } from "react-icons/vsc";

const DeleteBtn = ({ id }: { id: number }) => {
   const { refresh } = useRouter();
   const removeTask = async (arg: number) => {
      try {
         const res = await fetch(`/api/todo?id=${arg}`, {
            method: "DELETE",
         });
         refresh();
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <button onClick={() => removeTask(id)} className="text-xl">
         <VscTrash />
      </button>
   );
};

export default DeleteBtn;
